import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册数据库工具
 */
export function registerBaseTools(server: ToolServer) {
  // 列出数据库文件
  server.registerTool(
    "obsidian_bases",
    {
      title: "列出数据库文件",
      description: "列出仓库中所有 .base 数据库文件。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("bases", { vault });
    }
  );

  // 列出数据库视图
  server.registerTool(
    "obsidian_base_views",
    {
      title: "列出数据库视图",
      description: "列出当前数据库文件中的视图。",
      inputSchema: z.object({
        file: z.string().optional().describe("数据库文件名"),
        path: z.string().optional().describe("数据库文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, vault }) => {
      return executeCLIForTool("base:views", { file, path, vault });
    }
  );

  // 创建数据库项目
  server.registerTool(
    "obsidian_base_create",
    {
      title: "创建数据库项目",
      description: "在数据库中创建新项目。",
      inputSchema: z.object({
        file: z.string().optional().describe("数据库文件名"),
        path: z.string().optional().describe("数据库文件路径"),
        view: z.string().optional().describe("视图名称"),
        name: z.string().optional().describe("新文件名"),
        content: z.string().optional().describe("初始内容"),
        open: z.boolean().optional().describe("创建后打开文件"),
        newtab: z.boolean().optional().describe("在新标签页中打开"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, view, name, content, open, newtab, vault }) => {
      return executeCLIForTool("base:create", { file, path, view, name, content, open, newtab, vault });
    }
  );

  // 查询数据库
  server.registerTool(
    "obsidian_base_query",
    {
      title: "查询数据库",
      description: "查询数据库并返回结果。",
      inputSchema: z.object({
        file: z.string().optional().describe("数据库文件名"),
        path: z.string().optional().describe("数据库文件路径"),
        view: z.string().optional().describe("视图名称"),
        format: z.enum(["json", "csv", "tsv", "md", "paths"]).optional().describe("输出格式"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, view, format, vault }) => {
      return executeCLIForTool("base:query", { file, path, view, format, vault });
    }
  );
}