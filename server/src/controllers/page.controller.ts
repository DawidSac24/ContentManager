import { Request, Response, Router } from "express";
import { LoggerService } from "../services/logger.service";
import { PagesService } from "../services/page.service";
import { PageDTO, NewPageDTO } from "../models/page.model";
import { isIdentifier, isPage, isNewPage } from "../utils/guards";

export const pageController = Router();

/* GET /pages 
  Returns all pages
*/
pageController.get("/", (req: Request, res: Response) => {
  LoggerService.info("[GET] /pages");

  const pages: PageDTO[] = PagesService.getAll();

  res.status(200).json(pages);
});

/* GET /pages/:id 
  Returns a page by id
*/
pageController.get("/:id", (req: Request, res: Response) => {
  LoggerService.info("[GET] /pages/:id");
  const id: number = parseInt(req.params.id);

  if (!isIdentifier(id)) {
    LoggerService.error("Invalid Id");
    return res.status(400).json("Invalid Id");
  }

  const page = PagesService.getById(id);

  if (!page) {
    LoggerService.error("Page not found");
    return res.status(400).json("Page not found");
  }

  res.status(200).json(page);
});

/* POST /pages 
  Creates a new page
*/
pageController.post("/", (req: Request, res: Response) => {
  LoggerService.info("[POST] /pages");
  const page: NewPageDTO = req.body;

  if (!isNewPage(page)) {
    LoggerService.error("Invalid Page");
    return res.status(400).json("Invalid Page");
  }

  const createdPage = PagesService.insert(page);

  if (!createdPage) {
    LoggerService.error("Page not created");
    return res.status(400).json("Page not created");
  }

  res.status(200).json(createdPage);
});
