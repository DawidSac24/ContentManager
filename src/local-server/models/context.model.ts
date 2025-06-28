import { NewPage } from "./page.model";

export interface NewContext {
  name: string;
}

export interface Context extends NewContext {
  id: number;
}

export interface MergingContextWithPages {
  context: NewContext;
  pages: NewPage[];
}
