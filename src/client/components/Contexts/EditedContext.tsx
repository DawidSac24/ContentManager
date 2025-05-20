import { ContextProps } from "../../Props";
import { useState } from "react";

function ContextEdition({ context }: ContextProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    // Call your function with the input value
    console.log("Saving:", inputValue); // You can replace this with your actual save logic
    yourFunction(inputValue);
  };

  const yourFunction = (value: string) => {
    // Do something with the value
    alert(`Saved: ${value}`);
  };

  return (
    <div className="context-edition-container">
      <input
        type="text"
        className="context-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="save-context" onClick={handleSave}>
        SAVE
      </button>
    </div>
  );
}

export default ContextEdition;
