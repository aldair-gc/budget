import { TransactionInterface } from "../interfaces";
import { TotalsContainer, TotalsEstimation } from "./style";
import { LanguageContext, NumberContext } from "../../app/App";

export default function Totals(props: Props) {

  function totalOf(list: TransactionInterface[], status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => sum += item.status === status || status === "all" ? +item.value : 0, 0);
  }

  function result(status: "pending" | "done" | "all"):number {
    const totalIncome = totalOf(props.incomeList, status);
    const totalExpenditure = totalOf(props.expenditureList, status);
    return totalIncome - totalExpenditure;
  }

  return (
    <LanguageContext.Consumer>
      {({file}) => (
        <NumberContext.Consumer>
          {({number}) => (
            <TotalsContainer>

              <TotalsEstimation result={result("done") + props.lastMonthBalance > 0}>
                <h3>{file.totals.balance}</h3>
                <h2>{number.currency.format(result("done") + props.lastMonthBalance)}</h2>
                <i>{file.totals.balanceHelp}</i>
              </TotalsEstimation>

              <TotalsEstimation result={result("all") > 0}>
                <h3>{file.totals.estimation}</h3>
                <h2>{number.currency.format(result("all"))}</h2>
                <i>{file.totals.estimationHelp}</i>
              </TotalsEstimation>

              <TotalsEstimation result={props.lastMonthBalance + result("all") > 0}>
                <h3>{file.totals.lastMonth}</h3>
                <h2>{number.currency.format(props.lastMonthBalance + result("all"))}</h2>
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
  incomeList: TransactionInterface[],
  expenditureList: TransactionInterface[],
  lastMonthBalance: number,
}
