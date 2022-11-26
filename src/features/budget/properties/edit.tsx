/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent } from "react";
import { FaTimesCircle } from "react-icons/fa";
import axios from "../../../services/axios";
import { Transaction } from "../interfaces";
import { Header, OptionsForm, Option, PropertiesContainer, Buttons } from "./style";

export default function Edit(props: Props) {
  const closeProperties = ():void => {
    props.setters.setDescription("");
    props.setters.setValue(0);
    props.setters.setExpirationDay(0);
    props.setters.setStatus("pending");
    props.setters.setRepeat("0-1-1");
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (props.propItemId === 0) return;

    const numberOfRepeatitions = parseInt(props.values.repeat.split("-")[2]);
    const allExpectedRepetitions = [];
    const allConfirmedRepetitions = [];

    if (props.editRepetitions) {
      for (let i = 1; i <= numberOfRepeatitions; i++) {
        const tempTransaction = props.values;
        tempTransaction.repeat = `${props.propItemId}-${i}-${numberOfRepeatitions}`;
        allExpectedRepetitions.push(tempTransaction);
      }
      // confirm all expected repetitions to confirmed repetitions list
    }

    try {
      const selectedItem = await axios.put(`/transaction/${props.propItemId}`, props.values);
      if (selectedItem.status === 200) {
        const newList = [...props.list];
        newList.forEach((item) => {
          if (item.id === props.propItemId) {
            item.type = selectedItem.data.type;
            item.description = selectedItem.data.description;
            item.value = selectedItem.data.value;
            item.expiration_day = selectedItem.data.expiration_day;
            item.repeat = selectedItem.data.repeat;
          }
        });
        props.setList(newList);
        closeProperties();
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
          <h1>Edit transaction {props.propItemId}</h1>
          <FaTimesCircle onClick={closeProperties}/>
        </Header>

        <OptionsForm onSubmit={(e) => handleSubmit(e)}>
          <Option>
            <label htmlFor="name">Description</label>
            <input type="text" name="description" id="prop-description" value={props.values.description}
              onChange={(e) => props.setters.setDescription(e.target.value)} />
          </Option>

          <Option>
            <label htmlFor="value">Value</label>
            <input type="number" name="value" id="prop-value" value={props.values.value || ""}
              onChange={(e) => props.setters.setValue(parseFloat(e.target.value) || 0)} />
          </Option>

          <Option>
            <label htmlFor="expiration-day">Expiration day</label>
            <input type="number" name="expiration-day" id="prop-expiration-day" min={1} max={31} value={props.values.expiration_day}
              onChange={(e) => props.setters.setExpirationDay(parseInt(e.target.value || "") || 0)} />
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
  editRepetitions: boolean,
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
