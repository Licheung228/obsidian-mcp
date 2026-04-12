import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册主题和 CSS 片段工具
 */
export function registerThemeTools(server: ToolServer) {
  // 列出主题
  server.registerTool(
    "obsidian_themes",
    {
      title: "列出已安装主题",
      description: "列出仓库中已安装的主题。",
      inputSchema: z.object({
        versions: z.boolean().optional().describe("包含版本号"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ versions, vault }) => {
      return executeCLIForTool("themes", { versions, vault });
    }
  );

  // 获取当前主题
  server.registerTool(
    "obsidian_theme",
    {
      title: "显示当前主题",
      description: "显示当前使用的主题或获取特定主题信息。",
      inputSchema: z.object({
        name: z.string().optional().describe("要查看详情的主题名称"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, vault }) => {
      return executeCLIForTool("theme", { name, vault });
    }
  );

  // 设置主题
  server.registerTool(
    "obsidian_theme_set",
    {
      title: "设置主题",
      description: "切换到指定的主题。留空则使用默认主题。",
      inputSchema: z.object({
        name: z.string().optional().describe("主题名称（留空使用默认）"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, vault }) => {
      return executeCLIForTool("theme:set", { name, vault });
    }
  );

  // 安装主题
  server.registerTool(
    "obsidian_theme_install",
    {
      title: "安装社区主题",
      description: "从社区主题库安装主题。",
      inputSchema: z.object({
        name: z.string().describe("主题名称"),
        enable: z.boolean().optional().describe("安装后激活"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, enable, vault }) => {
      return executeCLIForTool("theme:install", { name, enable, vault });
    }
  );

  // 卸载主题
  server.registerTool(
    "obsidian_theme_uninstall",
    {
      title: "卸载主题",
      description: "卸载指定的主题。",
      inputSchema: z.object({
        name: z.string().describe("主题名称"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, vault }) => {
      return executeCLIForTool("theme:uninstall", { name, vault });
    }
  );

  // 列出 CSS 片段
  server.registerTool(
    "obsidian_snippets",
    {
      title: "列出 CSS 片段",
      description: "列出已安装的 CSS 代码片段。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("snippets", { vault });
    }
  );

  // 列出已启用的 CSS 片段
  server.registerTool(
    "obsidian_snippets_enabled",
    {
      title: "列出已启用的 CSS 片段",
      description: "列出当前已启用的 CSS 代码片段。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("snippets:enabled", { vault });
    }
  );

  // 启用 CSS 片段
  server.registerTool(
    "obsidian_snippet_enable",
    {
      title: "启用 CSS 片段",
      description: "启用指定的 CSS 代码片段。",
      inputSchema: z.object({
        name: z.string().describe("片段名称"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, vault }) => {
      return executeCLIForTool("snippet:enable", { name, vault });
    }
  );

  // 禁用 CSS 片段
  server.registerTool(
    "obsidian_snippet_disable",
    {
      title: "禁用 CSS 片段",
      description: "禁用指定的 CSS 代码片段。",
      inputSchema: z.object({
        name: z.string().describe("片段名称"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, vault }) => {
      return executeCLIForTool("snippet:disable", { name, vault });
    }
  );
}