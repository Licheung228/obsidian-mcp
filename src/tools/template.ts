import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册模板工具
 */
export function registerTemplateTools(server: ToolServer) {
  // 列出模板
  server.registerTool(
    "obsidian_templates",
    {
      title: "列出模板",
      description: "列出仓库中可用的模板。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回模板数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ total, vault }) => {
      return executeCLIForTool("templates", { total, vault });
    }
  );

  // 读取模板
  server.registerTool(
    "obsidian_template_read",
    {
      title: "读取模板内容",
      description: "读取模板的内容，可选择解析变量。",
      inputSchema: z.object({
        name: z.string().describe("模板名称"),
        title: z.string().optional().describe("用于变量解析的标题"),
        resolve: z.boolean().optional().describe("解析模板变量（{{date}}, {{time}}, {{title}}）"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, title, resolve, vault }) => {
      return executeCLIForTool("template:read", { name, title, resolve, vault });
    }
  );

  // 插入模板
  server.registerTool(
    "obsidian_template_insert",
    {
      title: "插入模板到活动文件",
      description: "将模板插入到当前活动文件中。",
      inputSchema: z.object({
        name: z.string().describe("模板名称"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, vault }) => {
      return executeCLIForTool("template:insert", { name, vault });
    }
  );
}
