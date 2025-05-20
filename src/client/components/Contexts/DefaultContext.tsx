import { DefaultContextProps } from "../../Props";

function DefaultContext({
  context,
  isOpened,
  selectContext,
}: DefaultContextProps) {
  let className = "context";
  if (isOpened) className += " opened-context";

  return (
    <button className={className} onClick={selectContext}>
      <h3>{context.name}</h3>
    </button>
  );
}

export default DefaultContext;
