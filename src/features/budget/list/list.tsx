/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionInterface } from "../interfaces";
import { ItemList, ListBackground, ListContainer } from "./style";
import Transaction from "./transaction/Transaction";
import { Component } from "react";
import ListHeader from "./header/ListHeader";

export default class BudgetList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeSorter = this.changeSorter.bind(this);
    this.state = {
      sorter: "none",
    };
  }

  changeSorter(sorter: SorterType): void {
    this.setState({sorter: sorter});
  }

  sorter(list: TransactionInterface[], type: string) {
    switch (type) {
    case "none": return list;
    case "expiration_day-1": return list.sort((a,b) => a.expiration_day - b.expiration_day);
    case "value-1": return list.sort((a,b) => +a.value - +b.value);
    case "description-A": return list.sort((a,b) => {
      if (a.description < b.description) return -1;
      if (a.description > b.description) return 1;
      return 0;
    });
    case "expiration_day-9": return list.sort((a,b) => b.expiration_day - a.expiration_day);
    case "value-9": return list.sort((a,b) => +b.value - +a.value);
    case "description-Z": return list.sort((a,b) => {
      if (b.description < a.description) return -1;
      if (b.description > a.description) return 1;
      return 0;
    });
    default: return list;
    }
  }

  totalEstimated(type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return this.props.list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? +item.value : 0, 0);
  }

  percentageDone(type: "income" | "expenditure"):number {
    return Math.floor((this.totalEstimated(type, "done") * 100) / this.totalEstimated(type, "all"));
  }

  render() {
    const list = this.state.sorter === "none" ? this.props.list : this.sorter(this.props.list, this.state.sorter);
    return (
      <ListContainer className="budget-list-container">
        <ListHeader
          type={this.props.type}
          changeSorter={this.changeSorter}
          showSorter={this.props.showSorter}
          changeShowSorter={this.props.changeShowSorter}
        />

        <ItemList>
          {list.map(item =>
            <Transaction
              key={item.id}
              item={item}
              selection={this.props.selection}
              setSelection={this.props.setSelection}
              list={this.props.list}
              setList={this.props.setList}
              setUserInput={this.props.setUserInput}
            />
          )}
        </ItemList>

        <ListBackground
          style={{ height: `${this.percentageDone(this.props.type)}%`, background: this.props.type === "income" ? "#adf" : "#fbc" }}
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
  setUserInput: (userInput: number) => void,
  showSorter: ShowType,
  changeShowSorter: (showType: ShowType) => void,
}

interface State {
  sorter: SorterType,
}

type ShowType = "none" | "income" | "expenditure";
type SorterType = "none" | "description-A" | "value-1" | "expiration_day-1" | "description-Z" | "value-9" | "expiration_day-9";
