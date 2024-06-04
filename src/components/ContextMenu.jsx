import { toast } from "react-toastify";
export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  setExpenses,
  rowId,
}) {
  if (!menuPosition?.left) return;

  const handleDelete = () => {
    setExpenses((prevState) => {
      const itemToDelete = prevState.find((expense) => expense.id == rowId);

      if (itemToDelete) {
        console.log(
          `Deleting item with id: ${rowId}, title: ${itemToDelete.title}`
        );
      }
      toast.error(`Deleting item title: ${itemToDelete.title}`);
      return prevState.filter((expense) => expense.id !== rowId);
    });

    setMenuPosition({});
  };

  return (
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
          console.log("Editing");
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div onClick={handleDelete}>Delete</div>
    </div>
  );
}
