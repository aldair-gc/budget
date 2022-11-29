import { TransactionInterface } from "../interfaces";
import { TotalsContainer, CurrentBalance, TotalsEstimation, LineGraph, TotalsLine, TotalsNumbers } from "./style";

export default function Totals(props: Props) {

  function totalOf(list: TransactionInterface[], type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? item.value : 0, 0);
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
            <p>$ {totalOf(props.lists.incomeList, "income", "done").toFixed(2)}</p>
            <p>{Math.floor(((totalOf(props.lists.incomeList, "income", "done") * 100) / totalOf(props.lists.incomeList, "income", "all")) || 0) + "%"}</p>
            <p>$ {totalOf(props.lists.incomeList, "income", "all").toFixed(2)}</p>
          </TotalsNumbers>
          <LineGraph style={{ width: `${percentageDone(props.lists.incomeList, "income")}%`, background: "#bdc" }} />
        </TotalsLine>

        <TotalsLine>
          <TotalsNumbers>
            <p>$ {totalOf(props.lists.expenditureList, "expenditure", "done").toFixed(2)}</p>
            <p>{Math.floor(((totalOf(props.lists.expenditureList, "expenditure", "done") * 100) / totalOf(props.lists.expenditureList, "expenditure", "all")) || 0) + "%"}</p>
            <p>$ {totalOf(props.lists.expenditureList, "expenditure", "all").toFixed(2)}</p>
          </TotalsNumbers>
          <LineGraph style={{ width: `${percentageDone(props.lists.expenditureList, "expenditure")}%`, background: "#dbc" }} />
        </TotalsLine>
      </div>

      <div>
        <TotalsEstimation>
          <h3>Month Estimation</h3><h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>$ {result().toFixed(2)}</h2>
        </TotalsEstimation>

        <CurrentBalance>
          <h3>Current Balance</h3>
          <h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>
            $ {(totalOf(props.lists.incomeList, "income", "done") - totalOf(props.lists.expenditureList, "expenditure", "done")).toFixed(2)}
          </h2>
        </CurrentBalance>
      </div>

    </TotalsContainer>
  );
}

interface Props {
  lists: {incomeList: TransactionInterface[], expenditureList: TransactionInterface[]},
}
