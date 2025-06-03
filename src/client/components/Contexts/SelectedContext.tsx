import "../../styles/SelectedContext.css";

import { useRef } from "react";
import { SelectedContextProps } from "../../Props";

import { useOutsideClick } from "../../hooks/useOutsideClick";

import PagesList from "../PagesList";
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

  const contextContainerClass = "context selected-context";

  return (
    <div ref={ref} className={contextContainerClass}>
      <div className="selected-context-button">
        <h3>{context.name}</h3>
      </div>
      <PagesList />
      <ContextButtons
        context={context}
        loadContexts={loadContexts}
        setContextState={setContextState}
      />
    </div>
  );
}

export default SelectedContext;
