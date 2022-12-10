/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "react";
import { TransactionInterface } from "../../interfaces";
import { TransactionContainer, ItemBackground, ItemContainer } from "./style";
import Options from "./options";
import { FaCaretDown } from "react-icons/fa";
import axios from "../../../services/axios";
import { brl } from "../../currency";

export default class Transaction extends Component<Props, BudgetItemState> {
  constructor(props: Props){
    super(props);
    this.setList = this.props.setList.bind(this);
    this.setSelection = this.props.setSelection.bind(this);
    this.state = {
      description: props.item.description,
      value: props.item.value,
      expiration_day: props.item.expiration_day,
      editing: false,
      deleting: false,
      hasFutureRepetitions: parseInt(this.props.item.repeat.split("-")[1]) < parseInt(this.props.item.repeat.split("-")[2]),
    };
  }

  setSelection(selection: number): void {
    this.props.setSelection(selection);
  }

  setList(list: TransactionInterface[]): void {
    this.props.setList(list);
  }

  toggleStatus(id: number) {
    try {
      const newList = [...this.props.list];
      newList.map(async (item) => {
        if (item.id === id) {
          item.status = item.status === "pending" ? "done" : "pending";
          const update = await axios.put(`/transaction/${item.id}`, { status: item.status });
          if (update.status !== 200) {
            item.status = item.status === "pending" ? "done" : "pending";
          }
        }
      });
      this.setList(newList);
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  checkMonth(): "past" | "present" | "future" {
    const realMonth = new Date().getFullYear() + ((new Date().getMonth() + 1) / 100);
    const selectedMonth = this.props.item.year + (this.props.item.month / 100);
    if (selectedMonth === realMonth) return "present";
    if (selectedMonth > realMonth) return "future";
    return "past";
  }

  highlight(): string {
    const exp = this.props.item.expiration_day;
    const today = new Date().getDate();
    if (this.checkMonth() === "future") return "";
    if (this.checkMonth() === "past") return "danger";
    if (this.props.item.status !== "pending") return "";
    if (exp === 0) return "";
    if (exp <= today + 1) return "danger";
    if ((exp > today) && (exp <= (today + 5))) return "warning";
    return "";
  }

  render() {
    const id = this.props.item.id ? this.props.item.id : 0;
    const description = this.state.description;
    const value = this.state.value;
    const expiration_day = this.state.expiration_day;
    const editing = this.state.editing;
    const deleting = this.state.deleting;
    const hasFutureRepetitions = this.state.hasFutureRepetitions;
    const selection = this.props.selection;
    const setEditing = (editing: boolean) => this.setState({editing});
    const setDeleting = (deleting: boolean,) => this.setState({deleting});
    const setSelection = (selection: number) => this.setSelection(selection === this.props.selection ? 0 : selection );

    const resetItem = (): void => {
      this.setState({ description: this.props.item.description });
      this.setState({ value: this.props.item.value });
      this.setState({ expiration_day: this.props.item.expiration_day });
      setEditing(false);
      setDeleting(false);
      setSelection(0);
    };

    const listTotal = ():number => {
      const total = this.props.list.reduce((sum, thisItem) => thisItem.type === this.props.item.type ? sum += +thisItem.value : sum += 0, 0);
      return Math.round((100 / total) * +value);
    };

    return (
      <ItemContainer selected={this.props.selection === id} style={{ opacity: this.props.loading ? 0 : 1 }}>
        <TransactionContainer
          highlight={this.highlight()}
          className={`budget-item item-id-${id} item-status-${this.props.item.status}`}>
          <input type="checkbox" id={id?.toString()} onChange={() => id && this.toggleStatus(id)} checked={this.props.item.status === "done"} />

          <input type="text" className={`description ${editing}`}
            value={description}
            onChange={(e) => this.setState({ description: e.target.value })}
            disabled={!(editing && selection === id)}
          />

          <input type="text" className={`value ${editing}`} min={0} inputMode="decimal"
            value={ editing ? value.toString().replace(",", "").replace(".", ",") : brl.format(+value)}
            onChange={(e) => this.setState({ value: e.target.value.replace(/[^0-9,-]+/g, "").replace(/[,]+/g, ".") })}
            disabled={!(editing && selection === id)}
          />

          <input type="number"
            className={`expiration_day ${editing}`}
            value={expiration_day || ""} min={0} max={31} inputMode="numeric"
            onChange={(e) => this.setState({ expiration_day: (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31) ? parseInt(e.target.value) : 0 })}
            disabled={!(editing && selection === id)}
          />

          <FaCaretDown
            className="item-opt-access"
            style={ selection === id ? { transform: "rotate(0.5turn"} : {}}
            onClick={() => {setEditing(false); setDeleting(false); resetItem(); setSelection(id); }}
          />

          <ItemBackground type={this.props.item.type} width={selection === id ? 0 : listTotal()}
            className={`item-bg ${editing}`}/>
        </TransactionContainer>

        <Options
          list={this.props.list}
          setList={this.setList}
          item={{id, description, value, expiration_day }}
          resetItem={resetItem}
          editing={editing}
          setEditing={setEditing}
          hasFutureRepetitions={hasFutureRepetitions}
          deleting={deleting}
          setDeleting={setDeleting}
          setUserInput={this.props.setUserInput}
        />
      </ItemContainer>
    );
  }
}

interface Props {
  item: TransactionInterface,
  list: TransactionInterface[],
  setList: (list: TransactionInterface[]) => void,
  selection: number,
  setSelection: (selection: number) => void,
  setUserInput: (selection: number) => void,
  loading: boolean,
}

interface BudgetItemState {
  description: string,
  value: string,
  expiration_day: number,
  editing: boolean,
  deleting: boolean,
  hasFutureRepetitions: boolean,
}
