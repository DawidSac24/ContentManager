import { Page, NewPage } from "../models/page.model";
import { DB } from "./db.service";
import { LoggerService } from "./logger.service";

export class PagesService {
  public static getAll(): Page[] {
    const req = `SELECT * FROM pages`;
    let pages;

    try {
      pages = DB.prepare(req).all();
    } catch (error) {
      LoggerService.error(error);
      throw new Error("Internal Error");
    }

    const results: Page[] = [];

    for (const page of pages) {
      results.push({
        id: page.id,
        title: page.title,
        url: page.url,
      });
    }

    return results;
  }

  public static getById(id: number): Page | null {
    const req = `SELECT * FROM pages WHERE id = ?`;
    let page;

    try {
      page = DB.prepare(req).get(id);
    } catch (error) {
      LoggerService.error(error);
      throw new Error("Internal Error");
    }

    if (!page) {
      return null;
    }

    return {
      id: page.id,
      title: page.title,
      url: page.url,
    };
  }

  public static insert(page: NewPage): Page | null {
    const req = `INSERT INTO pages (title, url) VALUES (?, ?)`;
    let result;

    try {
      result = DB.prepare(req).run(page.title, page.url);
    } catch (error) {
      LoggerService.error(error);
      throw new Error("Internal Error");
    }

    return {
      id: result.lastInsertRowId,
      title: page.title,
      url: page.url,
    };
  }
}
