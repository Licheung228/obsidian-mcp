#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "./tools/index.js";

// 创建 MCP Server
const server = new McpServer({
  name: "obsidian-mcp",
  version: "0.1.0",
});

// 注册所有工具
registerAllTools(server);

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Obsidian MCP Server started"); // 使用 stderr 以避免干扰 MCP 协议
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
