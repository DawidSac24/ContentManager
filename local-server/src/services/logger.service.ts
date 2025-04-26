import { writeLogs } from "../utils/utils";

export class LoggerService {
  /**
   * Private generic log function
   * @param message the message to log
   * @param level the level of the log
   */
  private static log(message: string, level: string): void {
    console.log(`${new Date().toISOString()} [${level}] ${message}`);
  }

  /**
   * Log a message on the info level
   * @param message the message to log
   */
  static info(message: string): void {
    this.log(message, "INFO");
  }

  /**
   * Log a message on the info level and show browser alert
   * @param message the message to log
   */
  static alert(message: string): void {
    this.log(message, "ALERT");
    if (typeof window !== "undefined") {
      window.alert(message);
    }
  }

  /**
   * Log a message on the debug level
   * @param message the message to log
   */
  static debug(message: string): void {
    this.log(message, "DEBUG");
  }

  /**
   * Log a message on the error level and show browser alert
   * @param error the error to log
   */
  static error(error: unknown): void {
    if (error instanceof Error) {
      this.log(error.message, "ERROR");
      writeLogs("logs/error.log", error.message);
    } else if (typeof error === "string") {
      this.log(error, "ERROR");
      writeLogs("logs/error.log", error);
    }
  }
}
