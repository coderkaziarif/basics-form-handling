import "./App.css";
import ContextMenu from "./components/ContextMenu";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./components/expenseData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocalStorage("expense", {
    title: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpenses] = useLocalStorage("expenses", expenseData);
  const [editItemId, setEditItemId] = useLocalStorage("editItemId", "");

  return (
    <main>
      <h1>Track Your Expense</h1>

      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          expense={expense}
          setExpense={setExpense}
          editItemId={editItemId}
          setEditItemId={setEditItemId}
        />
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          setExpense={setExpense}
          setEditItemId={setEditItemId}
        />
        <ContextMenu />
        <ToastContainer theme="colored" />
      </div>
    </main>
  );
}

export default App;
