import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册同步工具
 */
export function registerSyncTools(server: ToolServer) {
  // 暂停/恢复同步
  server.registerTool(
    "obsidian_sync",
    {
      title: "暂停或恢复同步",
      description: "控制 Obsidian Sync 的暂停和恢复。",
      inputSchema: z.object({
        on: z.boolean().optional().describe("恢复同步"),
        off: z.boolean().optional().describe("暂停同步"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ on, off, vault }) => {
      return executeCLIForTool("sync", { on, off, vault });
    }
  );

  // 同步状态
  server.registerTool(
    "obsidian_sync_status",
    {
      title: "显示同步状态",
      description: "显示 Obsidian Sync 的状态和使用情况。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("sync:status", { vault });
    }
  );

  // 同步历史
  server.registerTool(
    "obsidian_sync_history",
    {
      title: "列出同步历史",
      description: "列出文件的同步版本历史。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        total: z.boolean().optional().describe("返回版本数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, total, vault }) => {
      return executeCLIForTool("sync:history", { file, path, total, vault });
    }
  );

  // 读取同步版本
  server.registerTool(
    "obsidian_sync_read",
    {
      title: "读取同步版本",
      description: "读取文件的特定同步版本。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        version: z.number().describe("版本号"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, version, vault }) => {
      return executeCLIForTool("sync:read", { file, path, version, vault });
    }
  );

  // 恢复同步版本
  server.registerTool(
    "obsidian_sync_restore",
    {
      title: "恢复同步版本",
      description: "将文件恢复到特定的同步版本。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        version: z.number().describe("版本号"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, version, vault }) => {
      return executeCLIForTool("sync:restore", { file, path, version, vault });
    }
  );

  // 打开同步历史
  server.registerTool(
    "obsidian_sync_open",
    {
      title: "打开同步历史视图",
      description: "在 Obsidian 中打开同步历史视图。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, vault }) => {
      return executeCLIForTool("sync:open", { file, path, vault });
    }
  );

  // 列出已删除文件
  server.registerTool(
    "obsidian_sync_deleted",
    {
      title: "列出同步中已删除的文件",
      description: "列出同步服务中已删除但可恢复的文件。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回已删除文件数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, vault }) => {
      return executeCLIForTool("sync:deleted", { total, vault });
    }
  );
}