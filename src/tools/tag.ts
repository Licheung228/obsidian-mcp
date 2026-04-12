import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册标签工具
 */
export function registerTagTools(server: ToolServer) {
  // 列出标签
  server.registerTool(
    "obsidian_tags",
    {
      title: "列出仓库标签",
      description: "列出仓库中的标签及其出现次数。",
      inputSchema: z.object({
        file: z.string().optional().describe("显示指定文件的标签"),
        path: z.string().optional().describe("显示指定路径文件的标签"),
        sort: z.enum(["count", "name"]).optional().describe("排序方式"),
        total: z.boolean().optional().describe("返回标签数量"),
        counts: z.boolean().optional().describe("包含标签数量"),
        active: z.boolean().optional().describe("显示活动文件的标签"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, sort, total, counts, active, vault }) => {
      return executeCLIForTool("tags", { file, path, sort, total, counts, active, vault });
    }
  );

  // 获取标签信息
  server.registerTool(
    "obsidian_tag",
    {
      title: "获取标签信息",
      description: "获取特定标签的详细信息，包括出现次数和相关文件。",
      inputSchema: z.object({
        name: z.string().describe("标签名称"),
        total: z.boolean().optional().describe("返回出现次数"),
        verbose: z.boolean().optional().describe("包含文件列表和数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, total, verbose, vault }) => {
      return executeCLIForTool("tag", { name, total, verbose, vault });
    }
  );
}