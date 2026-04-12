/**
 * CLI 参数类型
 */
export type CLIArg = string | boolean | number | undefined;

/**
 * CLI 参数对象
 */
export type CLIArgs = Record<string, CLIArg>;

/**
 * CLI 执行结果
 */
export interface CLIResult {
  stdout: string;
  stderr: string;
  success: boolean;
}

/**
 * CLI 命令类型映射
 */
export type CLICommand = string;

/**
 * 常用文件参数
 */
export interface FileParams {
  /** 文件名（使用 Wiki 链接解析方式） */
  file?: string;
  /** 完整文件路径（从仓库根目录） */
  path?: string;
}

/**
 * 仓库参数
 */
export interface VaultParams {
  /** 仓库名称或 ID */
  vault?: string;
}

/**
 * 内容参数
 */
export interface ContentParams {
  /** 要追加/插入的内容 */
  content?: string;
  /** 不换行 */
  inline?: boolean;
}