export interface Context {
  id: number;
  name: string;
  icon_id: number;
  deleted: boolean;
}

export interface ContextPage {
  context_id: number;
  page_id: number;
}
