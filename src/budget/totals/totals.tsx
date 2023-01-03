import { TransactionInterface } from "../interfaces";
import { TotalsContainer, TotalsEstimation } from "./style";
import { LanguageContext, NumberContext } from "../../app/App";

export default function Totals(props: Props) {
  function totalOf(list: TransactionInterface[], status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => (sum += item.status === status || status === "all" ? +item.value : 0), 0);
  }

  function totalResult(status: "pending" | "done" | "all"): number {
    const totalIncome = totalOf(props.incomeList, status);
    const totalExpenditure = totalOf(props.expenditureList, status);
    return totalIncome - totalExpenditure;
  }

  return (
    <LanguageContext.Consumer>
      {({ file }) => (
        <NumberContext.Consumer>
          {({ number }) => (
            <TotalsContainer>
              <TotalsEstimation result={totalResult("done") + props.lastMonthBalance.value > 0}>
                <h3>{file.totals.balance}</h3>
                <h2>{props.lastMonthBalance.loading ? "-" : number.currency.format(totalResult("done") + props.lastMonthBalance.value)}</h2>
                <i>{file.totals.balanceHelp}</i>
              </TotalsEstimation>

              <TotalsEstimation result={totalResult("all") > 0}>
                <h3>{file.totals.estimation}</h3>
                <h2>{number.currency.format(totalResult("all"))}</h2>
                <i>{file.totals.estimationHelp}</i>
              </TotalsEstimation>

              <TotalsEstimation result={props.lastMonthBalance.value + totalResult("all") > 0}>
                <h3>{file.totals.lastMonth}</h3>
                <h2>{props.lastMonthBalance.loading ? "-" : number.currency.format(props.lastMonthBalance.value + totalResult("all"))}</h2>
                <i>{file.totals.lastMonthHelp}</i>
              </TotalsEstimation>
            </TotalsContainer>
          )}
        </NumberContext.Consumer>
      )}
    </LanguageContext.Consumer>
  );
}

interface Props {
  incomeList: TransactionInterface[];
  expenditureList: TransactionInterface[];
  lastMonthBalance: { loading: boolean; value: number };
}
