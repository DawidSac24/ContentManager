import { useRef, useState } from "react";

import PagesList from "../PagesList";
import ContextButtons from "../ContextButtons";

import { ContextState } from "../../hooks/useContextState";
import { usePageList } from "../../hooks/usePageList";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { SelectedContextProps } from "../../Props";

function SelectedContext({
  context,
  loadContexts,
  setContextState,
  onOutsideClick,
}: SelectedContextProps) {
  const { pages, loadPages } = usePageList(context.id);

  // For outside click detection
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onOutsideClick);

  const [showPageList, setShowPageList] = useState<boolean>(false);

  return (
    <div
      ref={ref}
      className={`w-48 min-h-32 max-h-60
        flex flex-col items-center justify-between
        bg-neutral-800 text-white rounded-lg
        font-[var(--modernist-bold)]
        overflow-hidden
        transition-all duration-500 ease-in-out
        ${showPageList ? "h-64" : "h-32"}`}
    >
      <div
        className="context !bg-fuchsia-900 cursor-pointer"
        onClick={() => setContextState(ContextState.default)}
      >
        <h3>{context.name}</h3>
      </div>
      <PagesList
        pages={pages}
        showPageList={showPageList}
        setShowPageList={() => setShowPageList(!showPageList)}
        loadPages={loadPages}
      />
      <ContextButtons
        context={context}
        loadContexts={loadContexts}
        loadPages={loadPages}
        setContextState={setContextState}
      />
    </div>
  );
}

export default SelectedContext;
