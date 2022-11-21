/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transaction } from "../interfaces";
import { ItemList, ListBackground, ListContainer } from "./style";
import axios from "../../../services/axios";
import BudgetItem from "./item/item";
import { Component } from "react";

export default class BudgetList extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.setList = this.props.setList.bind(this);
  }

  setList(list: Transaction[]): void {
    this.props.setList(list);
  }

  toggleStatus = (id: number) => {
    try {
      const newList = [...this.props.list];
      newList.map(async (item) => {
        if (item.id === id) {
          item.status = item.status === "pending" ? "done" : "pending";
          const update = await axios.put(`/transaction/${item.id.toString()}`, { status: item.status });
          if (update.status !== 200) {
            item.status = item.status === "pending" ? "done" : "pending";
            console.log("Error updating database");
          }
        }
      });
      this.setList(newList);
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  };

  totalEstimated(type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return this.props.list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? item.value : 0, 0);
  }

  percentageDone(type: "income" | "expenditure"):number {
    return Math.floor((this.totalEstimated(type, "done") * 100) / this.totalEstimated(type, "all"));
  }

  render() {
    return (
      <ListContainer>
        <ItemList>
          {this.props.list.map(item =>item.type === this.props.type &&
            <BudgetItem key={item.id} item={item} toggleStatus={this.toggleStatus } list={this.props.list} setList={this.setList} />
          )}
        </ItemList>

        <ListBackground style={{ height: `${this.percentageDone(this.props.type)}%`, background: this.props.type === "income" ? "#bfc" : "#fbc" }} />
      </ListContainer>
    );
  }
}

interface Props {
  list: Transaction[],
  setList: (list: Transaction[]) => void,
  type: "income" | "expenditure",
}
