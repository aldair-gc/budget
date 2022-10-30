import { BudgetItemProtocol } from "./budget-item-protocol";
import { BudgetListProtocol } from "./budget-list-protocol";

export interface BudgetProtocol {
    income: BudgetListProtocol;
    expenditure: BudgetListProtocol;
    itensPending(): BudgetItemProtocol[];
    itensDone(): BudgetItemProtocol[];
    result(): number;
}
