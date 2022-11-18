import { Component } from "react";
import { MonthButtonStyle } from "./style";

export interface YearMonthInterface {
  year: number,
  month: number,
}

export interface ButtonInterface {
  monthName: string,
  monthNumber: number,
  yearMonth: YearMonthInterface,
  setYearMonth: (yearMonth: YearMonthInterface) => void;
}

export default class MonthButton extends Component<ButtonInterface> {
  constructor(props: ButtonInterface) {
    super(props);
    this.setYearMonth = props.setYearMonth.bind;
  }

  setYearMonth(yearMonth: YearMonthInterface):void {
    this.props.setYearMonth(yearMonth);
  }

  render() {
    return (
      <MonthButtonStyle
        className={this.props.yearMonth.month === this.props.monthNumber ? "month-selected" : ""}
        onClick={() => this.setYearMonth({ year: this.props.yearMonth.year, month:this.props.monthNumber - 1 })}>
        {this.props.monthName}
      </MonthButtonStyle>
    );
  }
}
