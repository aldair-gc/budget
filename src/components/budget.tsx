import { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";
import fileData from "./bd-test.json";
import { FaEdit, FaEraser } from "react-icons/fa";

export default function Budget() {
  const [list, setList] = useState(fileData);
  const [inputText, setInputText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("expenditure");

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setList(list.concat([{ id: new Date().getTime(), type: inputType, description: inputText, value: +inputValue, status: "pending" }])
    );
  }

  const toggleButton = (e: ChangeEvent) => {
    const newList = [...list];
    newList.map((item) => {
      if (item.id.toString() === e.target.id) {
        item.status = item.status === "pending" ? "done" : "pending";
      }
    });
    setList(newList);
  };

  function totalEstimated(type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? item.value : 0, 0);
  }

  function totalStyle(type: "income" | "expenditure") {
    return { width: ((totalEstimated(type, "done") * 100) / totalEstimated(type, "all")) + "%" };
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

      <div className="budget-month">
        <div className="budget-list income-list">
          <h2>Incomes</h2>
          {list.map(item =>item.type === "income" &&
              <li key={item.id} className={"budget-item item-status-" + item.status}>
                <input type="checkbox" id={item.id.toString()} onChange={toggleButton} checked={item.status === "done"} />
                <div className="description">{item.description}</div>
                <div className="value">{item.value}</div>
                <FaEdit className="edit-item-btn"/>
                <FaEraser className="delete-item-btn"/>
              </li>
          )}
        </div>

        <div className="budget-list expenditure-list">
          <h2>Expenditures</h2>
          {list.map(item => item.type === "expenditure" &&
              <li key={item.id} className={"budget-item item-status-" + item.status}>
                <input type="checkbox" id={item.id.toString()} onChange={toggleButton} checked={item.status === "done"} />
                <div className="description">{item.description}</div>
                <div className="value">{item.value}</div>
                <FaEdit className="edit-item-btn"/>
                <FaEraser className="delete-item-btn"/>
              </li>
          )}
        </div>
      </div>

      <div className="total-container">
        <div>
          <div className="total-numbers">
            <p>{totalEstimated("income", "done")} / {totalEstimated("income", "all")}</p>
            <p>{Math.floor((totalEstimated("income", "done") * 100) / totalEstimated("income", "all")) + "%"}</p>
          </div>
          <div className="total-graph" style={totalStyle("income")} />
        </div>
        <div>
          <div className="total-numbers">
            <p>{totalEstimated("expenditure", "done")} / {totalEstimated("expenditure", "all")}</p>
            <p>{Math.floor((totalEstimated("expenditure", "done") * 100) / totalEstimated("expenditure", "all")) + "%"}</p>
          </div>
          <div className="total-graph" style={totalStyle("expenditure")} />
        </div>
      </div>
      <div className="total-estimated-container">
        <h3>Total Estimated</h3><p>{totalEstimated("income", "all") - totalEstimated("expenditure", "all")}</p>
      </div>
    </div>
  );
}
