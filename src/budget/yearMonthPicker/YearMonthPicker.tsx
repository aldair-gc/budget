import { Component } from "react";
import { LanguageContext } from "../../app/App";
import { YearMonthInterface } from "../interfaces";
import { YearMonthPickerContainer } from "./style";

export default class YearMonthPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.setYearMonth = this.props.setYearMonth.bind(this);
    this.state = {
      yearTop: (this.props.yearMonth.year - this.props.initialYear) * 30,
      monthTop: (this.props.yearMonth.month - 1) * 30,
      monthChange: 0,
      yearChange: 0,
      picking: false,
    };
  }

  componentDidMount(): void {
    const yearScroll = document.querySelector(".year-picker") as HTMLDivElement;
    const monthScroll = document.querySelector(".month-picker") as HTMLDivElement;

    yearScroll.addEventListener("dblclick", () => {
      resetPicker();
    });

    monthScroll.addEventListener("dblclick", () => {
      resetPicker();
    });

    yearScroll.addEventListener("wheel", (eventWheel) => {
      eventWheel.deltaY > 0 && this.setNewYearMonth(12);
      eventWheel.deltaY < 0 && this.setNewYearMonth(-12);
    });

    monthScroll.addEventListener("wheel", (eventWheel) => {
      eventWheel.deltaY > 0 && this.setNewYearMonth(1);
      eventWheel.deltaY < 0 && this.setNewYearMonth(-1);
    });

    const resetPicker = (): void => {
      this.setYearMonth({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
      this.setState({monthTop: (this.props.yearMonth.month - 1) * 30, yearTop: (this.props.yearMonth.year - this.props.initialYear) * 30});
    };

    const addTouchAndScrool = (object: HTMLDivElement, yearOrMonth: "year" | "month"): void => {
      object.addEventListener("touchstart", (eventTouch) => {
        eventTouch.preventDefault();
        this.setState({picking: true});
        object.addEventListener("touchmove", (eventMove) => {
          eventMove.preventDefault();
          const moving = (eventTouch.touches[0].clientY - eventMove.touches[0].clientY);
          yearOrMonth === "month" && this.setState({monthChange: moving});
          yearOrMonth === "year" && this.setState({yearChange: moving});
          object.addEventListener("touchend", (eventEnd) => {
            eventEnd.preventDefault();
            if (this.state.picking){
              if (yearOrMonth === "month") this.setNewYearMonth(Math.round(this.state.monthChange / 30));
              if (yearOrMonth === "year") {
                this.setNewYearMonth(Math.round(this.state.yearChange / 30) * 12);
              }
              this.setState({monthChange: 0, yearChange: 0, picking: false});
            } else {
              eventEnd.stopImmediatePropagation();
            }
            this.setState({picking: false});
          });
        });
      });
    };

    addTouchAndScrool(yearScroll, "year");
    addTouchAndScrool(monthScroll, "month");
  }

  setNewYearMonth(change: number): void {
    let yearDif = Math.sign(change) * Math.floor(Math.abs(change) / 12);
    let monthDif = (change % 12);
    if ((change > 0) && ((this.props.yearMonth.month + monthDif) > 12)) {
      yearDif++;
      monthDif -= this.props.yearMonth.month;
    }
    if ((change < 0) && ((this.props.yearMonth.month + monthDif) < 1)) {
      yearDif--;
      monthDif = 12 + monthDif;
    }
    this.setYearMonth({
      year: this.props.yearMonth.year + yearDif,
      month: this.props.yearMonth.month + monthDif,
    });
    this.setState({monthTop: this.state.monthTop + (monthDif * 30), yearTop: this.state.yearTop + (yearDif * 30)});

  }

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
      const yearList: JSX.Element[] = [];
      for(let i = initialYear; i <= finalYear; i++) {
        yearList.push(<p key={i} style={cylinder(i - initialYear + 1, finalYear - initialYear + 1, yearTop, yearChange)}>{i}</p>);
      }
      return yearList;
    }

    function cylinder(part: number, total: number, top: number, topChange: number) {
      return {
        transform: `rotateX(${(-(360 / total) * (part - 1)) + top + topChange}deg) translateY(-50%)`,
        transformOrigin: "0 0 -38px",
      };
    }

    const largeScreen = window.screen.width >= 600;

    return (
      <LanguageContext.Consumer>
        {({file}) => (
          <YearMonthPickerContainer style={{width, height}}>
            <div className="year-picker" style={{ width: `calc((${width} / 2) - 15px)`, padding: `calc((${height} - 20px) / 2) 0` }}>
              {makeYearList()}
            </div>

            <div className="month-picker" style={{ width: `calc((${width} / 2) - 15px)`, padding: `calc((${height} - 20px) / 2) 0` }}>
              <p style={cylinder(1, 12, monthTop, monthChange)}>{largeScreen ? file.months.jan.full : file.months.jan.abrev}</p>
              <p style={cylinder(2, 12, monthTop, monthChange)}>{largeScreen ? file.months.feb.full : file.months.feb.abrev}</p>
              <p style={cylinder(3, 12, monthTop, monthChange)}>{largeScreen ? file.months.mar.full : file.months.mar.abrev}</p>
              <p style={cylinder(4, 12, monthTop, monthChange)}>{largeScreen ? file.months.apr.full : file.months.apr.abrev}</p>
              <p style={cylinder(5, 12, monthTop, monthChange)}>{largeScreen ? file.months.may.full : file.months.may.abrev}</p>
              <p style={cylinder(6, 12, monthTop, monthChange)}>{largeScreen ? file.months.jun.full : file.months.jun.abrev}</p>
              <p style={cylinder(7, 12, monthTop, monthChange)}>{largeScreen ? file.months.jul.full : file.months.jul.abrev}</p>
              <p style={cylinder(8, 12, monthTop, monthChange)}>{largeScreen ? file.months.aug.full : file.months.aug.abrev}</p>
              <p style={cylinder(9, 12, monthTop, monthChange)}>{largeScreen ? file.months.sep.full : file.months.sep.abrev}</p>
              <p style={cylinder(10, 12, monthTop, monthChange)}>{largeScreen ? file.months.oct.full : file.months.oct.abrev}</p>
              <p style={cylinder(11, 12, monthTop, monthChange)}>{largeScreen ? file.months.nov.full : file.months.nov.abrev}</p>
              <p style={cylinder(12, 12, monthTop, monthChange)}>{largeScreen ? file.months.dec.full : file.months.dec.abrev}</p>
            </div>
          </YearMonthPickerContainer>
        )}
      </LanguageContext.Consumer>
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
