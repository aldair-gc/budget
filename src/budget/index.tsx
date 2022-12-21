/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from "../services/axios";
import { authLogout } from "../features/authentication/authSlice";
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
  const [selection, setSelection] = useState(0); // which transaction is selected
  const [userInput, setUserInput] = useState(-1); // set -1 to disable, 0 to new empty transaction or id to open fulfilled with its data.
  const [showSorter, setShowSorter] = useState("none" as "none" | "income" | "expenditure");
  const [balance, setBalance] = useState({loading: true, value: 0} as {loading: boolean, value: number});
  const [loading, setLoading] = useState(false);

  function setList(type: "income" | "expenditure", list: TransactionInterface[]): void {
    type === "expenditure" && setExpenditureList(list);
    type === "income" && setIncomeList(list);
  }

  function updateBalance(data: { type: string; total: any; }[][]) {
    let previousIncomes = 0;
    let previousExpenditures = 0;
    data.forEach(month => {
      month && month.forEach((list: { type: string; total: any; }) => previousIncomes += list.type === "income" ? list.total : 0);
      month && month.forEach((list: { type: string; total: any; }) => previousExpenditures += list.type === "expenditure" ? list.total : 0);
    });

    setBalance({loading: false, value: previousIncomes - previousExpenditures});
  }

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        setLoading(true);
        setBalance({loading: true, value: 0});

        const getList = await axios.get(`/transaction/${yearMonth.year}/${yearMonth.month}`);
        if (getList.status === 200) {
          setIncomeList(((getList.data) as TransactionInterface[]).filter(item => item.type === "income"));
          setExpenditureList(((getList.data) as TransactionInterface[]).filter(item => item.type === "expenditure"));
          setLoading(false);
        }

        const requesSumMonthTotalsBackTo = await axios.get(`/transaction/sum-until/${yearMonth.year}/${yearMonth.month}`);
        if (requesSumMonthTotalsBackTo.status === 200) {
          updateBalance(requesSumMonthTotalsBackTo.data);
        }

      } catch (error: any) {
        setLoading(false);
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
          yearMonth={yearMonth}
          options={{
            type: [false, "expenditure"],
            description: [false, ""],
            value: [false, ""],
            status: [false, "pending"],
            year: [false, yearMonth.year],
            month: [false, yearMonth.month],
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
          yearMonth={yearMonth}
          selection={selection}
          setSelection={setSelection}
          setUserInput={setUserInput}
          showSorter={showSorter}
          changeShowSorter={setShowSorter}
          loading={loading}
        />
        <BudgetList
          list={expenditureList}
          setList={setExpenditureList}
          type={"expenditure"}
          yearMonth={yearMonth}
          selection={selection}
          setSelection={setSelection}
          setUserInput={setUserInput}
          showSorter={showSorter}
          changeShowSorter={setShowSorter}
          loading={loading}
        />
      </BudgetListsContainer>

      <Totals
        incomeList={incomeList}
        expenditureList={expenditureList}
        lastMonthBalance={balance}
      />
    </BudgetContainer>
  );
}
