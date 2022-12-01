/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent } from "react";
import axios from "../../../services/axios";
import { TransactionInterface } from "../interfaces";
import { InputForm } from "./style";

export default function Input(props: Props) {
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
        props.setters.setValue("");
        props.setters.setExpirationDay(0);
        props.setters.setRepeat("0-1-1");
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  return(
    <div>
      <InputForm onSubmit={(e) => handleSubmit(e)}>
        <div className="list-title" id="income-title">
          <label onClick={} htmlFor="income">
            <input className="hidden" type="radio" name="type" id="income"
              onChange={(e) => e.target.checked && props.setters.setType("income")}
              defaultChecked={props.values.type === "income"} />
          </label>
          <h2>Incomes</h2>
        </div>
        <div className="list-title" id="expenditure-title">
          <label onClick={} htmlFor="expenditure">
            <input className="hidden" type="radio" name="type" id="expenditure"
              onChange={(e) => e.target.checked && props.setters.setType("expenditure")}
              defaultChecked={props.values.type === "expenditure"} />
          </label>
          <h2>Expenditures</h2>
        </div>

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
                onChange={(e) => props.setters.setValue(e.target.value)}
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
          <input type="button" value="cancel" onClick={} />
        </div>
      </InputForm>
    </div>
  );
}

interface Props {
  values: TransactionInterface,
  setters: {
    setType: (type: "income" | "expenditure") => void,
    setDescription: (description: string) => void,
    setValue: (value: string) => void,
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
