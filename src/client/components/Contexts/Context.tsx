import SelectedContext from "../Contexts/SelectedContext";
import DefaultContext from "./DefaultContext";
import EditedContext from "./EditedContext";

import { useContextState, ContextState } from "../../hooks/useContextState";
import { Props } from "../../Props";

function Context({ context }: Props) {
  const { contextState, setContextState } = useContextState();

  const generateContext = () => {
    switch (contextState) {
      case ContextState.default:
        return <DefaultContext context={context} />;

      case ContextState.selection:
        return (
          <SelectedContext
            context={context}
            setContextState={setContextState}
          />
        );

      case ContextState.edition:
        return (
          <EditedContext context={context} setContextState={setContextState} />
        );

      default:
        return (
          <EditedContext context={context} setContextState={setContextState} />
        );
    }
  };

  return generateContext();
}

export default Context;
