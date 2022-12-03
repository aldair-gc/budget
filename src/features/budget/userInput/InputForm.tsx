/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import axios from "../../../services/axios";
import { TransactionInterface } from "../interfaces";
import { OptionsForm, Option, Buttons } from "./style";

export default function InputForm(props: Props){
  const [type, setType] = useState(props.options.type);
  const [description, setDescription] = useState(props.options.description);
  const [value, setValue] = useState(props.options.value);
  const [status, setStatus] = useState(props.options.status);
  const [year, setYear] = useState(props.options.year);
  const [month, setMonth] = useState(props.options.month);
  const [expiration_day, setExpiration_day] = useState(props.options.expiration_day);
  const [repeat, setRepeat] = useState(props.options.repeat);

  useEffect(() => {
    if (props.userInput > 0) {
      const itemToCopy = props.list[props.list.findIndex(item => item.id === props.userInput)];
      setType([type[0], itemToCopy.type]);
      setDescription([description[0], itemToCopy.description]);
      setValue([value[0], itemToCopy.value]);
      setStatus([status[0], itemToCopy.status]);
      setYear([year[0], itemToCopy.year]);
      setMonth([month[0], itemToCopy.month]);
      setExpiration_day([expiration_day[0], itemToCopy.expiration_day]);
      setRepeat([repeat[0], itemToCopy.repeat]);
      props.setUserInput(0);
    }
  }, [props.userInput, type, status]);


  const cleanAndExit = ():void => {
    props.setUserInput(-1);
    setType([false, "expenditure"]);
    setDescription([false, ""]);
    setValue([false, ""]);
    setStatus([false, "pending"]);
    setYear([false, 0]);
    setMonth([false, 0]);
    setExpiration_day([false, 0]);
    setRepeat([false, ""]);
  };

  async function submitTransaction(): Promise<void> {
    const newTransaction = {
      type: type[1],
      description: description[1],
      value: value[1],
      status: status[1],
      year: year[1],
      month: month[1],
      expiration_day: expiration_day[1],
      repeat: repeat[1],
    };
    try {
      const submit = await axios.post("/transaction/", newTransaction);
      if (submit.status === 200) {
        props.setList(type[1], props.list);
      }
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

      <Option style={{display: type[0] ? "none" : "flex"}}>
        <label>Type:</label>
        <div className="radio">
          <div>
            <input type="radio" name="input-type" id="input-income"
              onChange={(e) => e.target.checked && {type: "income"}}
              defaultChecked={type[1] === "income"} />
            <label htmlFor="input-income">income</label>
          </div>

          <div>
            <input type="radio" name="input-type" id="input-expenditure"
              onChange={(e) => e.target.checked && {type: "expenditure"}}
              defaultChecked={type[1] === "expenditure"} />
            <label htmlFor="input-expenditure">expenditure</label>
          </div>
        </div>
      </Option>

      <Option style={{display: description[0] ? "none" : "flex"}}>
        <label htmlFor="name">Description:</label>
        <input type="text" name="description" id="input-description"
          value={description[1]}
          onChange={(e) => setDescription([description[0], e.target.value])} />
      </Option>

      <Option style={{display: value[0] ? "none" : "flex"}}>
        <label htmlFor="value">Value:</label>
        <input type="text" min={0}
          value={ value[1].toString().replace(",", "").replace(".", ",")}
          onChange={(e) => setValue([value[0], e.target.value.replace(/[^0-9,-]+/g, "").replace(/[,]+/g, ".")])}
        />
      </Option>

      <Option style={{display: expiration_day[0] ? "none" : "flex"}}>
        <label htmlFor="expiration-day">Expiration day:</label>
        <input type="number"
          value={expiration_day[1] || ""} min={0} max={31}
          onChange={(e) => setExpiration_day([expiration_day[0], (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31) ? parseInt(e.target.value) : 0])}
        />
      </Option>

      <Option style={{display: status[0] ? "none" : "flex"}}>
        <label>State:</label>
        <div className="radio">
          <div>
            <input type="radio" name="input-status" id="input-pending"
              onChange={(e) => e.target.checked && {status: "pending"}}
              defaultChecked={status[1] === "pending"} />
            <label htmlFor="input-pending">pending</label>
          </div>

          <div>
            <input type="radio" name="input-status" id="input-done"
              onChange={(e) => e.target.checked && {status: "done"}}
              defaultChecked={status[1] === "done"} />
            <label htmlFor="input-done">done</label>
          </div>
        </div>
      </Option>

      <Option style={{display: year[0] ? "none" : "flex"}}>
        <label htmlFor="year">Year:</label>
        <input type="number" name="year" id="input-year" value={year[1] || ""}
          onChange={(e) => setYear([year[0], parseInt(e.target.value)])} />
      </Option>

      <Option style={{display: month[0] ? "none" : "flex"}}>
        <label htmlFor="month">Month:</label>
        <input type="number" name="month" id="input-month" value={month[1] || ""}
          onChange={(e) => setMonth([month[0], parseInt(e.target.value)])} />
      </Option>

      <Option style={{display: repeat[0] ? "none" : "flex"}}>
        <label htmlFor="repeat">Repeat:</label>
        <input type="number" name="repeat" id="repeat" min={1} max={24} autoComplete="off"
          onChange={(e) => setRepeat([repeat[0], `0-1-${e.target.value || 0}`])}
          value={parseInt(repeat[1].split("-")[2]) || ""} />
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
  list: TransactionInterface[],
  setList: (type: "income" | "expenditure", list: TransactionInterface[]) => void,
  options: {
    type: OptionalType,
    description: OptionalDescription,
    value: OptionalValue,
    status: OptionalStatus,
    year: OptionalYear,
    month: OptionalMonth,
    expiration_day: OptionalExpiration,
    repeat: OptionalRepeat,
  }
}

type OptionalType = [boolean, "expenditure" | "income"];
type OptionalDescription = [boolean, string];
type OptionalValue = [boolean, string];
type OptionalStatus = [boolean, "pending" | "done"];
type OptionalYear = [boolean, number];
type OptionalMonth = [boolean, number];
type OptionalExpiration = [boolean, number];
type OptionalRepeat = [boolean, string];
