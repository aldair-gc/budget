/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, useEffect } from "react";
import axios from "../../services/axios";
import MainHeader from "./header/header";
import Input from "./input/input";
import { Transaction } from "./interfaces";
import BudgetList from "./list/list";
import DateSelector from "./monthList/DateSelector";
import Properties from "./properties/properties";
import RightClickMenu from "./rightClickMenu/rightClickMenu";
import { BudgetContainer, BudgetListsContainer } from "./style";
import { Estimated } from "./totals/style";
import TotalsContainer from "./totals/totals";

interface BudgetPropsInterface {
  option: string,
}
interface BudgetStateInterface {
  yearMonth: {year: number, month: number},
  list: Transaction[],
  type: "income" | "expenditure",
  description: string,
  value: number,
  expiration_day: number,
  status: "done" | "pending",
  year: number,
  month: number,
  repeat: string,
  propItemId: number,
}

export default class Budget extends Component<BudgetPropsInterface, BudgetStateInterface> {
  constructor(props: BudgetPropsInterface) {
    super(props);
    this.state = {
      yearMonth : {year: new Date().getFullYear(), month: new Date().getMonth() + 1},
      list : [] as Transaction[],
      type : "expenditure",
      description : "",
      value : 0,
      expiration_day : 0,
      status : "pending",
      year : new Date().getFullYear(),
      month : new Date().getMonth() + 1,
      repeat : "0-1-1",
      propItemId : 0,
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      const getList = await axios.get(`/transaction/${this.state.yearMonth.year}/${this.state.yearMonth.month}`);
      if (getList.status === 200) {
        this.setState({ list: getList.data });
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  totalEstimated(type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return this.state.list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? item.value : 0, 0);
  }

  totalPercent(type: "income" | "expenditure") {
    return { width: ((this.totalEstimated(type, "done") * 100) / this.totalEstimated(type, "all")) + "%" };
  }

  result():number {
    return this.totalEstimated("income", "all") - this.totalEstimated("expenditure", "all");
  }

  openProperties(id: number): void {
    console.log(id, this.state.list.findIndex(item => item.id === id ), this.state.list);
    if (this.state.list.findIndex(item => item.id === id ) !== -1) {
      const item = this.state.list[this.state.list.findIndex(item => item.id === id )];
      this.setState({
        propItemId :id,
        type: item.type,
        description: item.description,
        value: item.value,
        expiration_day: item.expiration_day,
        status: item.status,
        month: item.month,
        year: item.year,
        repeat: item.repeat,
      });
    }
  }

  render() {
    return (
      <BudgetContainer>
        <MainHeader yearMonth={this.state.yearMonth}/>

        <DateSelector yearMonth={this.state.yearMonth} setYearMonth={(yearMonth) => this.setState({ yearMonth })} />

        <Input values={this.state} setters={this.setState} list={this.state.list} setList={(list) => this.setState({ list })}/>

        <BudgetListsContainer>
          <BudgetList list={this.state.list} setList={(list) => this.setState({ list })} type={"income"} />
          <BudgetList list={this.state.list} setList={(list) => this.setState({ list })} type={"expenditure"} />
        </BudgetListsContainer>

        <TotalsContainer totalEstimated={this.totalEstimated} totalPercent={this.totalPercent} />

        <Estimated>
          <h3>Month Total Estimation</h3><h2 style={{ color: `${this.result() > 0 ? "#34a" : "#a34"}` }}>{`$ ${this.result().toFixed(2)}`}</h2>
        </Estimated>

        <RightClickMenu openProperties={this.openProperties}/>
        <Properties propItemId={this.state.propItemId} setPropItemId={(propItemId) => this.setState({ propItemId })} values={this.state} setters={this.setState} list={this.state.list} setList={(list) => this.setState({ list })}/>
      </BudgetContainer>
    );
  }
}
