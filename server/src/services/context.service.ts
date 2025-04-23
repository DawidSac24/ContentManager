import { Context, NewContext } from "../models/context.model";
import { DB } from "./db.service";
import { LoggerService } from "./logger.service";

export class ContextsService {
  public static getAll(): Context[] {
    const req = `SELECT * FROM contexts
                 WHERE deleted = false`;
    let contexts;

    try {
      contexts = DB.prepare(req).all();
    } catch (error) {
      LoggerService.error(error);
      throw new Error("Internal Error");
    }

    const results: Context[] = [];

    for (const context of contexts) {
      results.push({
        id: context.id,
        name: context.name,
        icon_id: context.icon_id,
        deleted: context.deleted,
      });
    }

    return results;
  }

  public static insert(newContext: NewContext): Context | null {
    const req = `INSERT INTO contexts (name, icon_id, deleted) 
           VALUES (?, ?, ?)`;
    let info;

    try {
      info = DB.prepare(req).run(
        newContext.name,
        newContext.icon_id ?? 0,
        0 // Convert false to 0 for SQLite
      );
    } catch (error) {
      LoggerService.error(error);
      throw new Error("Internal Error");
    }

    return {
      id: info.lastInsertRowId,
      name: newContext.name,
      icon_id: newContext.icon_id ?? 0,
      deleted: false,
    };
  }
}
