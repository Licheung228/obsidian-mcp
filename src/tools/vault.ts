import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册仓库工具
 */
export function registerVaultTools(server: ToolServer) {
  // 仓库信息
  server.registerTool(
    "obsidian_vault",
    {
      title: "显示仓库信息",
      description: "显示当前仓库的基本信息。",
      inputSchema: z.object({
        info: z.enum(["name", "path", "files", "folders", "size"]).optional().describe("仅返回特定信息"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ info, vault }) => {
      return executeCLIForTool("vault", { info, vault });
    }
  );

  // 列出仓库
  server.registerTool(
    "obsidian_vaults",
    {
      title: "列出已知仓库",
      description: "列出 Obsidian 已知的所有仓库。",
      inputSchema: z.object({
        total: z.boolean().optional().describe("返回仓库数量"),
        verbose: z.boolean().optional().describe("包含仓库路径"),
      }),
    },
    async ({ total, verbose }) => {
      return executeCLIForTool("vaults", { total, verbose });
    }
  );

  // 文件夹信息
  server.registerTool(
    "obsidian_folder",
    {
      title: "显示文件夹信息",
      description: "显示文件夹的基本信息。",
      inputSchema: z.object({
        path: z.string().describe("文件夹路径"),
        info: z.enum(["files", "folders", "size"]).optional().describe("仅返回特定信息"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ path, info, vault }) => {
      return executeCLIForTool("folder", { path, info, vault });
    }
  );

  // 列出文件夹
  server.registerTool(
    "obsidian_folders",
    {
      title: "列出仓库文件夹",
      description: "列出仓库中的所有文件夹。",
      inputSchema: z.object({
        folder: z.string().optional().describe("按父文件夹筛选"),
        total: z.boolean().optional().describe("返回文件夹数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ folder, total, vault }) => {
      return executeCLIForTool("folders", { folder, total, vault });
    }
  );
}