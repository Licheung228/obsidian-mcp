import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册任务工具
 */
export function registerTaskTools(server: ToolServer) {
  // 列出任务
  server.registerTool(
    "obsidian_tasks",
    {
      title: "列出任务",
      description: "列出仓库中的任务。可按文件、状态筛选。",
      inputSchema: z.object({
        file: z.string().optional().describe("按文件名筛选"),
        path: z.string().optional().describe("按文件路径筛选"),
        status: z.string().optional().describe("按状态字符筛选（如 ' ', 'x', '-' 等）"),
        total: z.boolean().optional().describe("返回任务数量"),
        done: z.boolean().optional().describe("仅显示已完成的任务"),
        todo: z.boolean().optional().describe("仅显示未完成的任务"),
        verbose: z.boolean().optional().describe("按文件分组并显示行号"),
        daily: z.boolean().optional().describe("仅显示日记中的任务"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, status, total, done, todo, verbose, daily, vault }) => {
      return executeCLIForTool("tasks", { file, path, status, total, done, todo, verbose, daily, vault });
    }
  );

  // 显示/更新任务
  server.registerTool(
    "obsidian_task",
    {
      title: "显示或更新任务",
      description: "显示任务信息或更新任务状态。",
      inputSchema: z.object({
        ref: z.string().optional().describe("任务引用（格式：path:line）"),
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        line: z.number().optional().describe("行号"),
        status: z.string().optional().describe("设置状态字符"),
        toggle: z.boolean().optional().describe("切换任务状态"),
        done: z.boolean().optional().describe("标记为已完成"),
        todo: z.boolean().optional().describe("标记为未完成"),
        daily: z.boolean().optional().describe("日记"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ ref, file, path, line, status, toggle, done, todo, daily, vault }) => {
      return executeCLIForTool("task", { ref, file, path, line, status, toggle, done, todo, daily, vault });
    }
  );
}