import { Request, Response, Router } from "express";
import { LoggerService } from "../services/logger.service";
import { ContextsService } from "../services/context.service";
import { ContextDTO, NewContextDTO } from "../models/context.model";
import { isContext, isNewContext, isIdentifier } from "../utils/guards";

export const contextController = Router();

contextController.get("/", (req: Request, res: Response) => {
  LoggerService.info("[GET] /contexts");

  let contexts: ContextDTO[] = [];

  contexts = ContextsService.getAll();

  res.status(200).json(contexts);
});

contextController.get("/:id", (req: Request, res: Response) => {
  LoggerService.info("[GET] /contexts/:id");
  const id: number = parseInt(req.params.id);

  if (!isIdentifier(id)) {
    LoggerService.error("Invalid Id");
    return res.status(400).json("Invalid Id");
  }

  const context = ContextsService.getById(id);

  if (!context) {
    LoggerService.error("Context not found");
    return res.status(400).json("Context not found");
  }

  res.status(200).json(context);
});

contextController.post("/", (req: Request, res: Response) => {
  LoggerService.info("[POST] /contexts");
  const context: NewContextDTO = req.body;

  if (!isNewContext(context)) {
    LoggerService.error("Invalid Context");
    return res.status(400).json("Invalid Context");
  }

  const createdContext = ContextsService.insert(context);

  if (!createdContext) {
    LoggerService.error("Context not created");
    return res.status(400).json("Context not created");
  }

  res.status(200).json(createdContext);
});

contextController.put("/:id", (req: Request, res: Response) => {
  LoggerService.info("[PUT] /contexts/:id");
  const context: ContextDTO = req.body;

  if (!isContext(context)) {
    LoggerService.error("Invalid Context");
    return res.status(400).json("Invalid Context");
  }

  const updatedContext = ContextsService.update(context);

  if (!updatedContext) {
    LoggerService.error("Context not found");
    return res.status(400).json("Context not found");
  }

  res.status(200).json(updatedContext);
});

contextController.delete("/:id", (req: Request, res: Response) => {
  LoggerService.info("[DELETE] /contexts/:id");
  const id: number = parseInt(req.params.id);

  if (!isIdentifier(id)) {
    LoggerService.error("Invalid Id");
    return res.status(400).json("Invalid Id");
  }

  const deletedContext = ContextsService.delete(id);

  if (!deletedContext) {
    LoggerService.error("Context not found");
    return res.status(400).json("Context not found");
  }

  res.status(200).json();
});
