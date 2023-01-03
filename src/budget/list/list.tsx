/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionInterface } from "../interfaces";
import { Evidence, ItemList, ListBackground, ListContainer, ListInputContainer } from "./style";
import Transaction from "./transaction/Transaction";
import { Component } from "react";
import ListTitle from "./title/ListTitle";
import InputForm from "../userInput/InputForm";
import TotalsLine from "../totals/TotalsLine";

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
    this.setState({ sorter: sorter });
  }

  toggleUserInput(): void {
    this.setState({ userInput: this.state.userInput === 0 ? -1 : 0 });
  }

  sorter(list: TransactionInterface[], type: string) {
    // prettier-ignore
    /* eslint-disable indent */
    switch (type) {
      case "none": return list;
      case "expiration_day-1": return list.sort((a, b) => a.expiration_day - b.expiration_day);
      case "value-1": return list.sort((a, b) => +a.value - +b.value);
      case "description-A": return list.sort((a, b) => {
        if (a.description < b.description) return -1;
        if (a.description > b.description) return 1;
        return 0;
      });
      case "expiration_day-9": return list.sort((a, b) => b.expiration_day - a.expiration_day);
      case "value-9": return list.sort((a, b) => +b.value - +a.value);
      case "description-Z": return list.sort((a, b) => {
        if (b.description < a.description) return -1;
        if (b.description > a.description) return 1;
        return 0;
      });
      default: return list;
    }
  }

  totalEstimated(type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return this.props.list.reduce(
      (sum, item) => (sum += (item.type === type || type === "all") && (item.status === status || status === "all") ? +item.value : 0),
      0,
    );
  }

  percentageDone(type: "income" | "expenditure"): number {
    return Math.floor((this.totalEstimated(type, "done") * 100) / this.totalEstimated(type, "all")) || 0;
  }

  render() {
    const originalList = this.props.list;
    const sortedList = this.sorter([...this.props.list], this.state.sorter);
    const list = this.state.sorter === "none" ? originalList : sortedList;
    return (
      <ListContainer className="budget-list-container">
        <ListTitle
          type={this.props.type}
          changeSorter={this.changeSorter}
          showSorter={this.props.showSorter}
          changeShowSorter={this.props.changeShowSorter}
          userInput={this.state.userInput}
          toggleUserInput={this.toggleUserInput}
        />

        <Evidence style={{ display: this.state.userInput === 0 ? "block" : "none" }} />

        <ListInputContainer style={{ height: this.state.userInput === 0 ? "213px" : "0" }}>
          <InputForm
            userInput={this.state.userInput}
            setUserInput={this.toggleUserInput}
            yearMonth={this.props.yearMonth}
            list={this.props.list}
            setList={(type: "income" | "expenditure", list: TransactionInterface[]) => this.props.setList(list)}
            options={{
              type: [false, this.props.type],
              description: [false, ""],
              value: [false, ""],
              status: [true, "pending"],
              year: [true, this.props.yearMonth.year],
              month: [true, this.props.yearMonth.month],
              expiration_day: [false, 0],
              repeat: [false, "0-1-1"],
            }}
          />
        </ListInputContainer>

        <ItemList>
          {list.map((item) => (
            <Transaction
              key={item.id}
              item={item}
              selection={this.props.selection}
              setSelection={this.props.setSelection}
              list={this.props.list}
              setList={this.props.setList}
              setUserInput={this.props.setUserInput}
              loading={this.props.loading}
            />
          ))}
        </ItemList>

        <ListBackground
          height={this.props.loading ? 100 : this.percentageDone(this.props.type)}
          loading={this.props.loading}
          type={this.props.type}
        />

        <TotalsLine list={this.props.loading ? [] : this.props.list} />
      </ListContainer>
    );
  }
}

interface Props {
  list: TransactionInterface[];
  setList: (list: TransactionInterface[]) => void;
  type: "income" | "expenditure";
  yearMonth: { year: number; month: number };
  selection: number;
  setSelection: (id: number) => void;
  setUserInput: (userInput: number) => void;
  showSorter: ShowType;
  changeShowSorter: (showType: ShowType) => void;
  loading: boolean;
}

interface State {
  sorter: SorterType;
  userInput: number;
}

type ShowType = "none" | "income" | "expenditure";
type SorterType = "none" | "description-A" | "value-1" | "expiration_day-1" | "description-Z" | "value-9" | "expiration_day-9";
