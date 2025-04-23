import { Request, Response, Router } from "express";
import { LoggerService } from "../services/logger.service";
import { ContextsService } from "../services/context.service";
import { ContextDTO, NewContextDTO } from "../models/context.model";
import { isNewContext } from "../utils/guards";

export const contextController = Router();

contextController.get("/", (req: Request, res: Response) => {
  LoggerService.info("[GET] /contexts");

  let contexts: ContextDTO[] = [];

  contexts = ContextsService.getAll();

  res.status(200).json(contexts);
});

contextController.post("/", (req: Request, res: Response) => {
  LoggerService.info("[POST] /contexts");
  const context: NewContextDTO = req.body;

  if (!isNewContext(context)) {
    res.status(400).json("Invalid Context");
    return;
  }

  const createdContext = ContextsService.insert(context);

  res.status(200).json(createdContext);
});
