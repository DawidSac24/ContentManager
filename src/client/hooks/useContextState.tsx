import { useState } from "react";

export enum ContextState {
  default,
  edition,
  selection,
}

export function useContextState() {
  const [contextState, setContextState] = useState<ContextState>(
    ContextState.default
  );

  return { contextState, setContextState };
}
