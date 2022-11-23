import MonthButton, { YearMonthInterface } from "./MonthButton";
import { MonthListContainer } from "./style";

export default function MonthList(props: Props) {
  return (
    <MonthListContainer>
      <MonthButton monthName={"JAN"} monthNumber={1} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"FEB"} monthNumber={2} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"MAR"} monthNumber={3} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"APR"} monthNumber={4} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"MAY"} monthNumber={5} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"JUN"} monthNumber={6} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"JUL"} monthNumber={7} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"AUG"} monthNumber={8} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"SEP"} monthNumber={9} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"OCT"} monthNumber={10} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"NOV"} monthNumber={11} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
      <MonthButton monthName={"DEC"} monthNumber={12} yearMonth={props.yearMonth} setYearMonth={props.setYearMonth} />
    </MonthListContainer>
  );
}

interface Props {
  yearMonth: YearMonthInterface,
  setYearMonth: (yearMonth: YearMonthInterface) => void
}
