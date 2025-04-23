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

export interface ContextPage {
  context_id: number;
  page_id: number;
}

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
