import { TransactionInterface } from "../interfaces";
import { TotalsContainer, TotalsEstimation } from "./style";
import { brl } from "../currency";

export default function Totals(props: Props) {

  function totalOf(list: TransactionInterface[], type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? +item.value : 0, 0);
  }

  function result():number {
    return totalOf((props.incomeList.concat(props.expenditureList)), "income", "all")
    - totalOf(props.incomeList.concat(props.expenditureList), "expenditure", "all");
  }

  return (
    <TotalsContainer>
      <TotalsEstimation result={props.lastMonthBalance > 0}>
        <h3>Last Month</h3>
        <h2>{brl.format(props.lastMonthBalance)}</h2>
        <i>This is what was left from last month.</i>
      </TotalsEstimation>

      <TotalsEstimation result={result() > 0}>
        <h3>Estimation</h3>
        <h2>{brl.format(result())}</h2>
        <i>This is the resulting balance of this month. (INCOMES - EXPENDITURES) </i>
      </TotalsEstimation>

      <TotalsEstimation result={totalOf(props.incomeList, "income", "done") - totalOf(props.expenditureList, "expenditure", "done") + props.lastMonthBalance > 0}>
        <h3>Balance</h3>
        <h2>
          {brl.format(totalOf(props.incomeList, "income", "done") - totalOf(props.expenditureList, "expenditure", "done") + props.lastMonthBalance)}
        </h2>
        <i>This is the ammount of money you shoud have right now.</i>
      </TotalsEstimation>
    </TotalsContainer>
  );
}

interface Props {
  incomeList: TransactionInterface[],
  expenditureList: TransactionInterface[],
  lastMonthBalance: number,
}
