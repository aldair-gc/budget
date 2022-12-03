/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionInterface } from "../interfaces";
import { ItemList, ListBackground, ListContainer, ListInputContainer } from "./style";
import Transaction from "./transaction/Transaction";
import { Component } from "react";
import ListTitle from "./title/ListTitle";
import InputForm from "../userInput/InputForm";

export default class BudgetList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeSorter = this.changeSorter.bind(this);
    this.toggleUserInput = this.toggleUserInput.bind(this);
    this.state = {
      sorter: "none",
      userInput: -1,
    };
  }

  changeSorter(sorter: SorterType): void {
    this.setState({sorter: sorter});
  }

  toggleUserInput(): void {
    this.setState({userInput: this.state.userInput === 0 ? -1 : 0});
  }

  sorter(list: TransactionInterface[], type: string) {
    switch (type) {
    case "none": return this.props.list; break;
    case "expiration_day-1": return list.sort((a,b) => a.expiration_day - b.expiration_day); break;
    case "value-1": return list.sort((a,b) => +a.value - +b.value); break;
    case "description-A": return list.sort((a,b) => {
      if (a.description < b.description) return -1;
      if (a.description > b.description) return 1;
      return 0;
    }); break;
    case "expiration_day-9": return list.sort((a,b) => b.expiration_day - a.expiration_day); break;
    case "value-9": return list.sort((a,b) => +b.value - +a.value); break;
    case "description-Z": return list.sort((a,b) => {
      if (b.description < a.description) return -1;
      if (b.description > a.description) return 1;
      return 0;
    }); break;
    default: return this.props.list;
    }
  }

  totalEstimated(type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return this.props.list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? +item.value : 0, 0);
  }

  percentageDone(type: "income" | "expenditure"):number {
    return Math.floor((this.totalEstimated(type, "done") * 100) / this.totalEstimated(type, "all"));
  }

  render() {
    const list = this.sorter(this.props.list, this.state.sorter);
    return (
      <ListContainer className="budget-list-container">
        <ListTitle
          type={this.props.type}
          changeSorter={this.changeSorter}
          showSorter={this.props.showSorter}
          changeShowSorter={this.props.changeShowSorter}
          toggleUserInput={this.toggleUserInput}
        />

        <ListInputContainer style={{height: this.state.userInput === 0 ? "200px" : "0"}}>
          <InputForm
            userInput={this.state.userInput}
            setUserInput={() => this.toggleUserInput}
            list={this.props.list}
            setList={(type: "income" | "expenditure", list: TransactionInterface[]) => this.props.setList(list)}
            options={{
              type: [true, this.props.type],
              description: [false, ""],
              value: [false, ""],
              status: [true, "pending"],
              year: [true, new Date().getFullYear()],
              month: [true, new Date().getMonth()],
              expiration_day: [false, 0],
              repeat: [false, ""],
            }}/>
        </ListInputContainer>

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
  userInput: number,
}

type ShowType = "none" | "income" | "expenditure";
type SorterType = "none" | "description-A" | "value-1" | "expiration_day-1" | "description-Z" | "value-9" | "expiration_day-9";
