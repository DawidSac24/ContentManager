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
