import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({ setExpenses }) {
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});

  //! Form Data validation========>
  const validate = (formData) => {
    const errorsData = {};
    if (!formData.title) {
      errorsData.title = "Title is required";
    }

    if (!formData.category) {
      errorsData.category = "Category is required";
    }

    if (!formData.amount) {
      errorsData.amount = "Amount is required";
    }

    setErrors(errorsData);
    for (const key in errorsData) {
      toast.error(errorsData[key]);
    }
    return errorsData;
  };

  //* Form Data Submition========>
  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);

    if (Object.keys(validateResult).length) return;

    setExpenses((prevState) => [
      ...prevState,
      { id: crypto.randomUUID(), ...expense },
    ]);

    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  //^ OnChange function========>
  const handleChage = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));
    setErrors("");
  };

  //^ Old version of code========>
  //   const getFormData = (form) => {
  //     const formData = new FormData(form);
  //     const data = {};
  //     for (const [key, value] of formData.entries()) {
  //       data[key] = value;
  //     }
  //     return data;
  //   };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      {/* <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={expense.title}
          onChange={handleChage}
        />
        {errors.title && <p className="error">{`${errors.title} !`}</p>}
      </div> */}

      <Input
        id="title"
        label="Title"
        name="title"
        value={expense.title}
        onChange={handleChage}
        error={errors.title}
      />

      {/* <div className="input-container">
        <label htmlFor="category">Category</label>

        <select
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChage}
        >
          <option value="" hidden>
            Select Category
          </option>
          <option value="Grocery">Grocery</option>
          <option value="Clothes">Clothes</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="Medicine">Medicine</option>
        </select>
        {errors.category && <p className="error">{`${errors.category} !`}</p>}
      </div> */}
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChage}
        error={errors.category}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
      />

      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChage}
        error={errors.amount}
      />
      <button className="add-btn">Add</button>

      <ToastContainer theme="colored" />
    </form>
  );
}
