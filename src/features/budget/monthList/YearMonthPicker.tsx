import { Component } from "react";
import { PickerGlassEffect, YearMonthPickerContainer } from "./style";

export default class YearMonthPicker extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      year: 0,
      month: 0,
    };
  }

  render() {
    // set the size from this properties
    const height = "100px";
    const width = "100px";

    return (
      <YearMonthPickerContainer>
        <div className="year-picker"
          style={{top: "-50 - 12.5", transform: `translateY(${this.state.year * -25}px)`}}>
          <p>2020</p>
          <p>2021</p>
          <p>2022</p>
          <p>2023</p>
          <p>2024</p>
          <p>2025</p>
          <p>2026</p>
          <p>2027</p>
          <p>2028</p>
          <p>2029</p>
        </div>
        <PickerGlassEffect style={{left: "10px"}} onWheelCapture={(e) => {
          const scroll = e.nativeEvent.deltaY;
          const selection = this.state.year;

          if (scroll > 0 && selection < 9) {
            this.setState({year: selection + 1});
          } else if (scroll < 0 && selection > 0) {
            this.setState({year: selection - 1});
          }
        }}/>

        <div className="month-picker" style={{top: "-50 - 12.5", transform: `translateY(${this.state.month * -25}px)`}}>
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
        <PickerGlassEffect style={{right: "10px"}} onWheelCapture={(e) => {
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

interface Props {}

interface States {
  year: number,
  month: number,
}
