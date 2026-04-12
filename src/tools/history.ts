import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册历史工具
 */
export function registerHistoryTools(server: ToolServer) {
  // 比较版本
  server.registerTool(
    "obsidian_diff",
    {
      title: "比较文件版本",
      description: "列出或比较文件的版本历史。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        from: z.number().optional().describe("对比起始版本号"),
        to: z.number().optional().describe("对比目标版本号"),
        filter: z.enum(["local", "sync"]).optional().describe("按版本来源筛选"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, from, to, filter, vault }) => {
      return executeCLIForTool("diff", { file, path, from, to, filter, vault });
    }
  );

  // 本地历史列表
  server.registerTool(
    "obsidian_history",
    {
      title: "列出本地历史版本",
      description: "列出文件的本地历史版本。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, vault }) => {
      return executeCLIForTool("history", { file, path, vault });
    }
  );

  // 列出有历史的文件
  server.registerTool(
    "obsidian_history_list",
    {
      title: "列出有本地历史的文件",
      description: "列出所有有本地历史记录的文件。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("history:list", { vault });
    }
  );

  // 读取历史版本
  server.registerTool(
    "obsidian_history_read",
    {
      title: "读取本地历史版本",
      description: "读取文件的特定本地历史版本。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        version: z.number().optional().describe("版本号（默认：1，即最新）"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, version, vault }) => {
      return executeCLIForTool("history:read", { file, path, version, vault });
    }
  );

  // 恢复历史版本
  server.registerTool(
    "obsidian_history_restore",
    {
      title: "恢复本地历史版本",
      description: "将文件恢复到特定的本地历史版本。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        version: z.number().describe("版本号"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, version, vault }) => {
      return executeCLIForTool("history:restore", { file, path, version, vault });
    }
  );

  // 打开文件恢复视图
  server.registerTool(
    "obsidian_history_open",
    {
      title: "打开文件恢复视图",
      description: "在 Obsidian 中打开文件恢复视图。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, vault }) => {
      return executeCLIForTool("history:open", { file, path, vault });
    }
  );
}