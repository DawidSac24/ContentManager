import SelectedContext from "../Contexts/SelectedContext";
import DefaultContext from "./DefaultContext";
import EditedContext from "./EditedContext";

import { useContextState, ContextState } from "../../hooks/useContextState";
import { Props } from "../../Props";

function Context({ context, loadContexts }: Props) {
  const { contextState, setContextState } = useContextState();

  const generateContext = () => {
    switch (contextState) {
      case ContextState.default:
        return (
          <DefaultContext
            context={context}
            loadContexts={loadContexts}
            selectContext={() => setContextState(ContextState.selection)}
          />
        );

      case ContextState.selection:
        return (
          <SelectedContext
            context={context}
            loadContexts={loadContexts}
            setContextState={setContextState}
            onOutsideClick={() => setContextState(ContextState.default)}
          />
        );

      case ContextState.edition:
        return (
          <EditedContext
            context={context}
            loadContexts={loadContexts}
            setContextState={setContextState}
            onOutsideClick={() => setContextState(ContextState.default)}
          />
        );

      default:
        return (
          <DefaultContext
            context={context}
            loadContexts={loadContexts}
            selectContext={() => setContextState(ContextState.selection)}
          />
        );
    }
  };

  return generateContext();
}

export default Context;
