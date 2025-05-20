import { useRef } from "react";
import { SelectedContextProps } from "../../Props";

import { useDropDown } from "../../hooks/useDropDown";
import { useOutsideClick } from "../../hooks/useOutsideClick";

import DropDown from "../DropDown";

function SelectedContext({
  context,
  isOpened,
  loadContexts,
  openContext,
  setContextState,
  onOutsideClick,
}: SelectedContextProps) {
  const { showDropDown, setShowDropDown } = useDropDown();

  /**
   * Toggle the drop down menu
   */
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  // For outside click detection
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onOutsideClick);

  let className = "context selected-context";
  if (isOpened) className += " opened-context";

  return (
    <div ref={ref} className={className}>
      <button className="selected-context-button" onClick={toggleDropDown}>
        <h3>{context.name}</h3>
      </button>
      {showDropDown && (
        <DropDown
          context={context}
          loadContexts={loadContexts}
          setContextState={setContextState}
          openContext={openContext}
        />
      )}
    </div>
  );
}

export default SelectedContext;
