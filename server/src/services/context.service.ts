import { Context } from "../models/context.model";
import { DB } from "./db.service";
import { LoggerService } from "./logger.service";

export class ContextsService {
  public static getAll(): Context[] {
    const req = `SELECT * FROM contexts
                 WHERE deleted = false`;
    let contexts: Context[] = [];

    try {
      contexts = DB.query(req);
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
}
