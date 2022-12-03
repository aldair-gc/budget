import { FaRegDotCircle } from "react-icons/fa";
import { YearMonthInterface } from "../interfaces";
import { ResetButtons } from "./style";

export default function ResetButton(props: Props) {
  function resetYM (): void {
    props.setYearMonth({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
  }

  return (
    <ResetButtons>
      <button onClick={() => resetYM()}><FaRegDotCircle/></button>
    </ResetButtons>
  );
}

interface Props {
  setYearMonth: (yearMonth: YearMonthInterface) => void,
}
