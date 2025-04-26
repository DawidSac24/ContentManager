import { DBSchema } from "idb";
import { Context } from "./context.model";
import { Page } from "./page.model";

export interface DB extends DBSchema {
  contexts: {
    key: number;
    value: Context;
    indexes: {
      "by-id": number;
      "by-name": string;
      "by-isDeleted": boolean;
    };
  };
  pages: {
    key: number;
    value: Page;
    indexes: {
      "by-id": number;
      "by-title": string;
      "by-url": string;
    };
  };
  [key: string]: {
    key: number;
    value: any;
    indexes?: { [key: string]: any };
  };
}
