import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { YearMonthInterface } from "./button";
import MonthList from "./monthList";
import { DateSelectorContainer, YearButtonStyle } from "./style";

export default function DateSelector(props: Props) {
  return (
    <DateSelectorContainer>
      <YearButtonStyle onClick={() => props.setYearMonth({year: props.yearMonth.year - 1, month: props.yearMonth.month})}>
        <FaArrowCircleLeft />
      </YearButtonStyle>
      <MonthList yearMonth={props.yearMonth} setYearMonth={props.setYearMonth}/>
      <YearButtonStyle onClick={() => props.setYearMonth({year: props.yearMonth.year + 1, month: props.yearMonth.month})}>
        <FaArrowCircleRight />
      </YearButtonStyle>
    </DateSelectorContainer>
  );
}

interface Props {
  yearMonth: YearMonthInterface,
  setYearMonth: (yearMonth: YearMonthInterface) => void
}