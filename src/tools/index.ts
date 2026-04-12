import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerFileTools } from "./file.js";
import { registerSearchTools } from "./search.js";
import { registerDailyTools } from "./daily.js";
import { registerTaskTools } from "./task.js";
import { registerPropertyTools } from "./property.js";
import { registerTagTools } from "./tag.js";
import { registerLinkTools } from "./link.js";
import { registerOutlineTools } from "./outline.js";
import { registerTemplateTools } from "./template.js";
import { registerVaultTools } from "./vault.js";
import { registerBookmarkTools } from "./bookmark.js";
import { registerWorkspaceTools } from "./workspace.js";
import { registerPluginTools } from "./plugin.js";
import { registerThemeTools } from "./theme.js";
import { registerSyncTools } from "./sync.js";
import { registerPublishTools } from "./publish.js";
import { registerBaseTools } from "./base.js";
import { registerCommandTools } from "./command.js";
import { registerHistoryTools } from "./history.js";
import { registerMiscTools } from "./misc.js";
import { registerDevTools } from "./dev.js";

/**
 * 注册所有工具
 */
export function registerAllTools(server: McpServer) {
  // Phase 1: 核心工具
  registerFileTools(server);
  registerSearchTools(server);
  registerDailyTools(server);
  registerTaskTools(server);

  // Phase 2: 常用工具
  registerPropertyTools(server);
  registerTagTools(server);
  registerLinkTools(server);
  registerOutlineTools(server);
  registerTemplateTools(server);
  registerVaultTools(server);

  // Phase 3-4: 高级工具
  registerBookmarkTools(server);
  registerWorkspaceTools(server);
  registerPluginTools(server);
  registerThemeTools(server);
  registerSyncTools(server);
  registerPublishTools(server);
  registerBaseTools(server);
  registerCommandTools(server);
  registerHistoryTools(server);
  registerMiscTools(server);
  registerDevTools(server);
}