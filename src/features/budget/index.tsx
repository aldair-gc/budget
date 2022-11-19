/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import MainHeader from "./header/header";
import Input from "./input/input";
import { Transaction } from "./interfaces";
import BudgetList from "./list/list";
import DateSelector from "./monthList/dateSelector";
import { BudgetContainer, BudgetListsContainer } from "./style";
import "./style.css";

export default function Budget() {
  const [yearMonth, setYearMonth] = useState({year: new Date().getFullYear(), month: new Date().getMonth() + 1});
  const [list, setList] = useState([] as Transaction[]);
  const [type, setType] = useState("expenditure" as "expenditure" | "income");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [expirationDay, setExpirationDay] = useState(0 as number);
  const [status, setStatus] = useState("pending" as "pending" | "done");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [repeat, setRepeat] = useState("0-1-1");

  const values: Transaction = { type, description, value, expiration_day: expirationDay, status, year, month, repeat };
  const setters = { setType, setDescription, setValue, setExpirationDay, setStatus, setYear, setMonth, setRepeat };

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
  }, [yearMonth]);

  function totalEstimated(type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? item.value : 0, 0);
  }

  function totalStyle(type: "income" | "expenditure") {
    return { width: ((totalEstimated(type, "done") * 100) / totalEstimated(type, "all")) + "%" };
  }

  return (
    <BudgetContainer>
      <MainHeader yearMonth={yearMonth}/>

      <DateSelector yearMonth={yearMonth} setYearMonth={setYearMonth} />

      <Input values={values} setters={setters} list={list} setList={setList}/>

      <BudgetListsContainer>
        <BudgetList list={list} setList={setList} type={"income"} />
        <BudgetList list={list} setList={setList} type={"expenditure"} />
      </BudgetListsContainer>

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
    </BudgetContainer>
  );
}
