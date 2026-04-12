import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { CLIArgs, CLIResult } from "./types.js";
import { CLIError } from "../utils/error.js";

const execAsync = promisify(exec);

/**
 * 构建 CLI 命令字符串
 */
function buildCommand(command: string, args: CLIArgs): string {
  const parts = [`obsidian ${command}`];

  for (const [key, value] of Object.entries(args)) {
    if (value === undefined || value === false) {
      continue;
    }
    if (value === true) {
      // 标志参数，直接添加
      parts.push(key);
    } else {
      // 值参数，格式为 key="value"
      const strValue = String(value);
      // 如果值包含空格或特殊字符，需要引号
      if (strValue.includes(" ") || strValue.includes('"') || strValue.includes("'")) {
        // 转义引号
        const escaped = strValue.replace(/"/g, '\\"');
        parts.push(`${key}="${escaped}"`);
      } else {
        parts.push(`${key}=${strValue}`);
      }
    }
  }

  return parts.join(" ");
}

/**
 * 执行 Obsidian CLI 命令
 */
export async function executeCLI(command: string, args: CLIArgs = {}): Promise<CLIResult> {
  const fullCommand = buildCommand(command, args);

  try {
    const { stdout, stderr } = await execAsync(fullCommand, {
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });

    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      success: true,
    };
  } catch (error) {
    const execError = error as { stdout?: string; stderr?: string; message?: string };
    const stderr = execError.stderr || "";
    const stdout = execError.stdout || "";
    const errorMessage = execError.message || "Unknown error";

    // 如果有输出，可能命令部分成功但返回了错误码
    if (stdout || stderr) {
      return {
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        success: false,
      };
    }

    throw new CLIError(errorMessage, stderr, fullCommand);
  }
}

/**
 * 执行 CLI 并返回文本结果（用于 MCP tool response）
 */
export async function executeCLIForTool(
  command: string,
  args: CLIArgs = {}
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const result = await executeCLI(command, args);

  const text = result.success
    ? result.stdout || "操作成功完成"
    : `错误: ${result.stderr || result.stdout}`;

  return {
    content: [{ type: "text", text }],
  };
}