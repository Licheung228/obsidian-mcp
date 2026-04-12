import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册工作区工具
 */
export function registerWorkspaceTools(server: ToolServer) {
  // 显示工作区
  server.registerTool(
    "obsidian_workspace",
    {
      title: "显示工作区",
      description: "显示当前工作区的布局结构。",
      inputSchema: z.object({
        ids: z.boolean().optional().describe("包含工作区项目 ID"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ ids, vault }) => {
      return executeCLIForTool("workspace", { ids, vault });
    }
  );

  // 列出工作区
  server.registerTool(
    "obsidian_workspaces",
    {
      title: "列出已保存工作区",
      description: "列出已保存的工作区配置。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回工作区数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, vault }) => {
      return executeCLIForTool("workspaces", { total, vault });
    }
  );

  // 保存工作区
  server.registerTool(
    "obsidian_workspace_save",
    {
      title: "保存工作区",
      description: "将当前布局保存为工作区。",
      inputSchema: z.object({
        name: z.string().describe("工作区名称"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, vault }) => {
      return executeCLIForTool("workspace:save", { name, vault });
    }
  );

  // 加载工作区
  server.registerTool(
    "obsidian_workspace_load",
    {
      title: "加载工作区",
      description: "加载已保存的工作区配置。",
      inputSchema: z.object({
        name: z.string().describe("工作区名称"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, vault }) => {
      return executeCLIForTool("workspace:load", { name, vault });
    }
  );

  // 删除工作区
  server.registerTool(
    "obsidian_workspace_delete",
    {
      title: "删除工作区",
      description: "删除已保存的工作区配置。",
      inputSchema: z.object({
        name: z.string().describe("工作区名称"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, vault }) => {
      return executeCLIForTool("workspace:delete", { name, vault });
    }
  );

  // 列出标签页
  server.registerTool(
    "obsidian_tabs",
    {
      title: "列出打开的标签页",
      description: "列出当前打开的标签页。",
      inputSchema: z.object({
        ids: z.boolean().optional().describe("包含标签页 ID"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ ids, vault }) => {
      return executeCLIForTool("tabs", { ids, vault });
    }
  );

  // 列出最近文件
  server.registerTool(
    "obsidian_recents",
    {
      title: "列出最近文件",
      description: "列出最近打开的文件。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回最近文件数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, vault }) => {
      return executeCLIForTool("recents", { total, vault });
    }
  );
}