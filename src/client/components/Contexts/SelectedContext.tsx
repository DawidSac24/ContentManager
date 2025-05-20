import { useRef } from "react";
import { SelectedContextProps } from "../../Props";
import { useDropDown } from "../../hooks/useDropDown";
import { useOutsideClick } from "../../hooks/useOutsideClick";

import DropDown from "../DropDown";

function SelectedContext({
  context,
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
  /**
   * Hide the drop down menu if click occurs
   * outside of the drop-down element.
   *
   * @param event  The mouse event
   */

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onOutsideClick);

  return (
    <div ref={ref} className="context selected-context">
      <button className="context selected-context" onClick={toggleDropDown}>
        <h3>{context.name}</h3>
      </button>
      {showDropDown && (
        <DropDown context={context} setContextState={setContextState} />
      )}
    </div>
  );
}

export default SelectedContext;
