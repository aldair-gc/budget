/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { EditButton, SaveButton } from "./style";
import axios from "../../../../services/axios";
import { Transaction } from "../../interfaces";

export default class EditItemButton extends Component<{item: Transaction, editing: boolean, setEditing: (trueOrFalse: boolean) => void}> {
  constructor(props: {item: Transaction, editing: boolean, setEditing: (trueOrFalse: boolean) => void}){
    super(props);
    this.setEditing = this.props.setEditing.bind(this);
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
      const updateRequest = await axios.put(`/transaction/${item.id}`, { description: item.description, value: item.value, expiration_day: item.expiration_day });
      if (updateRequest.status === 200) {
        item.id && this.changeItem(item.id, false);
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  render() {
    const editing = this.props.editing;
    const item = this.props.item;
    return (
      editing
        ?
        <SaveButton onClick={() => this.saveItem(item)}>
          <FaSave/>
        </SaveButton>
        :
        <EditButton onClick={() => item.id && this.editItem(item.id)}>
          <FaEdit/>
        </EditButton>
    );
  }
}
