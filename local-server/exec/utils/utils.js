"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLogs = writeLogs;
const fs_1 = __importDefault(require("fs"));
/**
 * Write a log message to a file
 * @param filePath the path to reach the file
 * @param logMessage the message to write in the file
 */
function writeLogs(filePath, logMessage) {
    logMessage = `${new Date().toISOString()} - ${logMessage}\n`;
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.writeFileSync(filePath, logMessage);
    }
    else {
        fs_1.default.appendFileSync(filePath, logMessage);
    }
}
