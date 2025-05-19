import { Props } from "../../Props";

function DefaultContext({ context }: Props) {
  return (
    <button className="context">
      <h3>{context.name}</h3>
    </button>
  );
}

export default DefaultContext;
