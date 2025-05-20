import SelectedContext from "../Contexts/SelectedContext";
import DefaultContext from "./DefaultContext";
import EditedContext from "./EditedContext";

import { useContextState, ContextState } from "../../hooks/useContextState";
import { Props } from "../../Props";

function Context({ context, isOpened, loadContexts, openContext }: Props) {
  const { contextState, setContextState } = useContextState();

  const generateContext = () => {
    switch (contextState) {
      case ContextState.selection:
        return (
          <SelectedContext
            context={context}
            isOpened={isOpened}
            loadContexts={loadContexts}
            openContext={openContext}
            setContextState={setContextState}
            onOutsideClick={() => setContextState(ContextState.default)}
          />
        );

      case ContextState.edition:
        return (
          <EditedContext
            context={context}
            isOpened={isOpened}
            loadContexts={loadContexts}
            setContextState={setContextState}
            onOutsideClick={() => setContextState(ContextState.default)}
          />
        );

      default:
        return (
          <DefaultContext
            context={context}
            isOpened={isOpened}
            selectContext={() => setContextState(ContextState.selection)}
          />
        );
    }
  };

  return generateContext();
}

export default Context;
