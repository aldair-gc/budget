import { TransactionInterface } from "../interfaces";
import { TotalsContainer, CurrentBalance, TotalsEstimation, LineGraph, TotalsLine, TotalsNumbers } from "./style";
import { brl } from "../currency";

export default function Totals(props: Props) {

  function totalOf(list: TransactionInterface[], type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? +item.value : 0, 0);
  }

  function percentageDone(list: TransactionInterface[], type: "income" | "expenditure"):number {
    return Math.floor((totalOf(list, type, "done") * 100) / totalOf(list, type, "all"));
  }

  function result():number {
    return totalOf((props.lists.incomeList.concat(props.lists.expenditureList)), "income", "all")
    - totalOf(props.lists.incomeList.concat(props.lists.expenditureList), "expenditure", "all");
  }

  return (
    <TotalsContainer>
      <div>
        <TotalsLine>
          <TotalsNumbers>
            <p>{brl.format(totalOf(props.lists.incomeList, "income", "done"))}</p>
            <p>{Math.round(((totalOf(props.lists.incomeList, "income", "done") * 100) / totalOf(props.lists.incomeList, "income", "all")) || 0) + "%"}</p>
            <p>{brl.format(totalOf(props.lists.incomeList, "income", "all"))}</p>
          </TotalsNumbers>
          <LineGraph style={{ width: `${percentageDone(props.lists.incomeList, "income")}%`, background: "#bdc" }} />
        </TotalsLine>

        <TotalsLine>
          <TotalsNumbers>
            <p>{brl.format(totalOf(props.lists.expenditureList, "expenditure", "done"))}</p>
            <p>{Math.round(((totalOf(props.lists.expenditureList, "expenditure", "done") * 100) / totalOf(props.lists.expenditureList, "expenditure", "all")) || 0) + "%"}</p>
            <p>{brl.format(totalOf(props.lists.expenditureList, "expenditure", "all"))}</p>
          </TotalsNumbers>
          <LineGraph style={{ width: `${percentageDone(props.lists.expenditureList, "expenditure")}%`, background: "#dbc" }} />
        </TotalsLine>
      </div>

      <div>
        <TotalsEstimation>
          <h3>Month Estimation</h3><h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>{brl.format(result())}</h2>
        </TotalsEstimation>

        <CurrentBalance>
          <h3>Current Balance</h3>
          <h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>
            {brl.format((totalOf(props.lists.incomeList, "income", "done") - totalOf(props.lists.expenditureList, "expenditure", "done")))}
          </h2>
        </CurrentBalance>
      </div>

    </TotalsContainer>
  );
}

interface Props {
  lists: {incomeList: TransactionInterface[], expenditureList: TransactionInterface[]},
}
