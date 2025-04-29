import fs from "fs";
import { log } from "console";

/**
 * Write a log message to a file
 * @param filePath the path to reach the file
 * @param logMessage the message to write in the file
 */
export function writeLogs(filePath: string, logMessage: string) {
  logMessage = `${new Date().toISOString()} - ${logMessage}\n`;
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, logMessage);
  } else {
    fs.appendFileSync(filePath, logMessage);
  }
}

