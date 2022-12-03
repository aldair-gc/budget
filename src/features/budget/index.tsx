/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "../../services/axios";
import { authLogout } from "../authentication/authSlice";
import MainHeader from "./header/header";
import { TransactionInterface } from "./interfaces";
import BudgetList from "./list/list";
import { BudgetContainer, BudgetListsContainer } from "./style";
import Totals from "./totals/totals";
import InputForm from "./userInput/InputForm";
import InputWindow from "./userInput/InputWindow";

export default function Budget() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const [yearMonth, setYearMonth] = useState({year: new Date().getFullYear(), month: new Date().getMonth() + 1});
  const [incomeList, setIncomeList] = useState([] as TransactionInterface[]);
  const [expenditureList, setExpenditureList] = useState([] as TransactionInterface[]);
  const [selection, setSelection] = useState(0);
  const [userInput, setUserInput] = useState(-1); // set -1 to disable, 0 to new empty transaction or id to open filfilled with its data.
  const [showSorter, setShowSorter] = useState("none" as "none" | "income" | "expenditure");

  function setList(type: "income" | "expenditure", list: TransactionInterface[]): void {
    type === "expenditure" && setExpenditureList(list);
    type === "income" && setIncomeList(list);
  }

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const getList = await axios.get(`/transaction/${yearMonth.year}/${yearMonth.month}`);
        if (getList.status === 200) {
          setIncomeList(((getList.data) as TransactionInterface[]).filter(item => item.type === "income"));
          setExpenditureList(((getList.data) as TransactionInterface[]).filter(item => item.type === "expenditure"));
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
          delete axios.defaults.headers.common["Authorization"];
        }
        const errors = error.response?.data?.errors ?? [];
        errors.map((err: any) => console.log(err));
      }
    }
    isLoggedIn ? getData() : dispatch(authLogout());
  }, [yearMonth, isLoggedIn]);

  return (
    <BudgetContainer>
      <MainHeader yearMonth={yearMonth} setYearMonth={setYearMonth}/>

      <InputWindow show={userInput}>
        <InputForm
          userInput={userInput}
          setUserInput={setUserInput}
          list={incomeList.concat(expenditureList)}
          setList={setList}
          options={{
            type: [false, "expenditure"],
            description: [false, ""],
            value: [false, ""],
            status: [false, "pending"],
            year: [false, new Date().getFullYear()],
            month: [false, new Date().getMonth()],
            expiration_day: [false, 0],
            repeat: [false, ""],
          }}
        />
      </InputWindow>

      <BudgetListsContainer>
        <BudgetList
          list={incomeList}
          setList={setIncomeList}
          type={"income"}
          selection={selection}
          setSelection={setSelection}
          setUserInput={setUserInput}
          showSorter={showSorter}
          changeShowSorter={setShowSorter}
        />
        <BudgetList
          list={expenditureList}
          setList={setExpenditureList}
          type={"expenditure"}
          selection={selection}
          setSelection={setSelection}
          setUserInput={setUserInput}
          showSorter={showSorter}
          changeShowSorter={setShowSorter}
        />
      </BudgetListsContainer>

      <Totals lists={{incomeList, expenditureList}} />
    </BudgetContainer>
  );
}
