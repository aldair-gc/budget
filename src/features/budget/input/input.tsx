/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent } from "react";
import { FaPlus, FaSort, FaSortAlphaDown, FaSortAlphaDownAlt, FaSortNumericDown, FaSortNumericDownAlt } from "react-icons/fa";
import axios from "../../../services/axios";
import { TransactionInterface } from "../interfaces";
import { InputForm, InputHideable, InputTitles, SortContainer, SortOption } from "./style";

export default function Input(props: Props) {
  document.addEventListener("click", (event): void => {
    const incomeSorter = (document.querySelector("#income-sorter") as HTMLElement).style;
    const expenditureSorter = (document.querySelector("#expenditure-sorter") as HTMLElement).style;
    if ((event.target as HTMLElement).id === "income-sorter-icon" && incomeSorter.display === "none") {
      incomeSorter.display = "flex";
      expenditureSorter.display = "none";
    } else if ((event.target as HTMLElement).id === "expenditure-sorter-icon" && expenditureSorter.display === "none") {
      incomeSorter.display = "none";
      expenditureSorter.display = "flex";
    } else {
      incomeSorter.display = "none";
      expenditureSorter.display = "none";
    }
    event.stopImmediatePropagation();
  });

  const showInput = (show: boolean) => {
    (document.querySelector("#input-hideable") as HTMLDivElement).style.height = show ? "100px" : "0";
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const newTransaction = props.values;
    if (newTransaction.description === "") return;
    try {
      const sendTransaction = await axios.post("/transaction", newTransaction);
      if (sendTransaction.status === 200) {
        props.values.type === "income"
          ? props.setLists.setIncomeList(props.lists.incomeList.concat([sendTransaction.data]))
          : props.setLists.setExpenditureList(props.lists.expenditureList.concat([sendTransaction.data]));
        props.setters.setDescription("");
        props.setters.setValue(0);
        props.setters.setExpirationDay(0);
        props.setters.setRepeat("0-1-1");
        showInput(false);
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  const sortIncomeList = props.setSortLists.setSortIncomeList;
  const sortExpenditureList = props.setSortLists.setSortExpenditureList;

  function Sorter(id: string, sorterFunction: SorterFunction) {
    return (
      <SortContainer id={id}>
        <SortOption onClick={() => sorterFunction("none")}><FaSort/>Created at</SortOption>
        <SortOption onClick={() => sorterFunction("description-A")}><FaSortAlphaDown/>Description</SortOption>
        <SortOption onClick={() => sorterFunction("description-Z")}><FaSortAlphaDownAlt/>Description</SortOption>
        <SortOption onClick={() => sorterFunction("value-1")}><FaSortNumericDown/>Value</SortOption>
        <SortOption onClick={() => sorterFunction("value-9")}><FaSortNumericDownAlt/>Value</SortOption>
        <SortOption onClick={() => sorterFunction("expiration_day-1")}><FaSortNumericDown/>Expiration day</SortOption>
        <SortOption onClick={() => sorterFunction("expiration_day-9")}><FaSortNumericDownAlt/>Expiration day</SortOption>
      </SortContainer>
    );
  }

  return(
    <div>
      <InputForm onSubmit={(e) => handleSubmit(e)}>
        <InputTitles>
          <div className="list-title" id="income-title">
            <label onClick={() => showInput(true)} htmlFor="income">
              <FaPlus/>
              <input className="hidden" type="radio" name="type" id="income"
                onChange={(e) => e.target.checked && props.setters.setType("income")}
                defaultChecked={props.values.type === "income"} />
            </label>
            <h2>Incomes</h2>
            <div className="sorter-icon-container"><i id="income-sorter-icon"></i><FaSort/></div>
            {Sorter("income-sorter", sortIncomeList)}
          </div>
          <div className="list-title" id="expenditure-title">
            <label onClick={() => showInput(true)} htmlFor="expenditure">
              <FaPlus/>
              <input className="hidden" type="radio" name="type" id="expenditure"
                onChange={(e) => e.target.checked && props.setters.setType("expenditure")}
                defaultChecked={props.values.type === "expenditure"} />
            </label>
            <h2>Expenditures</h2>
            <div className="sorter-icon-container"><i id="expenditure-sorter-icon"></i><FaSort/></div>
            {Sorter("expenditure-sorter", sortExpenditureList)}
          </div>
        </InputTitles>

        <InputHideable id="input-hideable" style={{background: props.values.type === "income" ? "#beb" : "#ebb"}}>
          <div className="inputs">
            <div className="input-column">
              <div className="input">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" autoComplete="off"
                  onChange={(e) => props.setters.setDescription(e.target.value)}
                  value={props.values.description} />
              </div>

              <div className="input">
                <label htmlFor="value">Value:</label>
                <input type="number" name="value" id="value" autoComplete="off" step={"0.01"} min={0}
                  onChange={(e) => props.setters.setValue(parseFloat(e.target.value) || 0)}
                  value={props.values.value || ""} />
              </div>
            </div>

            <div className="input-column">
              <div className="input">
                <label htmlFor="expiration-day">Expiration day:</label>
                <input type="number" name="expiration-day" id="expiration-day" min={0} max={31} autoComplete="off"
                  onChange={(e) => props.setters.setExpirationDay(parseInt(e.target.value) || 0)}
                  value={props.values.expiration_day || ""} />
              </div>

              <div className="input">
                <label htmlFor="repeat">Repeat:</label>
                <input type="number" name="repeat" id="repeat" min={1} max={24} autoComplete="off"
                  onChange={(e) => props.setters.setRepeat(`0-1-${e.target.value || 0}`)}
                  value={parseInt(props.values.repeat.split("-")[2]) || ""} />
              </div>
            </div>
          </div>

          <div className="buttons">
            <input type="submit" value="add" />
            <input type="button" value="cancel" onClick={() => showInput(false)} />
          </div>
        </InputHideable>
      </InputForm>
    </div>
  );
}

interface Props {
  values: TransactionInterface,
  setters: {
    setType: (type: "income" | "expenditure") => void,
    setDescription: (description: string) => void,
    setValue: (value: number) => void,
    setExpirationDay: (expirationDay: number) => void,
    setRepeat: (repeat: string) => void,
  },
  lists: {incomeList: TransactionInterface[], expenditureList: TransactionInterface[]},
  setLists: {setIncomeList: (list: TransactionInterface[]) => void, setExpenditureList: (list: TransactionInterface[]) => void},
  setSortLists: {
    setSortIncomeList: SorterFunction,
    setSortExpenditureList: SorterFunction,
  },
}

type SorterFunction = (sortIncomeList: "none" | "description-A" | "value-1" | "expiration_day-1" | "description-Z" | "value-9" | "expiration_day-9") => void;
