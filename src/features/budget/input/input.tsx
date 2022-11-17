/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent } from "react";
import { FaPlusCircle } from "react-icons/fa";
import axios from "../../../services/axios";
import { Transaction } from "../interfaces";
import { InputForm, InputHideable, InputTitles } from "./style";

export default function Input(props: Props) {
  const hideable = (document.querySelector("#input-hideable") as HTMLDivElement);

  const closeInput = () => {
    hideable.style.height = "0px";
  };

  const showInput = () => {
    hideable.style.height = "210px";
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const newTransaction: Transaction = props.values;
    try {
      const sendTransaction = await axios.post("/transaction", newTransaction);
      if (sendTransaction.status === 200) {
        props.setList(props.list.concat([sendTransaction.data]));
        props.setters.setDescription("");
        props.setters.setValue(0);
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
        <InputTitles onClick={showInput}>
          <label className="title" id="income-title" htmlFor="income"><h2>Incomes</h2><FaPlusCircle className="input-icon"/>
            <input className="hidden" type="radio" name="type" id="income" onChange={(e) => e.target.checked && props.setters.setType("income")} defaultChecked={props.values.type === "income"} />
          </label>

          <label className="title" id="expenditure-title" htmlFor="expenditure"><h2>Expenditures</h2><FaPlusCircle className="input-icon"/>
            <input className="hidden" type="radio" name="type" id="expenditure" onChange={(e) => e.target.checked && props.setters.setType("expenditure")} defaultChecked={props.values.type === "expenditure"} />
          </label>
        </InputTitles>

        <InputHideable id="input-hideable" style={{background: props.values.type === "income" ? "#beb" : "#ebb"}}>
          <div className="input">
            <label htmlFor="text">Description:</label>
            <input type="text" name="text" id="text" onChange={(e) => props.setters.setDescription(e.target.value)} value={props.values.description} />
          </div>

          <div className="input">
            <label htmlFor="value">Value:</label>
            <input type="text" name="value" id="value" onChange={(e) => props.setters.setValue(parseFloat(e.target.value) || 0)} value={props.values.value} />
          </div>

          <div className="input">
            <label htmlFor="expiration-day">Expiration day:</label>
            <input type="number" name="expiration-day" id="expiration-day" onChange={(e) => props.setters.setExpirationDay(parseInt(e.target.value) || 0)} value={props.values.expiration_day} />
          </div>

          <div className="input">
            <label htmlFor="repeat">Repeat:</label>
            <input type="number" name="repeat" id="repeat" onChange={(e) => props.setters.setRepeat(`0-1-${e.target.value}`)} value={parseInt(props.values.repeat.split("-")[3]) ?? 0} />
          </div>

          <div>
            <input type="submit" value="add" />
            <input type="button" value="cancel" onClick={closeInput} />
          </div>
        </InputHideable>
      </InputForm>
    </div>
  );
}

interface Props {
  values: Transaction,
  setters: {
    setType: (type: "income" | "expenditure") => void,
    setDescription: (description: string) => void,
    setValue: (value: number) => void,
    setExpirationDay: (expirationDay: number) => void,
    setRepeat: (repeat: string) => void,
  },
  list: Transaction[],
  setList: (list: Transaction[]) => void,
}
