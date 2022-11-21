/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent } from "react";
import { FaTimesCircle } from "react-icons/fa";
import axios from "../../../services/axios";
import { Transaction } from "../interfaces";
import { Header, OptionsForm, Option, PropertiesContainer, Buttons } from "./style";

export default function Properties(props: Props) {
  const closeProperties = ():void => {
    props.setPropItemId(0);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (props.propItemId === 0) return;
    const newTransaction: Transaction = props.values;

    try {
      const sendTransaction = await axios.post("/transaction", newTransaction);
      if (sendTransaction.status === 200) {
        props.setList(props.list.concat([sendTransaction.data]));
        props.setters.setDescription("");
        props.setters.setValue(0);
        props.setters.setExpirationDay(0);
        props.setters.setStatus("pending");
        props.setters.setYear(new Date().getFullYear());
        props.setters.setMonth(new Date().getMonth());
        props.setters.setRepeat("0-1-1");
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }
  return (
    props.propItemId === 0 ? <div/> :
      <PropertiesContainer>
        <Header>
          <h1>Properties</h1>
          <FaTimesCircle onClick={closeProperties}/>
        </Header>

        <OptionsForm onSubmit={(e) => handleSubmit(e)}>

          <Option>
            <label>Type</label>
            <div className="radio">
              <input type="radio" name="prop-type" id="prop-income" onChange={(e) => e.target.checked && props.setters.setType("income")} defaultChecked={props.values.type === "income"} />
              <label htmlFor="prop-income">income</label>

              <input type="radio" name="prop-type" id="prop-expenditure" onChange={(e) => e.target.checked && props.setters.setType("expenditure")} defaultChecked={props.values.type === "expenditure"} />
              <label htmlFor="prop-expenditure">expenditure</label>
            </div>
          </Option>

          <Option>
            <label htmlFor="name">Description</label>
            <input type="text" name="description" id="prop-description" value={props.values.description} onChange={(e) => props.setters.setDescription(e.target.value)} />
          </Option>

          <Option>
            <label htmlFor="value">Value</label>
            <input type="number" name="value" id="prop-value" value={props.values.value} onChange={(e) => props.setters.setValue(parseFloat(e.target.value) || 0)} />
          </Option>

          <Option>
            <label htmlFor="expiration-day">Expiration day</label>
            <input type="number" name="expiration-day" id="prop-expiration-day" value={props.values.expiration_day} onChange={(e) => props.setters.setExpirationDay(parseInt(e.target.value) || 0)} />
          </Option>

          <Option>
            <label htmlFor="month">Month</label>
            <input type="number" name="month" id="prop-month" value={props.values.month} onChange={(e) => props.setters.setMonth(parseInt(e.target.value) || 0)} />
          </Option>

          <Option>
            <label htmlFor="year">Year</label>
            <input type="number" name="year" id="prop-year" value={props.values.year} onChange={(e) => props.setters.setYear(parseInt(e.target.value) || 0)} />
          </Option>

          <Option>
            <label htmlFor="repeat">Repeat</label>
            <input type="text" name="repeat" id="prop-repeat" value={props.values.repeat} onChange={(e) => props.setters.setRepeat(e.target.value)} disabled />
          </Option>

          <Buttons>
            <input type="submit" value="Save" />
            <input type="button" value="Cancel" onClick={closeProperties} />
          </Buttons>
        </OptionsForm>

      </PropertiesContainer>
  );
}

interface Props {
  propItemId: number,
  setPropItemId: (propItemId: number) => void,
  values: Transaction,
  setters: {
    setType: (type: "income" | "expenditure") => void,
    setDescription: (description: string) => void,
    setValue: (value: number) => void,
    setExpirationDay: (expirationDay: number) => void,
    setStatus: (repeat: "done" | "pending") => void,
    setYear: (repeat: number) => void,
    setMonth: (repeat: number) => void,
    setRepeat: (repeat: string) => void,
  },
  list: Transaction[],
  setList: (list: Transaction[]) => void,
}
