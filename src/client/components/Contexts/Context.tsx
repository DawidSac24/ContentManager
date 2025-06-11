import SelectedContext from "../Contexts/SelectedContext";
import DefaultContext from "./DefaultContext";
import EditedContext from "./EditedContext";

import { useContextState, ContextState } from "../../hooks/useContextState";
import { Props } from "../../Props";

function Context({ context, loadContexts }: Props) {
  const { contextState, setContextState } = useContextState();

  const setContextClass = () => {
    let contextClass = "w-48 transition-all duration-500 ease-in-out";

    switch (contextState) {
      case ContextState.selection:
        contextClass += " min-h-32 max-h-80";
        break;
      default:
        contextClass += " h-12";
    }
    return contextClass;
  };

  const generateContext = () => {
    switch (contextState) {
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
            selectContext={() => setContextState(ContextState.selection)}
          />
        );
    }
  };

  return <div className={setContextClass()}>{generateContext()}</div>;
}

export default Context;
