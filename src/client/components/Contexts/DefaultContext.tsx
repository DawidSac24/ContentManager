import { DefaultContextProps } from "../../Props";

function DefaultContext({
  context,
  loadContexts,
  selectContext,
}: DefaultContextProps) {
  return (
    <button className="context" onClick={selectContext}>
      <h3>{context.name}</h3>
    </button>
  );
}

export default DefaultContext;
