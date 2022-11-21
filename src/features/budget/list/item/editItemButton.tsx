/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { EditButton, SaveButton } from "./style";
import axios from "../../../../services/axios";
import { Transaction } from "../../interfaces";

export default class EditItemButton extends Component<EditItemButtonInterface> {
  constructor(props: EditItemButtonInterface){
    super(props);
    this.setEditing = this.props.setEditing.bind(this);
    this.setList = this.props.setList.bind(this);
  }

  setList(list: Transaction[]): void {
    this.props.setList(list);
  }

  setEditing(trueOrFalse: boolean): void {
    this.props.setEditing(trueOrFalse);
  }

  changeItem(id: number, trueOrFalse: boolean): void {
    const itemOnApp = document.querySelector(`.item-id-${id}`) as HTMLDivElement;
    const inputs = itemOnApp.querySelectorAll("input[type=text]")as unknown as HTMLInputElement[];
    inputs.forEach(input => input.disabled = !trueOrFalse);
    this.setEditing(trueOrFalse);
  }

  editItem(id: number):void {
    this.changeItem(id, true);
  }

  async saveItem(item: Transaction):Promise<void> {
    try {
      const updatedItem = await axios.put(`/transaction/${item.id}`, { description: item.description, value: item.value, expiration_day: item.expiration_day });
      if (updatedItem.status === 200) {
        const newList = [...this.props.list];
        newList.forEach((item: Transaction) => {
          if (item.id === updatedItem.data.id) {
            item.description = updatedItem.data.description;
            item.value = updatedItem.data.value;
            item.expiration_day = updatedItem.data.expiration_day;
          }
        });
        this.setList(newList);
        item.id && this.changeItem(item.id, false);
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  render() {
    const item = this.props.item;
    return (
      this.props.editing
        ?
        <SaveButton onClick={() => this.saveItem(this.props.item)}>
          <FaSave/>
        </SaveButton>
        :
        <EditButton onClick={() => item.id && this.editItem(item.id)}>
          <FaEdit/>
        </EditButton>
    );
  }
}

interface EditItemButtonInterface {
  item: Transaction,
  editing: boolean,
  setEditing: (trueOrFalse: boolean) => void,
  list: Transaction[],
  setList: (list: Transaction[]) => void,
}
