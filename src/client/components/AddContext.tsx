type Props = {
  onAdd: () => void;
};

function AddContext({ onAdd }: Props) {
  return (
    <div
      className="fixed bottom-0 w-screen h-[18%]
     flex justify-center item-center"
    >
      <button className="context-tail !bg-fuchsia-900" onClick={onAdd}>
        <h3>Add Context</h3>
      </button>
    </div>
  );
}

export default AddContext;
