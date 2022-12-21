import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { YearMonthInterface } from "../../budget/interfaces";
import { SideButtons } from "./style";

export default function ButtonsYearMonth(props: Props) {
  function setYM(number: number): void {
    const year = props.yearMonth.year;
    const month = props.yearMonth.month;
    if (number === 1) {
      month === 12 ? props.setYearMonth({ year: year + 1, month: 1 }) : props.setYearMonth({ year, month: month + 1 });
    } else {
      month === 1 ? props.setYearMonth({ year: year - 1, month: 12 }) : props.setYearMonth({ year, month: month - 1 });
    }
  }

  return (
    <SideButtons>
      <button onClick={() => setYM(-1)}>
        <FaChevronUp />
      </button>
      <button onClick={() => setYM(1)}>
        <FaChevronDown />
      </button>
    </SideButtons>
  );
}

interface Props {
  yearMonth: YearMonthInterface;
  setYearMonth: (yearMonth: YearMonthInterface) => void;
}
