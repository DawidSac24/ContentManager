import { useRef } from "react";
import { EditedContextProps } from "../../Props";
import { useState } from "react";
import { ContextState } from "../../hooks/useContextState";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useContextActions } from "../../hooks/useContextActions";

function ContextEdition({
  context,
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
    loadContexts();
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

  return (
    <div ref={ref} className="context-tail !justify-evenly">
      <input
        type="text"
        className="h-[30px] w-[115px]
        text-center
        bg-neutral-800 rounded-lg"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={context.name}
      />
      <div
        className="h-[30px] w-[50px]
      flex items-center justify-center rounded-lg
      bg-fuchsia-900"
        onClick={handleSave}
      >
        SAVE
      </div>
    </div>
  );
}

export default ContextEdition;
