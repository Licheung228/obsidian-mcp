import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册发布工具
 */
export function registerPublishTools(server: ToolServer) {
  // 显示发布站点信息
  server.registerTool(
    "obsidian_publish_site",
    {
      title: "显示发布站点信息",
      description: "显示 Obsidian Publish 站点的信息（slug、URL）。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("publish:site", { vault });
    }
  );

  // 列出已发布文件
  server.registerTool(
    "obsidian_publish_list",
    {
      title: "列出已发布文件",
      description: "列出已发布到 Obsidian Publish 的文件。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回已发布文件数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, vault }) => {
      return executeCLIForTool("publish:list", { total, vault });
    }
  );

  // 发布状态
  server.registerTool(
    "obsidian_publish_status",
    {
      title: "显示发布变更状态",
      description: "列出发布变更（新文件、已更改、已删除）。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回变更数量"),
        new: z.boolean().optional().describe("仅显示新文件"),
        changed: z.boolean().optional().describe("仅显示已更改的文件"),
        deleted: z.boolean().optional().describe("仅显示已删除的文件"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, new: newFiles, changed, deleted, vault }) => {
      return executeCLIForTool("publish:status", { total, new: newFiles, changed, deleted, vault });
    }
  );

  // 发布文件
  server.registerTool(
    "obsidian_publish_add",
    {
      title: "发布文件",
      description: "发布文件或所有已更改的文件到 Obsidian Publish。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        changed: z.boolean().optional().describe("发布所有已更改的文件"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, changed, vault }) => {
      return executeCLIForTool("publish:add", { file, path, changed, vault });
    }
  );

  // 取消发布
  server.registerTool(
    "obsidian_publish_remove",
    {
      title: "取消发布文件",
      description: "从 Obsidian Publish 取消发布文件。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, vault }) => {
      return executeCLIForTool("publish:remove", { file, path, vault });
    }
  );

  // 在发布站点打开文件
  server.registerTool(
    "obsidian_publish_open",
    {
      title: "在发布站点打开文件",
      description: "在 Obsidian Publish 网站上打开文件。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, vault }) => {
      return executeCLIForTool("publish:open", { file, path, vault });
    }
  );
}