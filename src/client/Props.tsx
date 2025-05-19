import { ContextDTO } from "../local-server/models/context.model";
import { ContextState } from "./hooks/useContextState";

export type ContextProps = {
  context: ContextDTO;
  setContextState: (state: ContextState) => void;
};

export type Props = {
  context: ContextDTO;
};
