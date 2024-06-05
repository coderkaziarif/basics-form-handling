import { toast } from "react-toastify";
export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  expenses,
  setExpenses,
  rowId,
  setExpense,
  setEditItemId,
}) {
  if (!menuPosition?.left) return;

  //! Delete method=========>
  const handleDelete = () => {
    setExpenses((prevState) => {
      const itemToDelete = prevState.find((expense) => expense.id == rowId);

      if (itemToDelete) {
        console.log(
          `Deleting item with id: ${rowId}, title: ${itemToDelete.title}`
        );
      }
      toast.warning(` ${itemToDelete.title} hasbeen deleted`);
      return prevState.filter((expense) => expense.id !== rowId);
    });

    setMenuPosition({});
  };

  return (
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
          const { title, category, amount } = expenses.find(
            (expense) => expense.id === rowId
          );
          setEditItemId(rowId);
          setExpense({ title, category, amount });
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div onClick={handleDelete}>Delete</div>
    </div>
  );
}
