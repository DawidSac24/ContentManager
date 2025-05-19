import { useRef } from "react";
import { SelectedContextProps } from "../../Props";
import { useDropDown } from "../../hooks/useDropDown";
import useOutsideClick from "../../hooks/useOutsideClick";

function SelectedContext({
  context,
  unselectContext,
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
        {context.name}
      </button>
    </div>
  );
}

export default SelectedContext;
