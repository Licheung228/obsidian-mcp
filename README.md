# Obsidian MCP

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-green.svg)](https://nodejs.org/)
[![Obsidian Version](https://img.shields.io/badge/Obsidian-1.12%2B-7C3AED?logo=obsidian&logoColor=white)](https://obsidian.md/)

一个基于 Model Context Protocol (MCP) 的 Obsidian CLI 集成服务器，让 AI 工具（如 Claude Code、Codex）能够通过标准化接口与 Obsidian 进行交互。

## 功能

提供 110+ 个 MCP 工具，覆盖 Obsidian CLI 的主要命令能力：

| 类别         | 工具                                                                                            |
| ------------ | ----------------------------------------------------------------------------------------------- |
| **文件操作** | `read`, `create`, `append`, `prepend`, `move`, `rename`, `delete`, `files`, `open`, `file_info` |
| **搜索**     | `search`, `search_context`, `search_open`                                                       |
| **日记**     | `daily`, `daily_read`, `daily_append`, `daily_prepend`, `daily_path`                            |
| **任务**     | `tasks`, `task`                                                                                 |
| **标签**     | `tags`, `tag`                                                                                   |
| **属性**     | `properties`, `property_set`, `property_read`, `property_remove`, `aliases`                     |
| **链接**     | `backlinks`, `links`, `unresolved`, `orphans`, `deadends`                                       |
| **模板**     | `templates`, `template_read`, `template_insert`                                                 |
| **大纲**     | `outline`                                                                                       |
| **仓库**     | `vault`, `vaults`, `folder`, `folders`                                                          |
| **书签**     | `bookmarks`, `bookmark`                                                                         |
| **工作区**   | `workspace`, `workspaces`, `workspace_save/load/delete`, `tabs`, `recents`                      |
| **插件**     | `plugins`, `plugins_enabled`, `plugin_enable/disable/install/uninstall/reload`                  |
| **主题**     | `themes`, `theme`, `theme_set/install/uninstall`, `snippets`, `snippet_enable/disable`          |
| **同步**     | `sync`, `sync_status/history/read/restore`, `sync_deleted`                                      |
| **发布**     | `publish_site/list/status/add/remove/open`                                                      |
| **数据库**   | `bases`, `base_views/create/query`                                                              |
| **命令**     | `commands`, `command`, `hotkeys`, `hotkey`                                                      |
| **历史**     | `diff`, `history`, `history_list/read/restore/open`                                             |
| **其他**     | `wordcount`, `random`, `random_read`, `unique`, `web`, `help`, `version`, `reload`, `restart`   |
| **开发者**   | `devtools`, `dev_debug/errors/screenshot/console/css/dom/mobile`, `eval`                        |

## 安装

### 前置条件

- Obsidian 1.12+ 安装程序版本
- Obsidian 应用运行中
- Obsidian CLI 已注册（运行 `obsidian help` 验证）

### 使用 npm 包

```bash
npx -y @likcheung/obsidian-mcp
```

如果你正在当前仓库源码目录内执行 `npx -y @likcheung/obsidian-mcp`，npm 可能会优先解析当前项目，导致 `sh: obsidian-mcp: command not found`。这种情况下请在其他目录执行，或者直接使用 `node dist/index.js`。

### 从源码构建

```bash
# 安装依赖
pnpm install

# 构建
pnpm build
```

## 配置

### Claude Code

在 Claude Code 的配置文件中添加 MCP 服务器：

编辑 `~/.claude/settings.json`
根据你选择的方式进行配置

**方式一：本地路径**

clone 项目到本地

```bash
pnpm install
pnpm build
```

```json
{
  "mcpServers": {
    "obsidian": {
      "command": "node",
      "args": ["<path-to-obsidian-mcp>/dist/index.js"]
    }
  }
}
```

**方式二：npx**

```json
{
  "mcpServers": {
    "obsidian": {
      "args": ["-y", "@likcheung/obsidian-mcp"],
      "command": "npx"
    }
  }
}
```

### Codex / 其他 MCP 客户端

参考各客户端的 MCP 配置文档，配置方式类似。

## 开发

```bash
# 开发模式（监听文件变化）
pnpm dev

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint

# 格式化
pnpm format
```

## 使用示例

在 Claude Code 中使用：

```
# 读取今天的日记
> 使用 obsidian_daily_read

# 搜索包含 "meeting" 的文件
> 使用 obsidian_search，query="meeting"

# 向日记追加任务
> 使用 obsidian_daily_append，content="- [ ] 新任务"

# 列出所有未完成的任务
> 使用 obsidian_tasks，todo=true

# 获取文件的反向链接
> 使用 obsidian_backlinks，file="某个笔记"
```

## 项目结构

```
obsidian-mcp/
├── src/
│   ├── index.ts           # 入口文件
│   ├── tools/             # MCP 工具定义
│   │   ├── file.ts        # 文件操作
│   │   ├── search.ts      # 搜索
│   │   ├── daily.ts       # 日记
│   │   ├── task.ts        # 任务
│   │   └── ...            # 其他工具模块
│   ├── cli/
│   │   ├── executor.ts    # CLI 执行器
│   │   └── types.ts       # 类型定义
│   └── utils/
│       └── error.ts       # 错误处理
├── dist/                  # 构建输出
├── package.json
├── tsconfig.json
└── eslint.config.js
```

## 技术栈

- [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk) - MCP 协议实现
- [Zod](https://zod.dev/) - 参数验证
- [tsup](https://tsup.egoist.dev/) - 构建工具
- TypeScript + ESM

## 社区支持

**学 AI，上 L 站**

[![LINUX DO](https://img.shields.io/badge/LINUX%20DO-社区-gray?style=flat-square)](https://linux.do/) [![社区支持](https://img.shields.io/badge/社区支持-交流-blue?style=flat-square)](https://linux.do/)

本项目在 [LINUX DO](https://linux.do/) 社区发布与交流，感谢佬友们的支持与反馈。

## License

MIT
