/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionInterface } from "../interfaces";
import { ItemList, ListBackground, ListContainer } from "./style";
import Transaction from "./item/item";
import { Component } from "react";

export default class BudgetList extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.setList = this.props.setList.bind(this);
  }

  setList(list: TransactionInterface[]): void {
    this.props.setList(list);
  }

  totalEstimated(type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return this.props.list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? item.value : 0, 0);
  }

  percentageDone(type: "income" | "expenditure"):number {
    return Math.floor((this.totalEstimated(type, "done") * 100) / this.totalEstimated(type, "all"));
  }

  render() {
    return (
      <ListContainer className="budget-list-container">
        <ItemList>
          {this.props.list.map(item =>
            <Transaction
              key={item.id}
              item={item}
              selection={this.props.selection}
              setSelection={this.props.setSelection}
              list={this.props.list}
              setList={this.setList}
            />
          )}
        </ItemList>

        <ListBackground
          style={{ height: `${this.percentageDone(this.props.type)}%`, background: this.props.type === "income" ? "#bfc" : "#fbc" }}
        />
      </ListContainer>
    );
  }
}

interface Props {
  list: TransactionInterface[],
  setList: (list: TransactionInterface[]) => void,
  type: "income" | "expenditure",
  selection: number,
  setSelection: (id: number) => void,
}
