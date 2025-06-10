type Props = {
  onAdd: () => void;
};

function AddContext({ onAdd }: Props) {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-16
     flex justify-center item-center"
    >
      <div className="context !bg-fuchsia-900" onClick={onAdd}>
        <h3>Add Context</h3>
      </div>
    </div>
  );
}

export default AddContext;
