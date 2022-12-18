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
  const [balanceList, setBalanceList] = useState([] as {year: number, month: number, value: number}[]);
  const [loading, setLoading] = useState(false);
  const [prevYear, setPrevYear] = useState(previousDate(yearMonth).year);
  const [prevMonth, setPrevMonth] = useState(previousDate(yearMonth).month);

  function setList(type: "income" | "expenditure", list: TransactionInterface[]): void {
    type === "expenditure" && setExpenditureList(list);
    type === "income" && setIncomeList(list);
  }

  function previousDate(date: {year: number, month: number}) {
    const previousYear = date.month === 1 ? date.year - 1 : date.year;
    const previousMonth = date.month === 1 ? 12 : date.month - 1;
    return {year: previousYear, month: previousMonth};
  }

  function isInBalanceList(year: number, month: number): number {
    return balanceList.findIndex(balance => balance.year === year && balance.month === month);
  }

  function lastMonthBalance(): number {
    const beforePrevDate = previousDate({year: prevYear, month: prevMonth});
    const lastMonth = balanceList.find(item => item.year === prevYear && item.month === prevMonth)?.value;
    const beforeLastMonth = balanceList.find(item => item.year === beforePrevDate.year && item.month === beforePrevDate.month)?.value;
    return (lastMonth || 0) + (beforeLastMonth || 0);
  }

  function updateBalanceList(item: {year: number, month: number, value: number}) {
    const newBalanceList = [...balanceList];
    if (isInBalanceList(item.year, item.month) !== -1) {
      newBalanceList.map(x => {
        if (x.year === item.year && x.month === item.month) x.value = item.value;
      });
    } else {
      newBalanceList.push(item);
    }
    setBalanceList(newBalanceList);
    console.log(newBalanceList);
  }

  // save a new field in the db with the virtual balance of the real balance according to previous months


  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        setLoading(true);
        setPrevYear(previousDate(yearMonth).year);
        setPrevMonth(previousDate(yearMonth).month);

        const getList = await axios.get(`/transaction/${yearMonth.year}/${yearMonth.month}`);

        if (getList.status === 200) {
          setIncomeList(((getList.data) as TransactionInterface[]).filter(item => item.type === "income"));
          setExpenditureList(((getList.data) as TransactionInterface[]).filter(item => item.type === "expenditure"));
          setLoading(false);
        }
        const requestList = await axios.get(`/transaction/${prevYear}/${prevMonth}`);

        if (requestList.status === 200) {
          const lastMonthList = requestList.data as TransactionInterface[];
          const incomeDone = lastMonthList.reduce((sum, item) => sum += (item.type === "income") ? +item.value : 0, 0);
          const expenditureDone = lastMonthList.reduce((sum, item) => sum += (item.type === "expenditure") ? +item.value : 0, 0);
          updateBalanceList({year: prevYear, month: prevMonth, value: incomeDone - expenditureDone});
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
          lastMonthBalance={lastMonthBalance()}
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
          lastMonthBalance={lastMonthBalance()}
          loading={loading}
        />
      </BudgetListsContainer>

      <Totals
        incomeList={incomeList}
        expenditureList={expenditureList}
        lastMonthBalance={lastMonthBalance()}
      />
    </BudgetContainer>
  );
}
