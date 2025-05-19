import { ContextProps } from "../../Props";

function SelectedContext({ context, setContextState }: ContextProps) {
  return <button className="context selected-context">{context.name}</button>;
}

export default SelectedContext;
