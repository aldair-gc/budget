/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "react";
import { FaCheck, FaEdit, FaSave, FaTimes, FaTrashAlt } from "react-icons/fa";
import axios from "../../../../services/axios";
import { Transaction } from "../../interfaces";
import { ButtonsContainer } from "./style";

export default class HiddenButtons extends Component<EditItemButtonInterface> {
  constructor(props: EditItemButtonInterface){
    super(props);
    this.setEditing = this.props.setEditing.bind(this);
    this.setConfirmDeletion = this.props.setConfirmDeletion.bind(this);
    this.setList = this.props.setList.bind(this);
    this.resetItem = this.props.resetItem.bind(this);
  }

  setList(list: Transaction[]): void {
    this.props.setList(list);
  }

  setEditing(trueOrFalse: boolean): void {
    this.props.setEditing(trueOrFalse);
  }

  setConfirmDeletion(trueOrFalse: boolean): void {
    this.props.setConfirmDeletion(trueOrFalse);
  }

  resetItem(): void {
    this.props.resetItem();
  }

  closeEdit():void {
    const itemOnApp = document.querySelector(`.item-id-${this.props.item.id}`) as HTMLDivElement;
    const inputsText = itemOnApp.querySelectorAll("input[type=text]")as unknown as HTMLInputElement[];
    inputsText.forEach(input => input.disabled = true);
    const inputsNumber = itemOnApp.querySelectorAll("input[type=number]")as unknown as HTMLInputElement[];
    inputsNumber.forEach(input => input.disabled = true);
    this.setEditing(false);
    this.resetItem();
  }

  changeItem(id: number, trueOrFalse: boolean): void {
    const itemOnApp = document.querySelector(`.item-id-${id}`) as HTMLDivElement;
    const inputsText = itemOnApp.querySelectorAll("input[type=text]")as unknown as HTMLInputElement[];
    inputsText.forEach(input => input.disabled = !trueOrFalse);
    const inputsNumber = itemOnApp.querySelectorAll("input[type=number]")as unknown as HTMLInputElement[];
    inputsNumber.forEach(input => input.disabled = !trueOrFalse);
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

  async deleteItem():Promise<void> {
    try {
      const deleteRequest = await axios.delete(`/transaction/${this.props.item.id}`);
      if (deleteRequest.status === 200) {
        const newList = [...this.props.list];

        const deletedItemIndex = newList.findIndex((item) => item.id === this.props.item.id);

        deleteRequest.data.transactionDeleted === true && newList.splice(deletedItemIndex, 1);

        this.setList(newList);
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  render() {
    const item = this.props.item;

    return (
      <ButtonsContainer>
        { this.props.editing
          ?
          <button className={"save " + (this.props.editing || this.props.confirmDeletion ? "show-buttons" : "no")} onClick={() => this.saveItem(this.props.item)}>
            <FaSave/>
          </button>
          :
          this.props.confirmDeletion
            ?
            <button className={"delete " + (this.props.editing || this.props.confirmDeletion ? "show-buttons" : "no")} onClick={() => item.id && this.deleteItem()}>
              <FaCheck/>
            </button>
            :
            <button className="edit" onClick={() => item.id && this.editItem(item.id)}>
              <FaEdit/>
            </button>
        }
        { this.props.editing
          ?
          <button className="cancel" onClick={() => this.props.item.id && this.closeEdit()}>
            <FaTimes/>
          </button>
          :
          this.props.confirmDeletion
            ?
            <button className="cancel" onClick={() => this.props.setConfirmDeletion(false)}>
              <FaTimes/>
            </button>
            :
            <button className="delete" onClick={() => this.props.setConfirmDeletion(true)}>
              <FaTrashAlt/>
            </button>
        }
      </ButtonsContainer>
    );
  }
}

interface EditItemButtonInterface {
  item: Transaction,
  resetItem: () => void,
  editing: boolean,
  setEditing: (trueOrFalse: boolean) => void,
  confirmDeletion: boolean,
  setConfirmDeletion: (trueOrFalse: boolean) => void,
  list: Transaction[],
  setList: (list: Transaction[]) => void,
}
