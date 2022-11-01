import { BudgetItemProtocol } from "./budget-item-protocol";
import { BudgetListProtocol } from "./budget-list-protocol";

export interface BudgetMonthProtocol {
  income: BudgetListProtocol;
  expenditure: BudgetListProtocol;
}
