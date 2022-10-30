import { FormEvent, useState } from "react";
import BudgetItem from "./budget-item";
import { BudgetList } from "./classes/budget-list";
import "./style.css";

export default function Budget() {
  const [inputText, setInputText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("expenditure");
  const [incomeList, setIncomeList] = useState(new BudgetList("incomes"));
  const [expenditureList, setExpenditureList] = useState(new BudgetList("incomes"));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(inputText, inputValue, inputType);
    (inputType === "expenditure" ? expenditureList : incomeList).addItem({ description: inputText, value: +inputValue, status: "pending" });
  }

  return (
    <div id="budget-container">
      <div className="header-container">Budget</div>
      <div className="month-container">
        <button>JAN</button>
        <button>FEB</button>
        <button>MAR</button>
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
      <div className="budget-lists">
        <div className="budget-list">
          {incomeList.list.map(item => <BudgetItem key={item.description} />)}
        </div>
        <div className="budget-list">
          {expenditureList.list.map(item => <BudgetItem key={item.description} />)}
        </div>
      </div>
      <div className="total-container">Total estimated</div>
    </div>
  );
}
