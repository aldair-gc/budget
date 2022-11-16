import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEdit, FaEraser } from "react-icons/fa";
import axios from "../../services/axios";
import { Transaction } from "./interfaces";
import "./style.css";

export default function Budget() {
  const [yearMonth, setYearMonth] = useState({year: new Date().getFullYear(), month: new Date().getMonth() + 1});
  const [list, setList] = useState([{}]);
  const [inputText, setInputText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("expenditure");
  const [expirationDay, setExpirationDay] = useState(0);
  const [status, setStatus] = useState("pending");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [repeat, setRepeat] = useState("0-1-1");

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const getList = await axios.get(`/transaction/${yearMonth.year}/${yearMonth.month}`);
        if (getList.status === 200) {
          setList(getList.data);
        }
      } catch (error: any) {
        const errors = error.response.data.errors ?? [];
        errors.map((err: any) => console.log(err));
      }
    }
    getData();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const newTransaction: Transaction = {
      type: inputType,
      description: inputText,
      value: inputValue,
      expiration_day: expirationDay,
      status,
      year,
      month,
      repeat,
    };
    try {
      const sendTransaction = await axios.post("/transaction", newTransaction);
      if (sendTransaction.status === 200)
        setList(list.concat([sendTransaction.data]));
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
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
    <div>
      <div className="header-container">Budget</div>

      <div className="month-container">
        <button>JAN</button>
      </div>

      <div className="input-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="text">Description</label>
          <input type="text" name="text" id="text" onChange={(e) => setInputText(e.target.value)} value={inputText} />

          <label htmlFor="value">Value</label>
          <input type="text" name="value" id="value" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />

          <label htmlFor="income">+</label>
          <input type="radio" name="type" id="income" onChange={(e) => e.target.checked && setInputType("income")} defaultChecked={inputType === "income"} />

          <label htmlFor="expenditure">-</label>
          <input type="radio" name="type" id="expenditure" onChange={(e) => e.target.checked && setInputType("expenditure")} defaultChecked={inputType === "expenditure"} />

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
