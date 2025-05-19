import DropDown from "./DropDown";

import { ContextDTO } from "../../local-server/models/context.model";

type Props = {
  context: ContextDTO;
  isSelected: boolean;
  setSelectedContextId: (id: number | undefined) => void;
  unselectContext: () => void;
  setIsEditing: (state: boolean) => void;
};

function Context({
  context,
  isSelected,
  setSelectedContextId,
  unselectContext,
  setIsEditing,
}: Props) {
  /**
   * Toggle the drop down menu
   */
  const toggleDropDown = () => {
    if (isSelected) {
      setSelectedContextId(undefined);
    } else {
      setSelectedContextId(context.id);
    }
  };

  /**
   * Hide the drop down menu if click occurs
   * outside of the drop-down element.
   *
   * @param event  The mouse event
   */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      unselectContext;
    }
  };

  let buttonClassName: string = "context";
  if (isSelected) {
    buttonClassName += " selected-context";
  }

  return (
    <button
      className={buttonClassName}
      onClick={toggleDropDown}
      onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
        dismissHandler(e)
      }
    >
      <div className="title-container">
        <h3>{context.name}</h3>
      </div>
    </button>
  );
}

export default Context;
