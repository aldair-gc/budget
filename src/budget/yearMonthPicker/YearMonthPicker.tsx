import { Component } from "react";
import { YearMonthInterface } from "../interfaces";
import { YearMonthPickerContainer } from "./style";

export default class YearMonthPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.setYearMonth = this.props.setYearMonth.bind(this);
    this.state = {
      yearTop: (this.props.yearMonth.year - this.props.initialYear) * 20,
      monthTop: this.props.yearMonth.month * 20 - 20,
    };
  }

  componentDidMount(): void {
    const yearScroll = document.querySelector(".year-picker") as HTMLDivElement;
    const monthScroll = document.querySelector(".month-picker") as HTMLDivElement;
    yearScroll.scrollTo({top: this.state.yearTop});
    monthScroll.scrollTo({top: this.state.monthTop});
    yearScroll.onscroll = () => {
      if ((yearScroll.scrollTop / 20) % 1 === 0) {
        this.setState({yearTop: yearScroll.scrollTop / 20});
        this.props.setYearMonth({
          year: this.props.initialYear + yearScroll.scrollTop / 20,
          month: this.props.yearMonth.month
        });
      }
    };
    monthScroll.onscroll = () => {
      if ((monthScroll.scrollTop / 20) % 1 === 0) {
        this.setState({yearTop: monthScroll.scrollTop / 20 - 20});
        this.props.setYearMonth({
          year: this.props.yearMonth.year,
          month: monthScroll.scrollTop / 20 + 1
        });
      }
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    const yearScroll = document.querySelector(".year-picker") as HTMLDivElement;
    const monthScroll = document.querySelector(".month-picker") as HTMLDivElement;
    if (prevState.monthTop === this.state.monthTop && prevState.yearTop === this.state.yearTop) {
      if (prevProps.yearMonth.month !== this.props.yearMonth.month) {
        monthScroll.scrollTo({top: this.props.yearMonth.month * 20 - 20});
      }
      if (prevProps.yearMonth.year !== this.props.yearMonth.year) {
        yearScroll.scrollTo({top: (this.props.yearMonth.year - this.props.initialYear) * 20});
      }
    }
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
            width: `calc((${width} / 2) - 15px)`,
            padding: `calc((${height} - 20px) / 2) 0`,
          }}>

          {makeYearList()}
        </div>

        <div className="month-picker"
          style={{
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

interface State {
  yearTop: number,
  monthTop: number,
}
