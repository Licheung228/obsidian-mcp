import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册搜索工具
 */
export function registerSearchTools(server: ToolServer) {
  // 搜索
  server.registerTool(
    "obsidian_search",
    {
      title: "搜索仓库内容",
      description: "搜索仓库中的文本，返回匹配的文件路径。",
      inputSchema: z.object({
        query: z.string().describe("搜索查询"),
        path: z.string().optional().describe("限定在某文件夹内"),
        limit: z.number().optional().describe("最大返回文件数"),
        case: z.boolean().optional().describe("区分大小写"),
        total: z.boolean().optional().describe("返回匹配数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ query, path, limit, case: caseSensitive, total, vault }) => {
      return executeCLIForTool("search", { query, path, limit, case: caseSensitive, total, vault });
    }
  );

  // 带上下文的搜索
  server.registerTool(
    "obsidian_search_context",
    {
      title: "带上下文的搜索",
      description: "搜索仓库中的文本，返回 grep 风格的 path:line:text 输出。",
      inputSchema: z.object({
        query: z.string().describe("搜索查询"),
        path: z.string().optional().describe("限定在某文件夹内"),
        limit: z.number().optional().describe("最大返回文件数"),
        case: z.boolean().optional().describe("区分大小写"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ query, path, limit, case: caseSensitive, vault }) => {
      return executeCLIForTool("search:context", { query, path, limit, case: caseSensitive, vault });
    }
  );

  // 打开搜索视图
  server.registerTool(
    "obsidian_search_open",
    {
      title: "打开搜索视图",
      description: "在 Obsidian 中打开搜索视图。",
      inputSchema: z.object({
        query: z.string().optional().describe("初始搜索查询"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ query, vault }) => {
      return executeCLIForTool("search:open", { query, vault });
    }
  );
}