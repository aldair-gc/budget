import { useState } from "react";
import BudgetList from "./budget-list";
import { BudgetItemProtocol } from "./protocols/budget-item-protocol";
import { BudgetMonthProtocol } from "./protocols/budget-month-protocol";

export default function BudgetMonth(props: BudgetMonthProtocol) {
  const [incomeList, setIncomeList] = useState(props.income);
  const [expenditureList, setExpenditureList] = useState(props.expenditure);

  function itensPending(): BudgetItemProtocol[] {
    const itensPending: BudgetItemProtocol[] = [];
    incomeList.map(item => {
      if (item.status === "pending") itensPending.push(item);
    });
    expenditureList.map(item => {
      if (item.status === "pending") itensPending.push(item);
    });
    return itensPending;
  }

  function itensDone(): BudgetItemProtocol[] {
    const itensDone: BudgetItemProtocol[] = [];
    incomeList.map(item => {
      if (item.status === "done") itensDone.push(item);
    });
    expenditureList.map(item => {
      if (item.status === "done") itensDone.push(item);
    });
    return itensDone;
  }

  function result(): number {
    return expenditureList.getTotal() - incomeList.getTotal();
  }

  return (
    <div className="budget-month">
      <BudgetList id={incomeList.id} list={incomeList.list} />
      <BudgetList id={expenditureList.id} list={expenditureList.list} />
    </div>
  );
}
