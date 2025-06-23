import { Page } from "./page.model";

export interface Context {
  id?: number;
  name: string;
  pages: number;
}

export interface NewContext {
  name: string;
}

export interface ContextDTO {
  id?: number;
  name: string;
  pages: number;
}

export interface NewContextDTO {
  name: string;
}

export interface ContextFullDTO {
  id?: number;
  name: string;
  pages: Page[];
}
