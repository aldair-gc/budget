/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "react";
import { FaEraser, FaWindowClose } from "react-icons/fa";
import { CancelButton, DeleteButton } from "./style";
import axios from "../../../../services/axios";
import { Transaction } from "../../interfaces";

export default class DeleteItemButton extends Component<DeleteItemButtonInterface> {
  constructor(props: DeleteItemButtonInterface){
    super(props);
    this.setEditing = this.props.setEditing.bind(this);
    this.resetItem = this.props.resetItem.bind(this);
    this.setList = this.props.setList.bind(this);
  }

  setList(list: Transaction[]):void {
    this.props.setList(list);
  }

  setEditing(trueOrFalse: boolean): void {
    this.props.setEditing(trueOrFalse);
  }

  resetItem(): void {
    this.props.resetItem();
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

  closeEdit():void {
    const itemOnApp = document.querySelector(`.item-id-${this.props.item.id}`) as HTMLDivElement;
    const inputs = itemOnApp.querySelectorAll("input[type=text]")as unknown as HTMLInputElement[];
    inputs.forEach(input => input.disabled = true);
    this.setEditing(false);
    this.resetItem();
  }

  render() {
    const editing = this.props.editing;

    return (
      editing
        ?
        <CancelButton onClick={() => this.props.item.id && this.closeEdit()}>
          <FaWindowClose/>
        </CancelButton>
        :
        <DeleteButton onClick={() => this.props.item.id && this.deleteItem()}>
          <FaEraser/>
        </DeleteButton>
    );
  }
}

interface DeleteItemButtonInterface {
  item: Transaction,
  editing: boolean,
  setEditing: (trueOrFalse: boolean) => void, resetItem: () => void,
  list: Transaction[],
  setList: (list: Transaction[]) => void,
}
