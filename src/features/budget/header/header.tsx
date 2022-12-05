import YearMonthPicker from "../yearMonthPicker/YearMonthPicker";
import { YearMonthInterface } from "../interfaces";
import { HeaderContainer, MainTitleContainer } from "./style";
import ButtonsYearMonth from "../yearMonthPicker/ButtonYearMonth";
import ResetButton from "../yearMonthPicker/ResetButton";

export default function MainHeader(props: Props) {
  return (
    <HeaderContainer>
      <MainTitleContainer>
        Budget
      </MainTitleContainer>

      <ResetButton
        setYearMonth={props.setYearMonth}
      />

      <YearMonthPicker
        yearMonth={props.yearMonth}
        setYearMonth={props.setYearMonth}
        height={"55px"}
        width={window.screen.width >= 600 ? "270px" : "150px"}
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
