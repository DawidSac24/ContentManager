import { useRef } from "react";
import { useState } from "react";

import { SelectedContextProps } from "../../Props";

import { useOutsideClick } from "../../hooks/useOutsideClick";

import PagesList from "../PagesList";
import ContextButtons from "../ContextButtons";
import { ContextState } from "../../hooks/useContextState";

function SelectedContext({
  context,
  loadContexts,
  setContextState,
  onOutsideClick,
}: SelectedContextProps) {
  // For outside click detection
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onOutsideClick);

  const [showPageList, setShowPageList] = useState<boolean>(false);

  return (
    <div ref={ref} className="selected">
      <div
        className="context !bg-fuchsia-900 cursor-pointer"
        onClick={() => setContextState(ContextState.default)}
      >
        <h3>{context.name}</h3>
      </div>
      <PagesList
        context={context}
        showPageList={showPageList}
        setShowPageList={() => setShowPageList(!showPageList)}
      />
      <ContextButtons
        context={context}
        loadContexts={loadContexts}
        setContextState={setContextState}
      />
    </div>
  );
}

export default SelectedContext;
