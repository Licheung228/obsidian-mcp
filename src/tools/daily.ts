import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册日记工具
 */
export function registerDailyTools(server: ToolServer) {
  // 打开日记
  server.registerTool(
    "obsidian_daily",
    {
      title: "打开今天的日记",
      description: "打开今天的日记文件。",
      inputSchema: z.object({
        paneType: z.enum(["tab", "split", "window"]).optional().describe("打开方式"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ paneType, vault }) => {
      return executeCLIForTool("daily", { paneType, vault });
    }
  );

  // 获取日记路径
  server.registerTool(
    "obsidian_daily_path",
    {
      title: "获取日记路径",
      description: "获取今天日记的路径。即使文件尚未创建也会返回预期路径。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("daily:path", { vault });
    }
  );

  // 读取日记
  server.registerTool(
    "obsidian_daily_read",
    {
      title: "读取日记内容",
      description: "读取今天日记的内容。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("daily:read", { vault });
    }
  );

  // 向日记追加内容
  server.registerTool(
    "obsidian_daily_append",
    {
      title: "向日记追加内容",
      description: "向今天日记的末尾追加内容。",
      inputSchema: z.object({
        content: z.string().describe("要追加的内容"),
        paneType: z.enum(["tab", "split", "window"]).optional().describe("打开方式"),
        inline: z.boolean().optional().describe("追加时不换行"),
        open: z.boolean().optional().describe("添加后打开文件"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ content, paneType, inline, open, vault }) => {
      return executeCLIForTool("daily:append", { content, paneType, inline, open, vault });
    }
  );

  // 在日记开头插入内容
  server.registerTool(
    "obsidian_daily_prepend",
    {
      title: "在日记开头插入内容",
      description: "在今天的日记开头插入内容（在前置元数据之后）。",
      inputSchema: z.object({
        content: z.string().describe("要插入的内容"),
        paneType: z.enum(["tab", "split", "window"]).optional().describe("打开方式"),
        inline: z.boolean().optional().describe("插入时不换行"),
        open: z.boolean().optional().describe("添加后打开文件"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ content, paneType, inline, open, vault }) => {
      return executeCLIForTool("daily:prepend", { content, paneType, inline, open, vault });
    }
  );
}