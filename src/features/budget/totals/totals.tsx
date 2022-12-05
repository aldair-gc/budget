import { TransactionInterface } from "../interfaces";
import { TotalsContainer, TotalsEstimation } from "./style";
import { brl } from "../currency";
import { FaMoneyCheckAlt, FaWallet } from "react-icons/fa";

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
      <TotalsEstimation>
        <FaMoneyCheckAlt/>
        <h3>Last Month</h3>
        <h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>{brl.format(props.lastMonthBalance)}</h2>
      </TotalsEstimation>

      <TotalsEstimation>
        <FaMoneyCheckAlt/>
        <h3>Estimation</h3>
        <h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>{brl.format(result())}</h2>
      </TotalsEstimation>

      <TotalsEstimation>
        <FaWallet/>
        <h3>Balance</h3>
        <h2 style={{ color: `${result() > 0 ? "#34a" : "#a34"}` }}>
          {brl.format(totalOf(props.incomeList, "income", "done") - totalOf(props.expenditureList, "expenditure", "done") + props.lastMonthBalance)}
        </h2>
      </TotalsEstimation>
    </TotalsContainer>
  );
}

interface Props {
  incomeList: TransactionInterface[],
  expenditureList: TransactionInterface[],
  lastMonthBalance: number,
}
