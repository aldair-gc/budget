import YearMonthPicker from "../monthList/YearMonthPicker";
import { HeaderContainer } from "./style";
// import ThisDate from "./thisDate";

export default function MainHeader(props: {yearMonth: {year: number, month: number}}) {
  return (
    <HeaderContainer>
      {/* <ThisDate yearMonth={props.yearMonth} /> */}
      <h1>Budget</h1>
      <YearMonthPicker/>
    </HeaderContainer>
  );
}
