import { FormEvent, useState } from "react";
import BudgetMonth from "./budget-month";
import "./style.css";

export default function Budget() {
  const [inputText, setInputText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("expenditure");
  const [budgetDate, setBudgetDate] = useState({year: new Date().getFullYear(), month: new Date().getMonth()});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(inputText, inputValue, inputType);
    // (inputType === "expenditure" ? expenditureList : incomeList).addItem({ description: inputText, value: +inputValue, status: "pending" });
  }

  return (
    <div id="budget-container">
      <div className="header-container">Budget</div>
      <div className="month-container">
        <button>JAN</button>
      </div>
      <div className="input-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="text">Description</label>
          <input type="text" name="text" id="text" onChange={(e) => setInputText(e.target.value)}/>

          <label htmlFor="value">Value</label>
          <input type="text" name="value" id="value" onChange={(e) => setInputValue(e.target.value)} />

          <label htmlFor="income">+</label>
          <input type="radio" name="type" id="income" onChange={(e) => e.target.checked && setInputType("income")} />

          <label htmlFor="expenditure">-</label>
          <input type="radio" name="type" id="expenditure" defaultChecked onChange={(e) => e.target.checked && setInputType("expenditure")} />

          <input type="submit" value="add" />
        </form>
      </div>
      <BudgetMonth year={budgetDate.year} month={budgetDate.month} />
      <div className="total-container">Total estimated</div>
    </div>
  );
}
