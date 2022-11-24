import { Component } from "react";
import { SetYearMonthInterface, YearMonthInterface } from "../interfaces";
import { PickerGlassEffect, YearMonthPickerContainer } from "./style";

export default class YearMonthPicker extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      year: props.yearMonth.year - props.initialYear,
      month: props.yearMonth.month - 1,
    };
  }

  render() {
    // set the size from this properties
    const height = this.props.height;
    const width = this.props.width;
    const initialYear = this.props.initialYear;
    const finalYear = this.props.finalYear;

    function makeYearList() {
      const yearList: JSX.Element[] = [];
      for(let i = initialYear; i <= finalYear; i++) {
        yearList.push(<p>{i}</p>);
      }
      return yearList;
    }

    return (
      <YearMonthPickerContainer style={{width, height}}>
        <div className="year-picker"
          style={{
            top: "-50 - 12.5",
            transform: `translateY(${this.state.year * -20}px)`,
            width: `calc((${width} / 2) - 15px)`,
            padding: `calc((${height} - 20px) / 2) 0`,
          }}>

          {makeYearList()}

        </div>
        <PickerGlassEffect
          style={{ left: "10px", width: "calc(50% - 5px)", height: this.props.height, }}
          onWheelCapture={(e) => {
            const scroll = e.nativeEvent.deltaY;
            const selection = this.state.year;

            if (scroll > 0 && selection < 9) {
              this.setState({year: selection + 1});
            } else if (scroll < 0 && selection > 0) {
              this.setState({year: selection - 1});
            }
          }}/>

        <div className="month-picker"
          style={{
            top: "-50 - 12.5",
            transform: `translateY(${this.state.month * -20}px)`,
            width: `calc((${width} / 2) - 15px)`,
            padding: `calc((${height} - 20px) / 2) 0`,
          }}>
          <p>January</p>
          <p>February</p>
          <p>March</p>
          <p>April</p>
          <p>May</p>
          <p>June</p>
          <p>July</p>
          <p>August</p>
          <p>September</p>
          <p>October</p>
          <p>November</p>
          <p>December</p>
        </div>
        <PickerGlassEffect
          style={{ right: "10px", width: "calc(50% - 5px)", height: this.props.height, }}
          onWheelCapture={(e) => {
            const scroll = e.nativeEvent.deltaY;
            const selection = this.state.month;

            if (scroll > 0 && selection < 11) {
              this.setState({month: selection + 1});
            } else if (scroll < 0 && selection > 0) {
              this.setState({month: selection - 1});
            }
          }}/>

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
  setYearMonth: SetYearMonthInterface,
}

interface States {
  year: number,
  month: number,
}
