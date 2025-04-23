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

  public static getById(id: number): Context | null {
    const req = `SELECT * FROM contexts WHERE id = ?`;
    let context;

    try {
      context = DB.prepare(req).get(id);
    } catch (error) {
      LoggerService.error(error);
      throw new Error("Internal Error");
    }

    if (!context) {
      return null;
    }

    return {
      id: context.id,
      name: context.name,
      icon_id: context.icon_id,
      deleted: context.deleted,
    };
  }

  public static insert(newContext: NewContext): Context | null {
    const req = `INSERT INTO contexts (name, icon_id, deleted) 
           VALUES (?, ?, false)`;
    let info;

    try {
      info = DB.prepare(req).run(
        newContext.name,
        newContext.icon_id ?? 1 // Default to 1 if not provided
      );
    } catch (error) {
      LoggerService.error(error);
      throw new Error("Internal Error");
    }

    return {
      id: info.lastInsertRowId,
      name: newContext.name,
      icon_id: newContext.icon_id ?? 1,
      deleted: false,
    };
  }

  public static update(context: Context): Context | null {
    const req = `UPDATE contexts SET name = ?, icon_id = ?, deleted = ? WHERE id = ?`;
    let info;

    try {
      info = DB.prepare(req).run(
        context.name,
        context.icon_id ?? 1, // default to 1 if not provided
        context.deleted ? 1 : 0,
        context.id
      );
    } catch (error) {
      LoggerService.error(error);
      throw new Error("Internal Error");
    }

    if (info.changes === 0) {
      return null;
    }

    return {
      id: context.id,
      name: context.name,
      icon_id: context.icon_id ?? 1,
      deleted: context.deleted,
    };
  }

  public static delete(id: number): boolean {
    const req = `DELETE FROM contexts WHERE id = ?`;
    let info;

    try {
      info = DB.prepare(req).run(id);
    } catch (error) {
      LoggerService.error(error);
      throw new Error("Internal Error");
    }
    return true;
  }
}
