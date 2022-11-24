/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import MainHeader from "./header/header";
import Input from "./input/input";
import { Transaction } from "./interfaces";
import BudgetList from "./list/list";
import Properties from "./properties/properties";
import RightClickMenu from "./rightClickMenu/rightClickMenu";
import { BudgetContainer, BudgetListsContainer } from "./style";
import { Estimated } from "./totals/style";
import TotalsContainer from "./totals/totals";

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
  const [propItemId, setPropItemId] = useState(0);

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

  function totalPercent(type: "income" | "expenditure") {
    return { width: ((totalEstimated(type, "done") * 100) / totalEstimated(type, "all")) + "%" };
  }

  function result():number {
    return totalEstimated("income", "all") - totalEstimated("expenditure", "all");
  }

  function openProperties(id: number): void {
    if (list.findIndex(item => item.id === id ) !== -1) {
      const item = list[list.findIndex(item => item.id === id )];
      setPropItemId(id);
      setType(item.type);
      setDescription(item.description);
      setValue(item.value);
      setExpirationDay(item.expiration_day);
      setStatus(item.status);
      setMonth(item.month);
      setYear(item.year);
      setRepeat(item.repeat);
    }
  }

  return (
    <BudgetContainer>
      <MainHeader yearMonth={yearMonth} setYearMonth={setYearMonth}/>

      {/* <DateSelector yearMonth={yearMonth} setYearMonth={setYearMonth} /> */}

      <Input values={values} setters={setters} list={list} setList={setList}/>

      <BudgetListsContainer>
        <BudgetList list={list} setList={setList} type={"income"} />
        <BudgetList list={list} setList={setList} type={"expenditure"} />
      </BudgetListsContainer>

      <TotalsContainer totalEstimated={totalEstimated} totalPercent={totalPercent} />

      <Estimated>
        <h3>Month Total Estimation</h3><h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>{`$ ${result().toFixed(2)}`}</h2>
      </Estimated>

      <RightClickMenu openProperties={openProperties}/>
      <Properties propItemId={propItemId} setPropItemId={setPropItemId} values={values} setters={setters} list={list} setList={setList}/>
    </BudgetContainer>
  );
}
