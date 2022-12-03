/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "../../services/axios";
import { authLogout } from "../authentication/authSlice";
import MainHeader from "./header/header";
import Input from "./list/title/ListTitle";
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

  const [sortIncomeList, setSortIncomeList] = useState("none" as SorterValues);
  const [sortExpenditureList, setSortExpenditureList] = useState("none" as SorterValues);

  const [type, setType] = useState("expenditure" as "income" | "expenditure");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [expirationDay, setExpirationDay] = useState(0);
  const [status, setStatus] = useState("pending" as "pending" | "done");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [repeat, setRepeat] = useState("0-1-1");

  const [selection, setSelection] = useState(0);

  const [userInput, setUserInput] = useState(-1); // set -1 to disable, 0 to new empty transaction or id to open filfilled with its data.

  const values: TransactionInterface = { type, description, value, expiration_day: expirationDay, status, year, month, repeat };
  const setters = { setType, setDescription, setValue, setExpirationDay, setStatus, setYear, setMonth, setRepeat };

  const sortedIncomeList = sortList([...incomeList], sortIncomeList);
  const sortedExpenditureList = sortList([...expenditureList], sortExpenditureList);

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

  function sortList(list: TransactionInterface[], type: string) {
    switch (type) {
    case "none": return list;
    case "expiration_day-1": return list.sort((a,b) => a.expiration_day - b.expiration_day);
    case "value-1": return list.sort((a,b) => +a.value - +b.value);
    case "description-A": return list.sort((a,b) => {
      if (a.description < b.description) return -1;
      if (a.description > b.description) return 1;
      return 0;
    });
    case "expiration_day-9": return list.sort((a,b) => b.expiration_day - a.expiration_day);
    case "value-9": return list.sort((a,b) => +b.value - +a.value);
    case "description-Z": return list.sort((a,b) => {
      if (b.description < a.description) return -1;
      if (b.description > a.description) return 1;
      return 0;
    });
    default: return list;
    }
  }

  return (
    <BudgetContainer>
      <MainHeader yearMonth={yearMonth} setYearMonth={setYearMonth}/>

      <Input
        values={values}
        setters={setters}
        lists={{incomeList, expenditureList}}
        setLists={{setIncomeList, setExpenditureList}}
        setSortLists={{setSortIncomeList, setSortExpenditureList}}
      />

      <InputWindow show={userInput}>
        <InputForm
          userInput={userInput}
          setUserInput={setUserInput}
          lists={{incomeList, expenditureList}}
          setLists={{setIncomeList, setExpenditureList}}
        />
      </InputWindow>

      <BudgetListsContainer>
        <BudgetList
          list={sortIncomeList === "none" ? incomeList : sortedIncomeList}
          setList={setIncomeList}
          type={"income"}
          selection={selection}
          setSelection={setSelection}
          setUserInput={setUserInput}
        />
        <BudgetList
          list={sortExpenditureList === "none" ? expenditureList : sortedExpenditureList}
          setList={setExpenditureList}
          type={"expenditure"}
          selection={selection}
          setSelection={setSelection}
          setUserInput={setUserInput}
        />
      </BudgetListsContainer>

      <Totals lists={{incomeList, expenditureList}} />
    </BudgetContainer>
  );
}

type SorterValues = "none" | "description-A" | "value-1" | "expiration_day-1" | "description-Z" | "value-9" | "expiration_day-9";
