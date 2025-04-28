"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const utils_1 = require("../utils/utils");
class LoggerService {
    /**
     * Private generic log function
     * @param message the message to log
     * @param level the level of the log
     */
    static log(message, level) {
        console.log(`${new Date().toISOString()} [${level}] ${message}`);
    }
    /**
     * Log a message on the info level
     * @param message the message to log
     */
    static info(message) {
        this.log(message, "INFO");
    }
    /**
     * Log a message on the info level and show browser alert
     * @param message the message to log
     */
    static alert(message) {
        this.log(message, "ALERT");
        if (typeof window !== "undefined") {
            window.alert(message);
        }
    }
    /**
     * Log a message on the debug level
     * @param message the message to log
     */
    static debug(message) {
        this.log(message, "DEBUG");
    }
    /**
     * Log a message on the error level and show browser alert
     * @param error the error to log
     */
    static error(error) {
        if (error instanceof Error) {
            this.log(error.message, "ERROR");
            (0, utils_1.writeLogs)("logs/error.log", error.message);
        }
        else if (typeof error === "string") {
            this.log(error, "ERROR");
            (0, utils_1.writeLogs)("logs/error.log", error);
        }
    }
}
exports.LoggerService = LoggerService;
