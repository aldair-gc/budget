export interface Transaction {
  id?: number;
  type: "income" | "expenditure";
  description: string;
  value: number;
  expiration_day: number;
  status: "pending" | "done";
  year: number;
  month: number;
  repeat: string;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
}

export interface YearMonthInterface {
  year: number,
  month: number,
}

export interface SetYearMonthInterface {
  setYearMonth: (yearMonth: YearMonthInterface) => void;
}

