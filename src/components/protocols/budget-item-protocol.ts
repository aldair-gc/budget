export interface BudgetItemProtocol {
  id: string;
  description: string;
  value: number;
  status: "pending" | "done";
}
