// saving previous versions of interfaces used in the database

export interface ContextV1 {
  id?: number;
  name: string;
  pages: PageV1[];
}

export interface PageV1 {
  id?: number;
  title: string;
  url: string;
}
