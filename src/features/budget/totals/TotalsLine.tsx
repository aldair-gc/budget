import { TransactionInterface } from "../interfaces";
import { TotalsLineContainer, TotalsNumbers } from "./style";
import { brl, brlPercent } from "../currency";

export default function TotalsLine(props: Props) {

  function totalOf(list: TransactionInterface[], status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => sum += ((item.status === status || status === "all")) ? +item.value : 0, 0);
  }

  return (
    <TotalsLineContainer>
      <TotalsNumbers>
        <p>{brl.format(totalOf(props.list, "done"))}</p>
        <p>{brlPercent.format((totalOf(props.list, "done") / totalOf(props.list, "all")) || 0)}</p>
        <p>{brl.format(totalOf(props.list, "all"))}</p>
      </TotalsNumbers>
    </TotalsLineContainer>
  );
}

interface Props {
  list: TransactionInterface[],
  lastMonthBalance: number,
}
