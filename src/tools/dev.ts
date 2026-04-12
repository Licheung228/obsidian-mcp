import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册开发者工具
 */
export function registerDevTools(server: ToolServer) {
  // 开发者工具
  server.registerTool(
    "obsidian_devtools",
    {
      title: "切换开发者工具",
      description: "切换 Electron 开发者工具。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("devtools", { vault });
    }
  );

  // 调试器
  server.registerTool(
    "obsidian_dev_debug",
    {
      title: "附加/分离调试器",
      description: "附加或分离 Chrome DevTools Protocol 调试器。",
      inputSchema: z.object({
        on: z.boolean().optional().describe("附加调试器"),
        off: z.boolean().optional().describe("分离调试器"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ on, off, vault }) => {
      return executeCLIForTool("dev:debug", { on, off, vault });
    }
  );

  // 显示错误
  server.registerTool(
    "obsidian_dev_errors",
    {
      title: "显示捕获的错误",
      description: "显示捕获的 JavaScript 错误。",
      inputSchema: z.object({
        clear: z.boolean().optional().describe("清除错误缓冲区"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ clear, vault }) => {
      return executeCLIForTool("dev:errors", { clear, vault });
    }
  );

  // 截图
  server.registerTool(
    "obsidian_dev_screenshot",
    {
      title: "截图",
      description: "对 Obsidian 应用进行截图。",
      inputSchema: z.object({
        path: z.string().optional().describe("输出文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ path, vault }) => {
      return executeCLIForTool("dev:screenshot", { path, vault });
    }
  );

  // 控制台消息
  server.registerTool(
    "obsidian_dev_console",
    {
      title: "显示控制台消息",
      description: "显示捕获的控制台消息。",
      inputSchema: z.object({
        limit: z.number().optional().describe("最大消息数"),
        level: z.enum(["log", "warn", "error", "info", "debug"]).optional().describe("按日志级别筛选"),
        clear: z.boolean().optional().describe("清除控制台缓冲区"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ limit, level, clear, vault }) => {
      return executeCLIForTool("dev:console", { limit, level, clear, vault });
    }
  );

  // 检查 CSS
  server.registerTool(
    "obsidian_dev_css",
    {
      title: "检查 CSS",
      description: "检查 CSS 及其源位置。",
      inputSchema: z.object({
        selector: z.string().describe("CSS 选择器"),
        prop: z.string().optional().describe("按属性名筛选"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ selector, prop, vault }) => {
      return executeCLIForTool("dev:css", { selector, prop, vault });
    }
  );

  // 查询 DOM
  server.registerTool(
    "obsidian_dev_dom",
    {
      title: "查询 DOM 元素",
      description: "查询 DOM 元素。",
      inputSchema: z.object({
        selector: z.string().describe("CSS 选择器"),
        attr: z.string().optional().describe("获取属性值"),
        css: z.string().optional().describe("获取 CSS 属性值"),
        total: z.boolean().optional().describe("返回元素数量"),
        text: z.boolean().optional().describe("返回文本内容"),
        inner: z.boolean().optional().describe("返回 innerHTML"),
        all: z.boolean().optional().describe("返回所有匹配项"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ selector, attr, css, total, text, inner, all, vault }) => {
      return executeCLIForTool("dev:dom", { selector, attr, css, total, text, inner, all, vault });
    }
  );

  // 执行 JavaScript
  server.registerTool(
    "obsidian_eval",
    {
      title: "执行 JavaScript",
      description: "在 Obsidian 应用控制台中执行 JavaScript 代码。",
      inputSchema: z.object({
        code: z.string().describe("要执行的 JavaScript 代码"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ code, vault }) => {
      return executeCLIForTool("eval", { code, vault });
    }
  );

  // 移动端模拟
  server.registerTool(
    "obsidian_dev_mobile",
    {
      title: "切换移动端模拟",
      description: "切换移动端设备模拟模式。",
      inputSchema: z.object({
        on: z.boolean().optional().describe("启用移动端模拟"),
        off: z.boolean().optional().describe("禁用移动端模拟"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ on, off, vault }) => {
      return executeCLIForTool("dev:mobile", { on, off, vault });
    }
  );
}