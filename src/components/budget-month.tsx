import { useState } from "react";
import BudgetList from "./budget-list";
import { BudgetItemProtocol } from "./protocols/budget-item-protocol";

export default function BudgetMonth(props: {year: number, month: number}) {
  const [incomeList, setIncomeList] = useState([{id: "0", description: "Test", value:0, status: "pending"}]);
  const [expenditureList, setExpenditureList] = useState([{id: "0", description: "Test", value:0, status: "done"}]);

  // function itensPending(): BudgetItemProtocol[] {
  //   const itensPending: BudgetItemProtocol[] = [];
  //   incomeList.map((item: BudgetItemProtocol) => {
  //     if (item.status === "pending") itensPending.push(item);
  //   });
  //   expenditureList.map((item: BudgetItemProtocol) => {
  //     if (item.status === "pending") itensPending.push(item);
  //   });
  //   return itensPending;
  // }

  // function itensDone(): BudgetItemProtocol[] {
  //   const itensDone: BudgetItemProtocol[] = [];
  //   incomeList.map((item: BudgetItemProtocol) => {
  //     if (item.status === "done") itensDone.push(item);
  //   });
  //   expenditureList.map((item: BudgetItemProtocol) => {
  //     if (item.status === "done") itensDone.push(item);
  //   });
  //   return itensDone;
  // }

  // function result(): number {
  //   return expenditureList.getTotal() - incomeList.getTotal();
  // }

  return (
    <div className="budget-month">
      <BudgetList list={incomeList} />
      <BudgetList list={expenditureList} />
    </div>
  );
}
