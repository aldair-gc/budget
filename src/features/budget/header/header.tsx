import YearMonthPicker from "../yearMonthPicker/YearMonthPicker";
import { YearMonthInterface } from "../interfaces";
import { HeaderContainer } from "./style";
import ButtonsYearMonth from "../yearMonthPicker/ButtonYearMonth";

export default function MainHeader(props: Props) {
  return (
    <HeaderContainer>
      <h1>Budget</h1>

      <YearMonthPicker
        yearMonth={props.yearMonth}
        setYearMonth={props.setYearMonth}
        height={"55px"}
        width={"270px"}
        initialYear={2020}
        finalYear={2039}
      />

      <ButtonsYearMonth
        yearMonth={props.yearMonth}
        setYearMonth={props.setYearMonth}
      />
    </HeaderContainer>
  );
}

interface Props {
  yearMonth: YearMonthInterface;
  setYearMonth: (yearMonth: YearMonthInterface) => void;
}
