import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册命令面板工具
 */
export function registerCommandTools(server: ToolServer) {
  // 列出命令
  server.registerTool(
    "obsidian_commands",
    {
      title: "列出可用命令",
      description: "列出所有可用的 Obsidian 命令 ID。",
      inputSchema: z.object({
        filter: z.string().optional().describe("按 ID 前缀筛选"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ filter, vault }) => {
      return executeCLIForTool("commands", { filter, vault });
    }
  );

  // 执行命令
  server.registerTool(
    "obsidian_command",
    {
      title: "执行 Obsidian 命令",
      description: "执行指定的 Obsidian 命令。",
      inputSchema: z.object({
        id: z.string().describe("命令 ID"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ id, vault }) => {
      return executeCLIForTool("command", { id, vault });
    }
  );

  // 列出快捷键
  server.registerTool(
    "obsidian_hotkeys",
    {
      title: "列出快捷键",
      description: "列出所有命令的快捷键。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回快捷键数量"),
        verbose: z.boolean().optional().describe("显示快捷键是否为自定义"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, verbose, vault }) => {
      return executeCLIForTool("hotkeys", { total, verbose, vault });
    }
  );

  // 获取命令快捷键
  server.registerTool(
    "obsidian_hotkey",
    {
      title: "获取命令快捷键",
      description: "获取特定命令的快捷键。",
      inputSchema: z.object({
        id: z.string().describe("命令 ID"),
        verbose: z.boolean().optional().describe("显示是自定义还是默认"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ id, verbose, vault }) => {
      return executeCLIForTool("hotkey", { id, verbose, vault });
    }
  );
}