import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册书签工具
 */
export function registerBookmarkTools(server: ToolServer) {
  // 列出书签
  server.registerTool(
    "obsidian_bookmarks",
    {
      title: "列出书签",
      description: "列出仓库中的所有书签。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回书签数量"),
        verbose: z.boolean().optional().describe("包含书签类型"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, verbose, vault }) => {
      return executeCLIForTool("bookmarks", { total, verbose, vault });
    }
  );

  // 添加书签
  server.registerTool(
    "obsidian_bookmark",
    {
      title: "添加书签",
      description: "添加书签（文件、文件夹、搜索查询或 URL）。",
      inputSchema: z.object({
        file: z.string().optional().describe("要添加书签的文件路径"),
        subpath: z.string().optional().describe("文件内的子路径（标题或块）"),
        folder: z.string().optional().describe("要添加书签的文件夹路径"),
        search: z.string().optional().describe("要添加书签的搜索查询"),
        url: z.string().optional().describe("要添加书签的 URL"),
        title: z.string().optional().describe("书签标题"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, subpath, folder, search, url, title, vault }) => {
      return executeCLIForTool("bookmark", { file, subpath, folder, search, url, title, vault });
    }
  );
}