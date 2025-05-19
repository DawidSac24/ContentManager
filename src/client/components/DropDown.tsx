import "../styles/DropDown.css";

type Props = {
  setSelectedContextId: (id: number | undefined) => void;
  setIsEditing: (state: boolean) => void;
};

function DropDown({ setIsEditing }: Props) {
  const enableEdition = () => {
    setIsEditing(true);
  };

  return (
    <ul className="drop-down">
      <li>
        <button className="button" onClick={enableEdition}>
          EDIT
        </button>
      </li>
      <li>
        <button className="button">OPEN</button>
      </li>
      <li>
        <button className="button">SAVE</button>
      </li>
      <li>
        <button className="button">DELETE</button>
      </li>
    </ul>
  );
}

export default DropDown;
