import { Request, Response, Router } from "express";
import { LoggerService } from "../services/logger.service";
import { ContextsService } from "../services/context.service";
import { Context } from "../models/context.model";

export const contextController = Router();

contextController.get("/", (req: Request, res: Response) => {
  LoggerService.info("[GET] /contexts");

  let contexts: Context[] = [];

  try {
    contexts = ContextsService.getAll();
  } catch (error) {
    LoggerService.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  res.status(200).json(contexts);
});
