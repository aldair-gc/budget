import { Transaction } from "../interfaces";
import { TotalsContainer, CurrentBalance, TotalsEstimation, LineGraph, TotalsLine, TotalsNumbers } from "./style";

export default function Totals(props: Props) {

  function totalOf(type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return props.list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? item.value : 0, 0);
  }

  function percentageDone(type: "income" | "expenditure"):number {
    return Math.floor((totalOf(type, "done") * 100) / totalOf(type, "all"));
  }

  function result():number {
    return totalOf("income", "all") - totalOf("expenditure", "all");
  }

  // function totalPercent(type: "income" | "expenditure") {
  //   return { width: ((totalOf(type, "done") * 100) / totalOf(type, "all")) + "%" };
  // }

  return (
    <TotalsContainer>
      <div>
        <TotalsLine>
          <TotalsNumbers>
            <p>$ {totalOf("income", "done").toFixed(2)}</p>
            <p>{Math.floor(((totalOf("income", "done") * 100) / totalOf("income", "all")) || 0) + "%"}</p>
            <p>$ {totalOf("income", "all").toFixed(2)}</p>
          </TotalsNumbers>
          <LineGraph style={{ width: `${percentageDone("income")}%`, background: "#bdc" }} />
        </TotalsLine>

        <TotalsLine>
          <TotalsNumbers>
            <p>$ {totalOf("expenditure", "done").toFixed(2)}</p>
            <p>{Math.floor(((totalOf("expenditure", "done") * 100) / totalOf("expenditure", "all")) || 0) + "%"}</p>
            <p>$ {totalOf("expenditure", "all").toFixed(2)}</p>
          </TotalsNumbers>
          <LineGraph style={{ width: `${percentageDone("expenditure")}%`, background: "#dbc" }} />
        </TotalsLine>
      </div>

      <div>
        <TotalsEstimation>
          <h3>Month Estimation</h3><h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>$ {result().toFixed(2)}</h2>
        </TotalsEstimation>

        <CurrentBalance>
          <h3>Current Balance</h3><h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>$ {(totalOf("income", "done") - totalOf("expenditure", "done")).toFixed(2)}</h2>
        </CurrentBalance>
      </div>

    </TotalsContainer>
  );
}

interface Props {
  list: Transaction[],
}
