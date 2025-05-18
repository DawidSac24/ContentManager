import { ContextDTO } from "../../local-server/models/context.model";

type Props = {
  context: ContextDTO;
  isSelected: boolean;
  onSelect: () => void;
};

function Context({ context, isSelected, onSelect }: Props) {
  let buttonClassName: string = "context";
  if (isSelected) {
    buttonClassName += " selected-context";
  }

  return (
    <button className={buttonClassName} onClick={onSelect}>
      <h3>{context.name}</h3>
    </button>
  );
}

export default Context;
