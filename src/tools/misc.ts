import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册其他工具
 */
export function registerMiscTools(server: ToolServer) {
  // 字数统计
  server.registerTool(
    "obsidian_wordcount",
    {
      title: "统计字数",
      description: "统计文件的字数和字符数。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        words: z.boolean().optional().describe("仅返回字数"),
        characters: z.boolean().optional().describe("仅返回字符数"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, words, characters, vault }) => {
      return executeCLIForTool("wordcount", { file, path, words, characters, vault });
    }
  );

  // 随机笔记
  server.registerTool(
    "obsidian_random",
    {
      title: "打开随机笔记",
      description: "打开一篇随机笔记。",
      inputSchema: z.object({
        folder: z.string().optional().describe("限定在某文件夹内"),
        newtab: z.boolean().optional().describe("在新标签页中打开"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ folder, newtab, vault }) => {
      return executeCLIForTool("random", { folder, newtab, vault });
    }
  );

  // 读取随机笔记
  server.registerTool(
    "obsidian_random_read",
    {
      title: "读取随机笔记",
      description: "读取一篇随机笔记的内容。",
      inputSchema: z.object({
        folder: z.string().optional().describe("限定在某文件夹内"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ folder, vault }) => {
      return executeCLIForTool("random:read", { folder, vault });
    }
  );

  // 创建时间戳笔记
  server.registerTool(
    "obsidian_unique",
    {
      title: "创建时间戳笔记",
      description: "创建带有时间戳的唯一笔记。",
      inputSchema: z.object({
        name: z.string().optional().describe("笔记名称"),
        content: z.string().optional().describe("初始内容"),
        paneType: z.enum(["tab", "split", "window"]).optional().describe("打开方式"),
        open: z.boolean().optional().describe("创建后打开文件"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, content, paneType, open, vault }) => {
      return executeCLIForTool("unique", { name, content, paneType, open, vault });
    }
  );

  // 打开网页
  server.registerTool(
    "obsidian_web",
    {
      title: "在网页浏览器中打开 URL",
      description: "使用 Obsidian 的网页浏览器打开 URL。",
      inputSchema: z.object({
        url: z.string().describe("要打开的 URL"),
        newtab: z.boolean().optional().describe("在新标签页中打开"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ url, newtab, vault }) => {
      return executeCLIForTool("web", { url, newtab, vault });
    }
  );

  // 帮助
  server.registerTool(
    "obsidian_help",
    {
      title: "显示帮助信息",
      description: "显示 Obsidian CLI 的帮助信息。",
      inputSchema: z.object({
        command: z.string().optional().describe("显示特定命令的帮助"),
      }),
    },
    async ({ command }) => {
      return executeCLIForTool("help", { command });
    }
  );

  // 版本
  server.registerTool(
    "obsidian_version",
    {
      title: "显示 Obsidian 版本",
      description: "显示 Obsidian 的版本信息。",
      inputSchema: z.object({}),
    },
    async () => {
      return executeCLIForTool("version", {});
    }
  );

  // 重新加载
  server.registerTool(
    "obsidian_reload",
    {
      title: "重新加载应用",
      description: "重新加载 Obsidian 应用窗口。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("reload", { vault });
    }
  );

  // 重启
  server.registerTool(
    "obsidian_restart",
    {
      title: "重启应用",
      description: "重启 Obsidian 应用。",
      inputSchema: z.object({
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ vault }) => {
      return executeCLIForTool("restart", { vault });
    }
  );
}