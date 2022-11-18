import MonthButton, { YearMonthInterface } from "./button";
import { MonthListContainer } from "./style";

export default function MonthList(yearMonth: YearMonthInterface, setYearMonth: (yearMonth: YearMonthInterface) => void) {
  return (
    <MonthListContainer>
      <MonthButton monthName={"JAN"} monthNumber={1} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"FEB"} monthNumber={2} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"MAR"} monthNumber={3} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"APR"} monthNumber={4} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"MAY"} monthNumber={5} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"JUN"} monthNumber={6} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"JUL"} monthNumber={7} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"AUG"} monthNumber={8} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"SEP"} monthNumber={9} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"OCT"} monthNumber={10} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"NOV"} monthNumber={11} yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <MonthButton monthName={"DEC"} monthNumber={12} yearMonth={yearMonth} setYearMonth={setYearMonth} />
    </MonthListContainer>
  );
}
