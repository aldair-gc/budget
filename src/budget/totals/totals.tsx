import { TransactionInterface } from "../interfaces";
import { TotalsContainer, TotalsEstimation } from "./style";
import { LanguageContext, NumberContext } from "../../app/App";

export default function Totals(props: Props) {

  function totalOf(list: TransactionInterface[], type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? +item.value : 0, 0);
  }

  function result():number {
    return totalOf((props.incomeList.concat(props.expenditureList)), "income", "all")
    - totalOf(props.incomeList.concat(props.expenditureList), "expenditure", "all");
  }

  return (
    <LanguageContext.Consumer>
      {({file}) => (
        <NumberContext.Consumer>
          {({number}) => (
            <TotalsContainer>
              <TotalsEstimation result={props.lastMonthBalance > 0}>
                <h3>{file.totals.lastMonth}</h3>
                <h2>{number.currency.format(props.lastMonthBalance)}</h2>
                <i>{file.totals.lastMonthHelp}</i>
              </TotalsEstimation>

              <TotalsEstimation result={result() > 0}>
                <h3>{file.totals.estimation}</h3>
                <h2>{number.currency.format(result())}</h2>
                <i>{file.totals.estimationHelp}</i>
              </TotalsEstimation>

              <TotalsEstimation result={totalOf(props.incomeList, "income", "done") - totalOf(props.expenditureList, "expenditure", "done") + props.lastMonthBalance > 0}>
                <h3>{file.totals.balance}</h3>
                <h2>
                  {number.currency.format(totalOf(props.incomeList, "income", "done") - totalOf(props.expenditureList, "expenditure", "done") + props.lastMonthBalance)}
                </h2>
                <i>{file.totals.balanceHelp}</i>
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
