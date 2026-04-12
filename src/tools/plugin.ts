import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册插件工具
 */
export function registerPluginTools(server: ToolServer) {
  // 列出插件
  server.registerTool(
    "obsidian_plugins",
    {
      title: "列出已安装插件",
      description: "列出仓库中已安装的插件。",
      inputSchema: z.object({
        filter: z.enum(["core", "community"]).optional().describe("按插件类型筛选"),
        versions: z.boolean().optional().describe("包含版本号"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ filter, versions, vault }) => {
      return executeCLIForTool("plugins", { filter, versions, vault });
    }
  );

  // 列出已启用的插件
  server.registerTool(
    "obsidian_plugins_enabled",
    {
      title: "列出已启用的插件",
      description: "列出当前已启用的插件。",
      inputSchema: z.object({
        filter: z.enum(["core", "community"]).optional().describe("按插件类型筛选"),
        versions: z.boolean().optional().describe("包含版本号"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ filter, versions, vault }) => {
      return executeCLIForTool("plugins:enabled", { filter, versions, vault });
    }
  );

  // 获取插件信息
  server.registerTool(
    "obsidian_plugin",
    {
      title: "获取插件信息",
      description: "获取特定插件的详细信息。",
      inputSchema: z.object({
        id: z.string().describe("插件 ID"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ id, vault }) => {
      return executeCLIForTool("plugin", { id, vault });
    }
  );

  // 启用插件
  server.registerTool(
    "obsidian_plugin_enable",
    {
      title: "启用插件",
      description: "启用指定的插件。",
      inputSchema: z.object({
        id: z.string().describe("插件 ID"),
        filter: z.enum(["core", "community"]).optional().describe("插件类型"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ id, filter, vault }) => {
      return executeCLIForTool("plugin:enable", { id, filter, vault });
    }
  );

  // 禁用插件
  server.registerTool(
    "obsidian_plugin_disable",
    {
      title: "禁用插件",
      description: "禁用指定的插件。",
      inputSchema: z.object({
        id: z.string().describe("插件 ID"),
        filter: z.enum(["core", "community"]).optional().describe("插件类型"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ id, filter, vault }) => {
      return executeCLIForTool("plugin:disable", { id, filter, vault });
    }
  );

  // 安装社区插件
  server.registerTool(
    "obsidian_plugin_install",
    {
      title: "安装社区插件",
      description: "从社区插件库安装插件。",
      inputSchema: z.object({
        id: z.string().describe("插件 ID"),
        enable: z.boolean().optional().describe("安装后启用"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ id, enable, vault }) => {
      return executeCLIForTool("plugin:install", { id, enable, vault });
    }
  );

  // 卸载社区插件
  server.registerTool(
    "obsidian_plugin_uninstall",
    {
      title: "卸载社区插件",
      description: "卸载指定的社区插件。",
      inputSchema: z.object({
        id: z.string().describe("插件 ID"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ id, vault }) => {
      return executeCLIForTool("plugin:uninstall", { id, vault });
    }
  );

  // 重新加载插件（开发者）
  server.registerTool(
    "obsidian_plugin_reload",
    {
      title: "重新加载插件",
      description: "重新加载正在开发的插件（面向开发者）。",
      inputSchema: z.object({
        id: z.string().describe("插件 ID"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ id, vault }) => {
      return executeCLIForTool("plugin:reload", { id, vault });
    }
  );

  // 受限模式
  server.registerTool(
    "obsidian_plugins_restrict",
    {
      title: "切换受限模式",
      description: "启用或禁用社区插件的受限模式。",
      inputSchema: z.object({
        on: z.boolean().optional().describe("启用受限模式"),
        off: z.boolean().optional().describe("禁用受限模式"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ on, off, vault }) => {
      return executeCLIForTool("plugins:restrict", { on, off, vault });
    }
  );
}