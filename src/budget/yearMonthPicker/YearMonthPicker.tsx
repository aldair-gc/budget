import { Component } from "react";
import { YearMonthInterface } from "../interfaces";
import { PickerFrontGlass, PickerGlassEffect, YearMonthPickerContainer } from "./style";

export default class YearMonthPicker extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.setYearMonth = this.props.setYearMonth.bind(this);
  }

  setYearMonth(yearMonth: {year: number, month: number}): void {
    this.props.setYearMonth(yearMonth);
  }

  render() {
    const height = this.props.height;
    const width = this.props.width;
    const initialYear = this.props.initialYear;
    const finalYear = this.props.finalYear;

    function makeYearList() {
      const yearList: JSX.Element[] = [];
      for(let i = initialYear; i <= finalYear; i++) {
        yearList.push(<p key={i}>{i}</p>);
      }
      return yearList;
    }

    return (
      <YearMonthPickerContainer style={{width, height}}>
        <div className="year-picker"
          style={{
            transform: `translateY(${(this.props.yearMonth.year - initialYear) * -20}px)`,
            width: `calc((${width} / 2) - 15px)`,
            padding: `calc((${height} - 20px) / 2) 0`,
          }}>

          {makeYearList()}
        </div>

        <PickerGlassEffect style={{ left: "10px", width: "calc(50% - 15px)", height: this.props.height, }} />

        <PickerFrontGlass
          style={{ left: "10px", width: "calc(50% - 15px)", height: this.props.height, }}
          onWheelCapture={(e) => {
            const scroll = e.nativeEvent.deltaY;
            const selection = this.props.yearMonth.year;

            if (scroll > 0 && selection < finalYear) {
              this.setYearMonth({year: selection + 1, month: this.props.yearMonth.month});
            } else if (scroll < 0 && selection > initialYear) {
              this.setYearMonth({year: selection - 1, month: this.props.yearMonth.month});
            }
          }}
        />

        <div className="month-picker"
          style={{
            transform: `translateY(${(this.props.yearMonth.month * -20) + 20}px)`,
            width: `calc((${width} / 2) - 15px)`,
            padding: `calc((${height} - 20px) / 2) 0`,
          }}>

          <p>{window.screen.width >= 600 ? "January" : "JAN"}</p>
          <p>{window.screen.width >= 600 ? "February" : "FEB"}</p>
          <p>{window.screen.width >= 600 ? "March" : "MAR"}</p>
          <p>{window.screen.width >= 600 ? "April" : "APR"}</p>
          <p>{window.screen.width >= 600 ? "May" : "MAY"}</p>
          <p>{window.screen.width >= 600 ? "June" : "JUN"}</p>
          <p>{window.screen.width >= 600 ? "July" : "JUL"}</p>
          <p>{window.screen.width >= 600 ? "August" : "AUG"}</p>
          <p>{window.screen.width >= 600 ? "September" : "SEP"}</p>
          <p>{window.screen.width >= 600 ? "October" : "OCT"}</p>
          <p>{window.screen.width >= 600 ? "November" : "NOV"}</p>
          <p>{window.screen.width >= 600 ? "December" : "DEC"}</p>
        </div>

        <PickerGlassEffect style={{ right: "10px", width: "calc(50% - 15px)", height: this.props.height, }} />

        <PickerFrontGlass
          style={{ right: "10px", width: "calc(50% - 15px)", height: this.props.height, }}
          onWheelCapture={(e) => {
            const scroll = e.nativeEvent.deltaY;
            const selection = this.props.yearMonth.month;

            if (scroll > 0 && selection < 12) {
              this.setYearMonth({year: this.props.yearMonth.year, month: selection + 1});
            } else if (scroll < 0 && selection > 1) {
              this.setYearMonth({year: this.props.yearMonth.year, month: selection - 1});
            }
          }}
        />

        <div className="border-effect" />
      </YearMonthPickerContainer>
    );
  }
}

interface Props {
  height: string,
  width: string,
  initialYear: number,
  finalYear: number,
  yearMonth: YearMonthInterface,
  setYearMonth: (yearMonth: YearMonthInterface) => void,
}
