import { BudgetItemProtocol } from "../protocols/budget-item-protocol";
import { BudgetListProtocol } from "../protocols/budget-list-protocol";

export class BudgetList implements BudgetListProtocol {
  list: BudgetItemProtocol[] = [];

  constructor(public readonly name: string) { }

  addItem(...itens: BudgetItemProtocol[]): void {
    itens.forEach(item => this.list.push(item));
  }

  removeItem(item: BudgetItemProtocol): void {
    const index = this.list.indexOf(item);
    if (index !== -1) this.list.splice(index, 1);
  }

  getTotal(): number {
    return this.list.reduce((sum, item) => sum += item.value, 0);
  }

  getTotalPending(): number {
    return this.list.reduce((sum, item) => sum += item.status === "pending" ? item.value : 0, 0);
  }

  getTotalDone(): number {
    return this.list.reduce((sum, item) => sum += item.status === "done" ? item.value : 0, 0);
  }
}
