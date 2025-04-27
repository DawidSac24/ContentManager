"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// import dependencies
const cors = require("cors");
const express_1 = __importDefault(require("express"));
const context_controller_1 = require("./controllers/context.controller");
// creates an express app
exports.app = (0, express_1.default)();
exports.app.use(cors());
exports.app.use(express_1.default.json());
exports.app.use("/contexts/", context_controller_1.contextController.router);
