import { ContextDTO } from "../local-server/models/context.model";
import { PageDTO } from "../local-server/models/page.model";
import { ContextState } from "./hooks/useContextState";

export type Props = {
  context: ContextDTO;
  loadContexts: () => void;
};

export type ContextProps = {
  context: ContextDTO;
  setContextState: (state: ContextState) => void;
};

export type DefaultContextProps = {
  context: ContextDTO;
  selectContext: () => void;
};

export type SelectedContextProps = {
  context: ContextDTO;
  loadContexts: () => void;
  setContextState: (state: ContextState) => void;
  onOutsideClick: () => void;
};

export type EditedContextProps = {
  context: ContextDTO;
  loadContexts: () => void;
  setContextState: (state: ContextState) => void;
  onOutsideClick: () => void;
};

export type ContextButtonsProps = {
  context: ContextDTO;
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
