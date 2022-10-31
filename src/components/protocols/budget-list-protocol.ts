import { BudgetItemProtocol } from "./budget-item-protocol";

export interface BudgetListProtocol {
  id: string;
  list: BudgetItemProtocol[];
  addItem(item: BudgetItemProtocol): void;
  removeItem(item: BudgetItemProtocol): void;
  getTotal(): number;
  getTotalPending(): number;
  getTotalDone(): number;
}
