import { Context } from "../local-server/models/context.model";
import { PageDTO } from "../local-server/models/page.model";
import { ContextState } from "./hooks/useContextState";

export type Props = {
  context: Context;
  loadContexts: () => void;
};

export type ContextProps = {
  context: Context;
  setContextState: (state: ContextState) => void;
};

export type DefaultContextProps = {
  context: Context;
  selectContext: () => void;
};

export type SelectedContextProps = {
  context: Context;
  loadContexts: () => void;
  setContextState: (state: ContextState) => void;
  onOutsideClick: () => void;
};

export type EditedContextProps = {
  context: Context;
  loadContexts: () => void;
  setContextState: (state: ContextState) => void;
  onOutsideClick: () => void;
};

export type ContextButtonsProps = {
  context: Context;
  loadContexts: () => void;
  loadPages: () => void;
  setContextState: (state: ContextState) => void;
};

export type PageListProps = {
  pages: PageDTO[];
  showPageList: boolean;
  setShowPageList: () => void;
  loadPages: () => void;
};
