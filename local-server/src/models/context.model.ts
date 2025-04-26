import { Page } from "./page.model";

export interface Context {
  id?: number;
  name: string;
  pages: Page[];
  isDeleted: boolean;
}

export interface NewContext {
  name: string;
}
