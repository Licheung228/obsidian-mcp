import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export type ToolServer = Pick<McpServer, "registerTool">;
