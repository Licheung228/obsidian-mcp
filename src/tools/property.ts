import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册属性工具
 */
export function registerPropertyTools(server: ToolServer) {
  // 列出属性
  server.registerTool(
    "obsidian_properties",
    {
      title: "列出仓库属性",
      description: "列出仓库中的属性及其出现次数。",
      inputSchema: z.object({
        file: z.string().optional().describe("显示指定文件的属性"),
        path: z.string().optional().describe("显示指定路径文件的属性"),
        name: z.string().optional().describe("获取特定属性的数量"),
        sort: z.enum(["count", "name"]).optional().describe("排序方式"),
        total: z.boolean().optional().describe("返回属性数量"),
        counts: z.boolean().optional().describe("包含出现次数"),
        active: z.boolean().optional().describe("显示活动文件的属性"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, name, sort, total, counts, active, vault }) => {
      return executeCLIForTool("properties", { file, path, name, sort, total, counts, active, vault });
    }
  );

  // 设置属性
  server.registerTool(
    "obsidian_property_set",
    {
      title: "设置文件属性",
      description: "在文件上设置属性值。默认设置到当前活动文件。",
      inputSchema: z.object({
        name: z.string().describe("属性名称"),
        value: z.string().describe("属性值"),
        type: z.enum(["text", "list", "number", "checkbox", "date", "datetime"]).optional().describe("属性类型"),
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, value, type, file, path, vault }) => {
      return executeCLIForTool("property:set", { name, value, type, file, path, vault });
    }
  );

  // 读取属性值
  server.registerTool(
    "obsidian_property_read",
    {
      title: "读取属性值",
      description: "从文件中读取特定属性的值。默认读取当前活动文件。",
      inputSchema: z.object({
        name: z.string().describe("属性名称"),
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, file, path, vault }) => {
      return executeCLIForTool("property:read", { name, file, path, vault });
    }
  );

  // 删除属性
  server.registerTool(
    "obsidian_property_remove",
    {
      title: "删除属性",
      description: "从文件中移除属性。默认从当前活动文件移除。",
      inputSchema: z.object({
        name: z.string().describe("属性名称"),
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, file, path, vault }) => {
      return executeCLIForTool("property:remove", { name, file, path, vault });
    }
  );

  // 列出别名
  server.registerTool(
    "obsidian_aliases",
    {
      title: "列出别名",
      description: "列出仓库中的别名。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        total: z.boolean().optional().describe("返回别名数量"),
        verbose: z.boolean().optional().describe("包含文件路径"),
        active: z.boolean().optional().describe("显示活动文件的别名"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, total, verbose, active, vault }) => {
      return executeCLIForTool("aliases", { file, path, total, verbose, active, vault });
    }
  );
}