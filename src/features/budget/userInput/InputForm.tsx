/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import axios from "../../../services/axios";
import { TransactionInterface } from "../interfaces";
import { OptionsForm, Option, Buttons } from "./style";

export default function InputForm(props: Props){
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("pending");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [expiration_day, setExpiration_day] = useState(0);
  const [repeat, setRepeat] = useState("");

  useEffect(() => {
    if (props.userInput > 0) {
      const lists = props.lists.incomeList.concat(props.lists.expenditureList);
      const itemToCopy = lists[lists.findIndex(item => item.id === props.userInput)];
      setType(itemToCopy.type);
      setDescription(itemToCopy.description);
      setValue(itemToCopy.value);
      setStatus(itemToCopy.status);
      setYear(itemToCopy.year);
      setMonth(itemToCopy.month);
      setExpiration_day(itemToCopy.expiration_day);
      setRepeat(itemToCopy.repeat);
      props.setUserInput(0);
    }
  }, [props.userInput, type, status]);


  const cleanAndExit = ():void => {
    props.setUserInput(-1);
    setType("expenditure");
    setDescription("");
    setValue("");
    setStatus("pending");
    setYear(0);
    setMonth(0);
    setExpiration_day(0);
    setRepeat("");
  };

  async function submitTransaction(): Promise<void> {
    const newTransaction = { type, description, value, status, year, month, expiration_day, repeat };
    try {
      await axios.post("/transaction/", newTransaction);
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    await submitTransaction();
    cleanAndExit();
  }

  return props.userInput === 0 ? (
    <OptionsForm onSubmit={(e) => handleSubmit(e)}>

      <Option>
        <label>Type:</label>
        <div className="radio">
          <div>
            <input type="radio" name="input-type" id="input-income"
              onChange={(e) => e.target.checked && {type: "income"}}
              defaultChecked={type === "income"} />
            <label htmlFor="input-income">income</label>
          </div>

          <div>
            <input type="radio" name="input-type" id="input-expenditure"
              onChange={(e) => e.target.checked && {type: "expenditure"}}
              defaultChecked={type === "expenditure"} />
            <label htmlFor="input-expenditure">expenditure</label>
          </div>
        </div>
      </Option>

      <Option>
        <label htmlFor="name">Description:</label>
        <input type="text" name="description" id="input-description" value={description}
          onChange={(e) => setDescription(e.target.value)} />
      </Option>

      <Option>
        <label htmlFor="value">Value:</label>
        <input type="text" min={0}
          value={ value.toString().replace(",", "").replace(".", ",")}
          onChange={(e) => setValue(e.target.value.replace(/[^0-9,-]+/g, "").replace(/[,]+/g, "."))}
        />
      </Option>

      <Option>
        <label htmlFor="expiration-day">Expiration day:</label>
        <input type="number"
          value={expiration_day || ""} min={0} max={31}
          onChange={(e) => setExpiration_day((parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31) ? parseInt(e.target.value) : 0)}
        />
      </Option>

      <Option>
        <label>State:</label>
        <div className="radio">
          <div>
            <input type="radio" name="input-status" id="input-pending"
              onChange={(e) => e.target.checked && {status: "pending"}}
              defaultChecked={status === "pending"} />
            <label htmlFor="input-pending">pending</label>
          </div>

          <div>
            <input type="radio" name="input-status" id="input-done"
              onChange={(e) => e.target.checked && {status: "done"}}
              defaultChecked={status === "done"} />
            <label htmlFor="input-done">done</label>
          </div>
        </div>
      </Option>

      <Option>
        <label htmlFor="year">Year:</label>
        <input type="number" name="year" id="input-year" value={year || ""}
          onChange={(e) => setYear(parseInt(e.target.value))} />
      </Option>

      <Option>
        <label htmlFor="month">Month:</label>
        <input type="number" name="month" id="input-month" value={month || ""}
          onChange={(e) => setMonth(parseInt(e.target.value))} />
      </Option>

      <Option>
        <label htmlFor="repeat">Repeat:</label>
        <input type="number" name="repeat" id="repeat" min={1} max={24} autoComplete="off"
          onChange={(e) => setRepeat(`0-1-${e.target.value || 0}`)}
          value={parseInt(repeat.split("-")[2]) || ""} />
      </Option>

      <Buttons>
        <input type="submit" value="Save" />
        <input type="button" value="Cancel" onClick={cleanAndExit} />
      </Buttons>
    </OptionsForm>
  ) : <></>;
}

interface Props {
  userInput: number,
  setUserInput: (userInput: number) => void,
  lists: {incomeList: TransactionInterface[], expenditureList: TransactionInterface[]},
  setLists: {setIncomeList: (list: TransactionInterface[]) => void, setExpenditureList: (list: TransactionInterface[]) => void},
}
