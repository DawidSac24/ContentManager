import { useRef } from "react";
import { SelectedContextProps } from "../../Props";
import { useDropDown } from "../../hooks/useDropDown";
import { useOutsideClick } from "../../hooks/useOutsideClick";

import DropDown from "../DropDown";

function SelectedContext({
  context,
  loadContexts,
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

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onOutsideClick);

  return (
    <div ref={ref} className="context selected-context">
      <button className="context selected-context" onClick={toggleDropDown}>
        <h3>{context.name}</h3>
      </button>
      {showDropDown && (
        <DropDown
          context={context}
          loadContexts={loadContexts}
          setContextState={setContextState}
        />
      )}
    </div>
  );
}

export default SelectedContext;
