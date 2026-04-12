import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册链接工具
 */
export function registerLinkTools(server: ToolServer) {
  // 反向链接
  server.registerTool(
    "obsidian_backlinks",
    {
      title: "列出反向链接",
      description: "列出指向某文件的反向链接。默认列出指向当前活动文件的链接。",
      inputSchema: z.object({
        file: z.string().optional().describe("目标文件名"),
        path: z.string().optional().describe("目标文件路径"),
        counts: z.boolean().optional().describe("包含链接数量"),
        total: z.boolean().optional().describe("返回反向链接数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, counts, total, vault }) => {
      return executeCLIForTool("backlinks", { file, path, counts, total, vault });
    }
  );

  // 出链
  server.registerTool(
    "obsidian_links",
    {
      title: "列出出链",
      description: "列出某文件的出链。默认列出当前活动文件的出链。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        total: z.boolean().optional().describe("返回链接数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, total, vault }) => {
      return executeCLIForTool("links", { file, path, total, vault });
    }
  );

  // 未解析的链接
  server.registerTool(
    "obsidian_unresolved",
    {
      title: "列出未解析链接",
      description: "列出仓库中未解析的链接（指向不存在文件的链接）。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回未解析链接数量"),
        counts: z.boolean().optional().describe("包含链接数量"),
        verbose: z.boolean().optional().describe("包含源文件"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, counts, verbose, vault }) => {
      return executeCLIForTool("unresolved", { total, counts, verbose, vault });
    }
  );

  // 孤立文件
  server.registerTool(
    "obsidian_orphans",
    {
      title: "列出孤立文件",
      description: "列出没有入链的文件。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回孤立文件数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, vault }) => {
      return executeCLIForTool("orphans", { total, vault });
    }
  );

  // 死端文件
  server.registerTool(
    "obsidian_deadends",
    {
      title: "列出死端文件",
      description: "列出没有出链的文件。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回死端文件数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, vault }) => {
      return executeCLIForTool("deadends", { total, vault });
    }
  );
}