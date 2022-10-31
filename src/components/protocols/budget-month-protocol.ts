import { BudgetItemProtocol } from "./budget-item-protocol";
import { BudgetListProtocol } from "./budget-list-protocol";

export interface BudgetMonthProtocol {
  id: number;
  income: BudgetListProtocol;
  expenditure: BudgetListProtocol;
  itensPending(): BudgetItemProtocol[];
  itensDone(): BudgetItemProtocol[];
  result(): number;
}
