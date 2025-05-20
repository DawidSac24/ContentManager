import "../../styles/EditedContext.css";

import { useRef } from "react";
import { EditedContextProps } from "../../Props";
import { useState } from "react";
import { ContextState } from "../../hooks/useContextState";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useContextActions } from "../../hooks/useContextActions";

function ContextEdition({
  context,
  isOpened,
  loadContexts,
  setContextState,
  onOutsideClick,
}: EditedContextProps) {
  const [inputValue, setInputValue] = useState("");

  const { editContext } = useContextActions();

  const handleSave = () => {
    try {
      editContext(context, inputValue);
    } catch (error) {
      console.log(error);
      throw error;
    }

    setContextState(ContextState.default);
    loadContexts;
  };

  // SAVE the context after pressing ENTER
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  // For outside click detection
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onOutsideClick);

  let className = "context context-edition-container";
  if (isOpened) className += " opened-context";

  return (
    <div ref={ref} className={className}>
      <input
        type="text"
        className="context-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={context.name}
      />
      <button className="save-context" onClick={handleSave}>
        SAVE
      </button>
    </div>
  );
}

export default ContextEdition;
