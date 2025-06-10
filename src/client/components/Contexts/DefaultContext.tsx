import { DefaultContextProps } from "../../Props";

function DefaultContext({ context, selectContext }: DefaultContextProps) {
  return (
    <button className="context cursor-pointer" onClick={selectContext}>
      <h3>{context.name}</h3>
    </button>
  );
}

export default DefaultContext;
