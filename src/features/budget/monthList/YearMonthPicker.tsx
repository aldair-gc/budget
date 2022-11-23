import { Component } from "react";
import { PickerGlassEffect, YearMonthPickerContainer } from "./style";

export default class YearMonthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() +1,
    };
  }

  render() {
    return (
      <YearMonthPickerContainer>
        <div className="year-picker">
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

        <div className="month-picker">
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

        <PickerGlassEffect/>
      </YearMonthPickerContainer>
    );
  }
}
