import { BudgetItemProtocol } from "../protocols/budget-item-protocol";
import { BudgetListProtocol } from "../protocols/budget-list-protocol";
import { BudgetProtocol } from "../protocols/budget-protocol";

export class Budget implements BudgetProtocol {
  constructor(public income: BudgetListProtocol, public expenditure: BudgetListProtocol) {}

  itensPending(): BudgetItemProtocol[] {
    const itensPending: BudgetItemProtocol[] = [];
    this.income.list.map(item => {
      if (item.status === "pending") itensPending.push(item);
    });
    this.expenditure.list.map(item => {
      if (item.status === "pending") itensPending.push(item);
    });
    return itensPending;
  }

  itensDone(): BudgetItemProtocol[] {
    const itensDone: BudgetItemProtocol[] = [];
    this.income.list.map(item => {
      if (item.status === "done") itensDone.push(item);
    });
    this.expenditure.list.map(item => {
      if (item.status === "done") itensDone.push(item);
    });
    return itensDone;
  }
  result(): number {
    return this.expenditure.getTotal() - this.income.getTotal();
  }

}
