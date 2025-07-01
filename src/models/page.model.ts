export interface NewPage {
  title: string;
  url: string;
}

export interface Page extends NewPage {
  id: number;
}

export interface PageDTO extends NewPage {
  id: number;
}
