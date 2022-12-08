/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "react";
import { FaEdit, FaExclamationTriangle, FaRegClone, FaRegCopy, FaRegSave, FaRegSquare, FaRegTrashAlt, FaTimes } from "react-icons/fa";
import axios from "../../../services/axios";
import { SimpleTransaction, TransactionInterface } from "../../interfaces";
import { ButtonsContainer } from "./style";

export default class Options extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.setEditing = this.props.setEditing.bind(this);
    this.setDeleting = this.props.setDeleting.bind(this);
    this.setList = this.props.setList.bind(this);
    this.resetItem = this.props.resetItem.bind(this);
    this.setUserInput = this.props.setUserInput.bind(this);
    this.state = { willUpdate: "question"};
  }

  setUserInput(userInput: number): void {
    this.props.setUserInput(userInput);
  }

  setList(list: TransactionInterface[]): void {
    this.props.setList(list);
  }

  setEditing(trueOrFalse: boolean): void {
    this.props.setEditing(trueOrFalse);
  }

  setDeleting(trueOrFalse: boolean): void {
    this.props.setDeleting(trueOrFalse);
  }

  resetItem(): void {
    this.props.resetItem();
  }

  updateComponent() {
    const newList = [...this.props.list];
    newList.forEach((item) => {
      if (item.id === this.props.item.id) {
        item.description = this.props.item.description;
        item.value = this.props.item.value;
        item.expiration_day = this.props.item.expiration_day;
      }
    });
    this.setList(newList);
  }

  updateTransaction = async (id: number): Promise<void> => {
    const fieldsToUpdate = {
      description: this.props.item.description,
      value: parseFloat(this.props.item.value.toString()),
      expiration_day: this.props.item.expiration_day,
    };

    try {
      await axios.put(`/transaction/${id}`, fieldsToUpdate);
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  };

  deleteTransaction = async (id: number):Promise<void> => {
    try {
      const deleteRequest = await axios.delete(`/transaction/${id}`);
      if (deleteRequest.status === 200 && this.props.list.some(item => item.id === id)) {
        const newList = [...this.props.list];
        const deletedItemIndex = newList.findIndex((item) => item.id === id);
        deleteRequest.data.transactionDeleted && newList.splice(deletedItemIndex, 1);
        this.setList(newList);
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  };

  handleFutureTransactions = async (handleFunction: (id: number) => void): Promise<void> => {
    try {
      const relatedTransactions = await axios.get(`/transaction/${this.props.item.id}`);
      if (relatedTransactions.status !== 200) return;

      const updatableTransactions = (relatedTransactions.data as Array<TransactionInterface>).filter(transaction =>
        transaction.year > new Date().getFullYear()
        || (transaction.year === new Date().getFullYear()
        && (transaction.month >= new Date().getMonth() + 1)));

      updatableTransactions.forEach(transaction => transaction.id && handleFunction(transaction.id));

      return;
    } catch(error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  };

  saveChanges(handleFunction: (id: number) => void): void {
    if (this.state.willUpdate === "thisAndFuture") {
      this.handleFutureTransactions(handleFunction);
    } else if (this.state.willUpdate === "onlyThis" || !this.props.hasFutureRepetitions) {
      handleFunction(this.props.item.id);
    }
    this.updateComponent();
    this.resetItem();
  }

  render() {
    if (!this.props.editing && !this.props.deleting) {
      return (
        <ButtonsContainer>
          <button className="edit" onClick={() => this.setEditing(true)}>
            <FaEdit/> Edit
          </button>
          <button className="edit" onClick={() => this.setUserInput(this.props.item.id)}>
            <FaRegCopy/> Copy
          </button>
          <button className="delete" onClick={() => this.setDeleting(true)}>
            <FaRegTrashAlt/> Delete
          </button>
        </ButtonsContainer>
      );
    } else if (this.props.hasFutureRepetitions && this.state.willUpdate === "question") {
      return (
        <ButtonsContainer>
          <button className="only-this" onClick={() => this.setState({willUpdate: "onlyThis"})}>
            <FaRegSquare/> Only this one
          </button>
          <button className="this-and-future" onClick={() => this.setState({willUpdate: "thisAndFuture"})}>
            <FaRegClone/> This and future ones
          </button>
        </ButtonsContainer>
      );
    } else if (this.props.editing) {
      return (
        <ButtonsContainer>
          <button className="save" onClick={() => this.saveChanges(this.updateTransaction)}>
            <FaRegSave/> Save
          </button>
          <button className="cancel" onClick={() => { this.setState({willUpdate: "question"}); this.resetItem(); }}>
            <FaTimes/> Cancel
          </button>
        </ButtonsContainer>
      );
    } else if (this.props.deleting) {
      return (
        <ButtonsContainer>
          <button className="delete" onClick={() => this.saveChanges(this.deleteTransaction)}>
            <FaExclamationTriangle/> Confirm to delete
          </button>
          <button className="cancel" onClick={() => { this.setState({willUpdate: "question"}); this.resetItem(); }}>
            <FaTimes/> Cancel
          </button>
        </ButtonsContainer>
      );
    }
  }
}

interface Props {
  item: SimpleTransaction,
  resetItem: () => void,
  list: TransactionInterface[],
  setList: (list: TransactionInterface[]) => void,
  editing: boolean,
  setEditing: (trueOrFalse: boolean) => void,
  deleting: boolean,
  setDeleting: (trueOrFalse: boolean) => void,
  hasFutureRepetitions: boolean,
  setUserInput: (userInput: number) => void,
}

interface State {
  willUpdate: "question" | "onlyThis" | "thisAndFuture",
}
