import { z } from "zod";
import { executeCLIForTool } from "../cli/executor.js";
import type { ToolServer } from "./types.js";

/**
 * 注册文件操作工具
 */
export function registerFileTools(server: ToolServer) {
  // 读取文件
  server.registerTool(
    "obsidian_read",
    {
      title: "读取 Obsidian 文件",
      description: "读取 Obsidian 仓库中的文件内容。默认读取当前活动文件。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名（无需扩展名，使用 Wiki 链接解析）"),
        path: z.string().optional().describe("完整文件路径（从仓库根目录）"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, vault }) => {
      return executeCLIForTool("read", { file, path, vault });
    }
  );

  // 创建文件
  server.registerTool(
    "obsidian_create",
    {
      title: "创建 Obsidian 文件",
      description: "创建或覆盖文件。可指定名称、路径、内容和模板。",
      inputSchema: z.object({
        name: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        content: z.string().optional().describe("初始内容（支持 \\n 换行，\\t 制表符）"),
        template: z.string().optional().describe("使用的模板名称"),
        overwrite: z.boolean().optional().describe("如果文件存在则覆盖"),
        open: z.boolean().optional().describe("创建后打开文件"),
        newtab: z.boolean().optional().describe("在新标签页中打开"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ name, path, content, template, overwrite, open, newtab, vault }) => {
      return executeCLIForTool("create", {
        name,
        path,
        content,
        template,
        overwrite,
        open,
        newtab,
        vault,
      });
    }
  );

  // 追加内容
  server.registerTool(
    "obsidian_append",
    {
      title: "追加内容到文件",
      description: "向文件追加内容。默认追加到当前活动文件。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        content: z.string().describe("要追加的内容"),
        inline: z.boolean().optional().describe("追加时不换行"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, content, inline, vault }) => {
      return executeCLIForTool("append", { file, path, content, inline, vault });
    }
  );

  // 前置插入内容
  server.registerTool(
    "obsidian_prepend",
    {
      title: "在文件开头插入内容",
      description: "在前置元数据之后插入内容。默认插入到当前活动文件。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        content: z.string().describe("要插入的内容"),
        inline: z.boolean().optional().describe("插入时不换行"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, content, inline, vault }) => {
      return executeCLIForTool("prepend", { file, path, content, inline, vault });
    }
  );

  // 列出文件
  server.registerTool(
    "obsidian_files",
    {
      title: "列出仓库文件",
      description: "列出仓库中的所有文件。",
      inputSchema: z.object({
        folder: z.string().optional().describe("按文件夹筛选"),
        ext: z.string().optional().describe("按扩展名筛选"),
        total: z.boolean().optional().describe("返回文件数量"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ folder, ext, total, vault }) => {
      return executeCLIForTool("files", { folder, ext, total, vault });
    }
  );

  // 移动文件
  server.registerTool(
    "obsidian_move",
    {
      title: "移动文件",
      description: "移动或重命名文件。会自动更新内部链接（如果启用了相关设置）。",
      inputSchema: z.object({
        file: z.string().optional().describe("源文件名"),
        path: z.string().optional().describe("源文件路径"),
        to: z.string().describe("目标文件夹或路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, to, vault }) => {
      return executeCLIForTool("move", { file, path, to, vault });
    }
  );

  // 重命名文件
  server.registerTool(
    "obsidian_rename",
    {
      title: "重命名文件",
      description: "重命名文件。省略扩展名时自动保留原扩展名。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        name: z.string().describe("新文件名"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, name, vault }) => {
      return executeCLIForTool("rename", { file, path, name, vault });
    }
  );

  // 删除文件
  server.registerTool(
    "obsidian_delete",
    {
      title: "删除文件",
      description: "删除文件。默认移至回收站。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        permanent: z.boolean().optional().describe("跳过回收站，永久删除"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, permanent, vault }) => {
      return executeCLIForTool("delete", { file, path, permanent, vault });
    }
  );

  // 打开文件
  server.registerTool(
    "obsidian_open",
    {
      title: "打开文件",
      description: "在 Obsidian 中打开文件。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        newtab: z.boolean().optional().describe("在新标签页中打开"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, newtab, vault }) => {
      return executeCLIForTool("open", { file, path, newtab, vault });
    }
  );

  // 文件信息
  server.registerTool(
    "obsidian_file_info",
    {
      title: "获取文件信息",
      description: "显示文件信息（路径、名称、大小、创建/修改时间等）。",
      inputSchema: z.object({
        file: z.string().optional().describe("文件名"),
        path: z.string().optional().describe("文件路径"),
        vault: z.string().optional().describe("仓库名称或 ID"),
      }),
    },
    async ({ file, path, vault }) => {
      return executeCLIForTool("file", { file, path, vault });
    }
  );
}