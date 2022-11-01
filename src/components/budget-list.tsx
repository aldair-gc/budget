import { useState } from "react";
import { BudgetItemProtocol } from "./protocols/budget-item-protocol";
import BudgetItem from "./budget-item";

export default function BudgetList(props: {list: BudgetItemProtocol[]}) {
  const [list, setList] = useState(props.list);

  function addItem(...itens: BudgetItemProtocol[]): void {
    itens.forEach(item => list.push(item));
  }

  function removeItem(item: BudgetItemProtocol): void {
    const index = list.indexOf(item);
    if (index !== -1) list.splice(index, 1);
  }

  function getTotal(): number {
    return list.reduce((sum, item) => sum += item.value, 0);
  }

  function getTotalPending(): number {
    return list.reduce((sum, item) => sum += item.status === "pending" ? item.value : 0, 0);
  }

  function getTotalDone(): number {
    return list.reduce((sum, item) => sum += item.status === "done" ? item.value : 0, 0);
  }

  return (
    <div className="budget-list">
      {list.map(item => <BudgetItem key={item.id} id={item.id} description={item.description} value={item.value} status={item.status} />)}
    </div>
  );
}
