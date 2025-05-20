import { ContextDTO } from "../local-server/models/context.model";
import { ContextState } from "./hooks/useContextState";

export type Props = {
  context: ContextDTO;
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
  setContextState: (state: ContextState) => void;
  onOutsideClick: () => void;
};

export type DropDownPros = {
  context: ContextDTO;
  setContextState: (state: ContextState) => void;
};
