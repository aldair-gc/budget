export interface BudgetItemProtocol {
    description: string;
    value: number;
    status: "pending" | "done";
}
