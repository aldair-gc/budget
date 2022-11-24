import YearMonthPicker from "../yearMonthPicker/YearMonthPicker";
import { YearMonthInterface, SetYearMonthInterface } from "../interfaces";
import { HeaderContainer } from "./style";
// import ThisDate from "./thisDate";

export default function MainHeader(props: Props) {
  return (
    <HeaderContainer>
      {/* <ThisDate yearMonth={props.yearMonth} /> */}
      <h1>Budget</h1>
      <YearMonthPicker
        yearMonth={props.yearMonth}
        setYearMonth={props.setYearMonth}
        height={"55px"}
        width={"270px"}
        initialYear={2020}
        finalYear={2029}
      />
    </HeaderContainer>
  );
}

interface Props {
  yearMonth: YearMonthInterface;
  setYearMonth: SetYearMonthInterface;
}
