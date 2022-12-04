import { TransactionInterface } from "../interfaces";
import { TotalsContainer, TotalsEstimation, LineGraph, TotalsLine, TotalsNumbers } from "./style";
import { brl, brlPercent } from "../currency";
import { FaMoneyCheckAlt, FaWallet } from "react-icons/fa";

export default function Totals(props: Props) {

  function totalOf(list: TransactionInterface[], type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? +item.value : 0, 0);
  }

  function percentageDone(list: TransactionInterface[], type: "income" | "expenditure"):number {
    return Math.round((totalOf(list, type, "done") * 100) / totalOf(list, type, "all"));
  }

  function result():number {
    return totalOf((props.incomeList.concat(props.expenditureList)), "income", "all")
    - totalOf(props.incomeList.concat(props.expenditureList), "expenditure", "all");
  }

  return (
    <TotalsContainer>
      <div>
        <TotalsLine>
          <TotalsNumbers>
            <p>{brl.format(totalOf(props.incomeList, "income", "done"))}</p>
            <p>{brlPercent.format((totalOf(props.incomeList, "income", "done") / totalOf(props.incomeList, "income", "all")) || 0)}</p>
            <p>{brl.format(totalOf(props.incomeList, "income", "all"))}</p>
          </TotalsNumbers>
          <LineGraph style={{ width: `${percentageDone(props.incomeList, "income")}%`, background: "#add" }} />
        </TotalsLine>

        <TotalsLine>
          <TotalsNumbers>
            <p>{brl.format(totalOf(props.expenditureList, "expenditure", "done"))}</p>
            <p>{brlPercent.format(totalOf(props.expenditureList, "expenditure", "done") / totalOf(props.expenditureList, "expenditure", "all") || 0)}</p>
            <p>{brl.format(totalOf(props.expenditureList, "expenditure", "all"))}</p>
          </TotalsNumbers>
          <LineGraph style={{ width: `${percentageDone(props.expenditureList, "expenditure")}%`, background: "#adf" }} />
        </TotalsLine>
      </div>

      <div>
        <TotalsEstimation>
          <FaMoneyCheckAlt/>
          <h3>Last Month Balance</h3>
          <h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>{brl.format(props.lastMonthBalance)}</h2>
        </TotalsEstimation>

        <TotalsEstimation>
          <FaMoneyCheckAlt/>
          <h3>Month Estimation</h3>
          <h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>{brl.format(result())}</h2>
        </TotalsEstimation>

        <TotalsEstimation>
          <FaWallet/>
          <h3>Current Balance</h3>
          <h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>
            {brl.format(totalOf(props.incomeList, "income", "done") - totalOf(props.expenditureList, "expenditure", "done") + props.lastMonthBalance)}
          </h2>
        </TotalsEstimation>
      </div>

    </TotalsContainer>
  );
}

interface Props {
  incomeList: TransactionInterface[],
  expenditureList: TransactionInterface[],
  lastMonthBalance: number,
}
