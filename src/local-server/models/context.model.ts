import { Page } from "./page.model";

export interface NewContext {
  name: string;
}

export interface Context extends NewContext {
  id: number;
}

export interface ContextDTO {
  id: number;
  name: string;
}

export interface ContextFullDTO {
  id: number;
  name: string;
  pages: Page[];
}
