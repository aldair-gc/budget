import { TransactionInterface } from "../interfaces";
import { TotalsLineContainer, TotalsNumbers } from "./style";
import { NumberContext } from "../../app/App";

export default function TotalsLine(props: Props) {

  function totalOf(list: TransactionInterface[], status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => sum += ((item.status === status || status === "all")) ? +item.value : 0, 0);
  }

  return (
    <NumberContext.Consumer>
      {({number}) => (
        <TotalsLineContainer>
          <TotalsNumbers>
            <p>{number.currency.format(totalOf(props.list, "done"))}</p>
            <p>{number.percent.format((totalOf(props.list, "done") / totalOf(props.list, "all")) || 0)}</p>
            <p>{number.currency.format(totalOf(props.list, "all"))}</p>
          </TotalsNumbers>
        </TotalsLineContainer>
      )}
    </NumberContext.Consumer>
  );
}

interface Props {
  list: TransactionInterface[],
}
