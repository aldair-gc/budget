import { FaDotCircle } from "react-icons/fa";
import { YearMonthInterface } from "../../budget/interfaces";
import { SideButtons } from "./style";

export default function ResetButton(props: Props) {
  function resetYM (): void {
    props.setYearMonth({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
  }

  return (
    <SideButtons>
      <button onClick={() => resetYM()}><FaDotCircle/></button>
    </SideButtons>
  );
}

interface Props {
  setYearMonth: (yearMonth: YearMonthInterface) => void,
}
