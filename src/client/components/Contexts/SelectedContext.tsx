import { useRef } from "react";
import { SelectedContextProps } from "../../Props";

import { useOutsideClick } from "../../hooks/useOutsideClick";

import ContextButtons from "../ContextButtons";

function SelectedContext({
  context,
  loadContexts,
  setContextState,
  onOutsideClick,
}: SelectedContextProps) {
  // For outside click detection
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onOutsideClick);

  let contextContainerClass = "context selected-context";

  return (
    <div ref={ref} className={contextContainerClass}>
      <div className="selected-context-button">
        <h3>{context.name}</h3>
      </div>
      SHOW CONTEXT LIST
      <ContextButtons
        context={context}
        loadContexts={loadContexts}
        setContextState={setContextState}
      />
    </div>
  );
}

export default SelectedContext;
