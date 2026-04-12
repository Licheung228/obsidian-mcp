/**
 * CLI 执行错误
 */
export class CLIError extends Error {
  public readonly stderr: string;
  public readonly command: string;

  constructor(message: string, stderr: string, command: string) {
    super(message);
    this.name = "CLIError";
    this.stderr = stderr;
    this.command = command;
  }
}

/**
 * 创建错误结果
 */
export function createErrorResult(error: unknown, command: string): { success: false; error: string } {
  if (error instanceof CLIError) {
    return { success: false, error: error.message };
  }
  if (error instanceof Error) {
    return { success: false, error: error.message };
  }
  return { success: false, error: `Unknown error executing: ${command}` };
}