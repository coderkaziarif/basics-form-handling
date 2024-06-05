import { useState } from "react";
import { toast } from "react-toastify";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  setExpenses,
  expense,
  setExpense,
  editItemId,
  setEditItemId,
}) {
  // const [expense, setExpense] = useState({
  //   title: "",
  //   category: "",
  //   amount: "",
  // });
  const [errors, setErrors] = useState({});

  //! Form Data validation========>
  const validationConfig = {
    title: [
      { required: true, msg: "Title is required" },
      { minLength: 3, msg: "Title more than 3 characters long" },
    ],
    category: [{ required: true, msg: "Select a category option" }],
    amount: [{ required: true, msg: "Ammount is required" }],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].forEach((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.msg;
        }

        if (rule.minLength && value.length < 3) {
          errorsData[key] = rule.msg;
        }
      });
    });

    // if (!formData.title) {
    //   errorsData.title = "Title is required";
    // }

    // if (!formData.category) {
    //   errorsData.category = "Category is required";
    // }

    // if (!formData.amount) {
    //   errorsData.amount = "Amount is required";
    // }

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

    if (editItemId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editItemId) {
            return { ...expense, id: editItemId };
          }
          return prevExpense;
        })
      );

      toast.success(` ${expense.title} updated = ৳ ${expense.amount} `);

      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      setEditItemId("");
      return;
    }
    toast.success(` ${expense.title} new added = ৳ ${expense.amount} `);
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
        type="text"
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChage}
        error={errors.category}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOptions="Select Category"
      />

      <Input
        type="number"
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChage}
        error={errors.amount}
      />
      <button className="add-btn">{editItemId ? "Save" : "Add"}</button>
    </form>
  );
}
