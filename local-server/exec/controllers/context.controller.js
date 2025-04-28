"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextController = void 0;
const express_1 = require("express");
const logger_service_1 = require("../services/logger.service");
const guards_1 = require("../utils/guards");
const context_service_1 = require("../services/context.service");
const asyncHandler = require("express-async-handler");
class ContextController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.addContext = (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger_service_1.LoggerService.info("[POST] /users/");
            const newContext = req.body;
            if (!(0, guards_1.isNewContext)(newContext)) {
                logger_service_1.LoggerService.error("Bad request: Invalid new context model");
                return res.status(400).json({ error: "Invalid new context model" });
            }
            try {
                const context = yield context_service_1.ContextService.add(newContext).then((context) => {
                    return {
                        id: context.id,
                        name: context.name,
                        pages: context.pages,
                        isDeleted: context.isDeleted,
                    };
                });
                logger_service_1.LoggerService.alert(`Context created successfully`);
                return res.status(200).json(context);
            }
            catch (error) {
                logger_service_1.LoggerService.error("Internal server error");
                return res.status(500).json("Internal server error");
            }
        });
        this.getAllContexts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger_service_1.LoggerService.info("[GET] /contexts/");
            logger_service_1.LoggerService.info("Getting all contexts");
            const contexts = context_service_1.ContextService.getAll();
            return res.status(200).json(contexts);
        });
        // async getById(id: number): Promise<ContextDTO> {
        //   LoggerService.info(`Getting context with id: ${id}`);
        //   if (!isIdentifier(id)) {
        //     LoggerService.error("Invalid context id");
        //     throw new Error("Invalid context id");
        //   }
        //   const context = await ContextService.getById(id);
        //   if (!context) {
        //     LoggerService.error("Context not found");
        //     throw new Error("Context not found");
        //   }
        //   LoggerService.info(`Context ${context.name} found successfully`);
        //   return context as ContextDTO;
        // }
        this.editContext = (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger_service_1.LoggerService.info("[PUT] /contexts/");
            const updatedContext = req.body;
            if (!(0, guards_1.isContext)(updatedContext)) {
                logger_service_1.LoggerService.error("Invalid context model");
                throw new Error("Invalid context model");
            }
            context_service_1.ContextService.update(updatedContext);
            return res.status(200).json(updatedContext);
        });
        this.softDeleteContext = (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger_service_1.LoggerService.info("[PUT] /contexts/soft-del/:id");
            const id = parseInt(req.params.id);
            if (!(0, guards_1.isIdentifier)(id)) {
                logger_service_1.LoggerService.error("Invalid context id");
                throw new Error("Invalid context id");
            }
            context_service_1.ContextService.softDelete(id);
            return res.status(200).send("Context soft deleted successfully");
        });
        this.deleteContext = (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger_service_1.LoggerService.info("[DELETE] /contexts/:id");
            const id = parseInt(req.params.id);
            if (!(0, guards_1.isIdentifier)(id)) {
                logger_service_1.LoggerService.error("Invalid context id");
                throw new Error("Invalid context id");
            }
            context_service_1.ContextService.delete(id);
            return res.status(200).send("Context deleted successfully");
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", asyncHandler(this.addContext));
        this.router.get("/", asyncHandler(this.getAllContexts));
        this.router.put("/", asyncHandler(this.editContext));
        this.router.put("/soft-del/:id", asyncHandler(this.softDeleteContext));
        this.router.delete("/:id", asyncHandler(this.deleteContext));
    }
}
exports.contextController = new ContextController();
