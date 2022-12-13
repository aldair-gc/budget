/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { LanguageContext, NumberContext } from "../../app/App";
import axios from "../../services/axios";
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
  const [valueOnFocus, setValueOnFocus] = useState(false);

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

  useEffect(() => {
    if (props.userInput === 0) {
      setYear(props.options.year);
      setMonth(props.options.month);
    }
  }, [props.userInput]);


  const cleanAndExit = ():void => {
    props.setUserInput(-1);
    setType([type[0], "expenditure"]);
    setDescription([description[0], ""]);
    setValue([value[0], ""]);
    setStatus([status[0], "pending"]);
    setYear([year[0], 0]);
    setMonth([month[0], 0]);
    setExpiration_day([expiration_day[0], 0]);
    setRepeat([repeat[0], "0-1-1"]);
  };

  async function submitTransaction(): Promise<void> {
    const newTransaction = {
      type: type[1],
      description: description[1],
      value: parseInt(value[1]),
      status: status[1],
      year: year[1],
      month: month[1],
      expiration_day: expiration_day[1],
      repeat: repeat[1],
    };
    try {
      const submit = await axios.post("/transaction/", newTransaction);
      if ((submit.status === 200) && (year[1] === props.yearMonth.year) && (month[1] === props.yearMonth.month)) {
        const newList = [...props.list, submit.data];
        props.setList(type[1], newList);
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
    <LanguageContext.Consumer>
      {({file}) => (
        <OptionsForm onSubmit={(e) => handleSubmit(e)}>

          <Option style={{display: type[0] ? "none" : "flex"}}>
            <label>{file.transaction.type.name}:</label>
            <div className="radio">
              <div>
                <input type="radio" name="input-type" id="input-income"
                  onChange={(e) => e.target.checked && {type: "income"}}
                  defaultChecked={type[1] === "income"} />
                <label htmlFor="input-income">{file.transaction.type.income}</label>
              </div>

              <div>
                <input type="radio" name="input-type" id="input-expenditure"
                  onChange={(e) => e.target.checked && {type: "expenditure"}}
                  defaultChecked={type[1] === "expenditure"} />
                <label htmlFor="input-expenditure">{file.transaction.type.expenditure}</label>
              </div>
            </div>
          </Option>

          <Option style={{display: description[0] ? "none" : "flex"}}>
            <label htmlFor="name">{file.transaction.description}:</label>
            <input type="text" name="description" id="input-description"
              value={description[1]}
              onChange={(e) => setDescription([description[0], e.target.value])} />
          </Option>

          <NumberContext.Consumer>
            {({number}) => (
              <Option style={{display: value[0] ? "none" : "flex"}}>
                <label htmlFor="value">{file.transaction.value}:</label>
                <input type="text" min={0} inputMode="decimal" onFocus={() => setValueOnFocus(true)} onBlur={() => setValueOnFocus(false)}
                  value={ valueOnFocus ? value[1].toString().replace(",", "").replace(".", ",") : number.currency.format(+value[1] || 0)}
                  onChange={(e) => setValue([value[0], e.target.value.replace(/[^0-9,-]+/g, "").replace(/[,]+/g, ".")])}
                />
              </Option>
            )}
          </NumberContext.Consumer>

          <Option style={{display: expiration_day[0] ? "none" : "flex"}}>
            <label htmlFor="expiration-day">{file.transaction.expirationDay}:</label>
            <input type="number" inputMode="numeric"
              value={expiration_day[1] || ""} min={0} max={31}
              onChange={(e) => setExpiration_day([expiration_day[0], (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31) ? parseInt(e.target.value) : 0])}
            />
            <label htmlFor="expiration-day"> </label>
          </Option>

          <Option style={{display: status[0] ? "none" : "flex"}}>
            <label>{file.transaction.status.name}:</label>
            <div className="radio">
              <div>
                <input type="radio" name="input-status" id="input-pending"
                  onChange={(e) => e.target.checked && {status: "pending"}}
                  defaultChecked={status[1] === "pending"} />
                <label htmlFor="input-pending">{file.transaction.status.pending}</label>
              </div>

              <div>
                <input type="radio" name="input-status" id="input-done"
                  onChange={(e) => e.target.checked && {status: "done"}}
                  defaultChecked={status[1] === "done"} />
                <label htmlFor="input-done">{file.transaction.status.done}</label>
              </div>
            </div>
          </Option>

          <Option style={{display: year[0] ? "none" : "flex"}}>
            <label htmlFor="year">{file.transaction.year}:</label>
            <input type="number" name="year" id="input-year" value={year[1] || ""} inputMode="numeric"
              onChange={(e) => setYear([year[0], parseInt(e.target.value)])} />
          </Option>

          <Option style={{display: month[0] ? "none" : "flex"}}>
            <label htmlFor="month">{file.transaction.month}:</label>
            <input type="number" name="month" id="input-month" value={month[1] || ""} inputMode="numeric"
              onChange={(e) => setMonth([month[0], parseInt(e.target.value)])} />
          </Option>

          <Option style={{display: repeat[0] ? "none" : "flex"}}>
            <label htmlFor="repeat">{file.input.repeatFor}:</label>
            <input type="number" name="repeat" id="repeat" min={1} max={24} autoComplete="off" inputMode="numeric"
              onChange={(e) => setRepeat([repeat[0], `0-1-${e.target.value || 0}`])}
              value={parseInt(repeat[1].split("-")[2]) || ""} />
            <label htmlFor="repeat">{file.input.months}</label>
          </Option>

          <Buttons>
            <input type="submit" value={file.input.save} />
            <input type="button" value={file.input.cancel} onClick={cleanAndExit} />
          </Buttons>
        </OptionsForm>
      )}
    </LanguageContext.Consumer>
  ) : <></>;
}

interface Props {
  userInput: number,
  setUserInput: (userInput: number) => void,
  list: TransactionInterface[],
  setList: (type: "income" | "expenditure", list: TransactionInterface[]) => void,
  yearMonth: {year: number, month: number},
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
