import { Page } from "./page.model";

export interface Context {
  id?: number;
  name: string;
  pages: Page[];
}

export interface NewContext {
  name: string;
}
