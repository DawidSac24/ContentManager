import { Page } from "./page.model";

export interface Context {
  id: number;
  name: string;
  icon_id: number;
  deleted: boolean;
}

export interface NewContext {
  name: string;
  icon_id?: number | null;
}

//  TODO : DO I NEED THIS ???
// export interface ContextFull {
//   id: number;
//   name: string;
//   icon_id: number;
//   deleted: boolean;
//   pages: Page[];
// }

export interface ContextDTO {
  id: number;
  name: string;
  icon_id: number;
  deleted: boolean;
}

export interface NewContextDTO {
  name: string;
  icon_id?: number | null;
}

// export interface ContextFullDTO {
//   id: number;
//   name: string;
//   icon_id: number;
//   deleted: boolean;
//   pages: Page[];
// }
