import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册大纲工具
 */
export function registerOutlineTools(server: ToolServer) {
  // 显示大纲
  server.registerTool(
    "obsidian_outline",
    {
      title: "显示文件大纲",
      description: "显示文件的标题结构。默认显示当前活动文件。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        format: z.enum(["tree", "md", "json"]).optional().describe("输出格式"),
        total: z.boolean().optional().describe("返回标题数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, format, total, vault }) => {
      return executeCLIForTool("outline", { file, path, format, total, vault });
    }
  );
}