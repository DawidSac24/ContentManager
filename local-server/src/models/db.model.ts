import { DBSchema } from "idb";
import { Context } from "./context.model";
import { Page } from "./page.model";

export interface DB extends DBSchema {
  contexts: {
    key: number;
    value: Context;
    indexes: { "by-id": number; "by-name": string }; // Optional indexes
  };
  pages: {
    key: number;
    value: Page;
    indexes: { "by-id": number; "by-title": string; "by-url": string }; // url probably not needed !!!
  };
}
