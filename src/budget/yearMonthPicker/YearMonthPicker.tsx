import { Component } from "react";
import { YearMonthInterface } from "../interfaces";
import { YearMonthPickerContainer } from "./style";

export default class YearMonthPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.setYearMonth = this.props.setYearMonth.bind(this);
    this.state = {
      yearTop: (this.props.yearMonth.year - this.props.initialYear) * 30,
      monthTop: this.props.yearMonth.month * 30,
      monthChange: 0,
      yearChange: 0,
      picking: false,
    };
  }

  componentDidMount(): void {
    const yearScroll = document.querySelector(".year-picker") as HTMLDivElement;
    const monthScroll = document.querySelector(".month-picker") as HTMLDivElement;
    //   yearScroll.scrollTo({top: this.state.yearTop});
    //   monthScroll.scrollTo({top: this.state.monthTop});
    //   yearScroll.onscroll = () => {
    //     if ((yearScroll.scrollTop / 20) % 1 === 0) {
    //       this.setState({yearTop: yearScroll.scrollTop / 20});
    //       this.props.setYearMonth({
    //         year: this.props.initialYear + yearScroll.scrollTop / 20,
    //         month: this.props.yearMonth.month
    //       });
    //     }
    //   };
    //   monthScroll.onscroll = () => {
    //     if ((monthScroll.scrollTop / 20) % 1 === 0) {
    //       this.setState({yearTop: monthScroll.scrollTop / 20 - 20});
    //       this.props.setYearMonth({
    //         year: this.props.yearMonth.year,
    //         month: monthScroll.scrollTop / 20 + 1
    //       });
    //     }
    //   };
    monthScroll.addEventListener("touchstart", (eventTouch) => {
      eventTouch.preventDefault();
      this.setState({picking: true});
      monthScroll.addEventListener("touchmove", (eventMove) => {
        eventMove.preventDefault();
        const moving = (eventTouch.touches[0].clientY - eventMove.touches[0].clientY);
        this.setState({monthChange: moving});
        monthScroll.addEventListener("touchend", (eventEnd) => {
          eventEnd.preventDefault();
          if (this.state.picking){
            const monthsToSet = Math.round(this.state.monthChange / 30);
            monthsToSet != 0 && this.setNewYearMonth(monthsToSet);
            this.setState({monthChange: 0, picking: false});
            console.log(this.state);
            console.log(this.props);
          } else {
            eventEnd.stopImmediatePropagation();
          }
          this.setState({picking: false});
        });
      });
    });
  }

  setNewYearMonth(change: number): void {
    let yearDif = parseInt((change / 12).toFixed(0));
    let monthDif = (change % 12);
    if ((change > 0) && ((this.props.yearMonth.month + monthDif) > 12)) {
      yearDif++;
      monthDif -= this.props.yearMonth.month;
    }
    if ((change < 0) && ((this.props.yearMonth.month + monthDif) < 1)) {
      yearDif--;
      monthDif = 13 + monthDif;
    }
    this.setYearMonth({
      year: this.props.yearMonth.year + yearDif,
      month: this.props.yearMonth.month + monthDif,
    });
    this.setState({monthTop: this.state.monthTop + (monthDif * 30)});
    console.log(yearDif, monthDif);
  }

  // componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
  // const yearScroll = document.querySelector(".year-picker") as HTMLDivElement;
  // const monthScroll = document.querySelector(".month-picker") as HTMLDivElement;
  // if (prevState.monthTop === this.state.monthTop && prevState.yearTop === this.state.yearTop) {
  // if (prevProps.yearMonth.month !== this.props.yearMonth.month) {
  //   this.setState({monthTop});
  // }
  // if (prevProps.yearMonth.year !== this.props.yearMonth.year) {
  //   yearScroll.scrollTo({top: (this.props.yearMonth.year - this.props.initialYear) * 20});
  // }
  // }
  // }

  setYearMonth(yearMonth: {year: number, month: number}): void {
    this.props.setYearMonth(yearMonth);
  }

  render() {
    const height = this.props.height;
    const width = this.props.width;
    const initialYear = this.props.initialYear;
    const finalYear = this.props.finalYear;
    const monthTop = this.state.monthTop;
    const monthChange = this.state.monthChange;
    const yearTop = this.state.yearTop;
    const yearChange = this.state.yearChange;

    function makeYearList() {
      const quant = finalYear - initialYear;
      const yearList: JSX.Element[] = [];
      for(let i = 0; i <= quant; i++) {
        yearList.push(<p key={i} style={cylinder(i + 1, quant, yearTop, yearChange)}>{initialYear + i}</p>);
      }
      return yearList;
    }

    function cylinder(part: number, total: number, top: number, topChange: number) {
      return {
        transform: `rotateX(${(-(360 / total) * part) + top + topChange}deg) translateY(-50%)`,
        transformOrigin: "0 0 -38px",
      };
    }

    const largeScreen = window.screen.width >= 600;

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

          <p style={cylinder(1, 12, monthTop, monthChange)}>{largeScreen ? "January" : "JAN"}</p>
          <p style={cylinder(2, 12, monthTop, monthChange)}>{largeScreen ? "February" : "FEB"}</p>
          <p style={cylinder(3, 12, monthTop, monthChange)}>{largeScreen ? "March" : "MAR"}</p>
          <p style={cylinder(4, 12, monthTop, monthChange)}>{largeScreen ? "April" : "APR"}</p>
          <p style={cylinder(5, 12, monthTop, monthChange)}>{largeScreen ? "May" : "MAY"}</p>
          <p style={cylinder(6, 12, monthTop, monthChange)}>{largeScreen ? "June" : "JUN"}</p>
          <p style={cylinder(7, 12, monthTop, monthChange)}>{largeScreen ? "July" : "JUL"}</p>
          <p style={cylinder(8, 12, monthTop, monthChange)}>{largeScreen ? "August" : "AUG"}</p>
          <p style={cylinder(9, 12, monthTop, monthChange)}>{largeScreen ? "September" : "SEP"}</p>
          <p style={cylinder(10, 12, monthTop, monthChange)}>{largeScreen ? "October" : "OCT"}</p>
          <p style={cylinder(11, 12, monthTop, monthChange)}>{largeScreen ? "November" : "NOV"}</p>
          <p style={cylinder(12, 12, monthTop, monthChange)}>{largeScreen ? "December" : "DEC"}</p>
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
  monthChange: number,
  yearChange: number,
  picking: boolean,
}
