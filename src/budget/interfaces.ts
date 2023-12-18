export interface TransactionInterface {
  id: number;
  type: "income" | "expenditure";
  description: string;
  value: string;
  expiration_day: number;
  status: "pending" | "done";
  year: number;
  month: number;
  repeat: string;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
}

export interface ApiNewTransactionInterface {
  type: "income" | "expenditure";
  description: string;
  value: number;
  expiration_day: number;
  status: "pending" | "done";
  year: number;
  month: number;
  repeat: string;
}

export interface ApiUpdateTransactionInterface {
  type?: "income" | "expenditure";
  description?: string;
  value?: number;
  expiration_day?: number;
  status?: "pending" | "done";
  year?: number;
  month?: number;
  repeat?: string;
}

export interface SimpleTransaction {
  id: number;
  type?: "income" | "expenditure";
  description: string;
  value: string;
  expiration_day: number;
  status?: "pending" | "done";
  year?: number;
  month?: number;
  repeat?: string;
}

export interface YearMonthInterface {
  year: number;
  month: number;
}

export interface SetYearMonthInterface {
  setYearMonth: (yearMonth: YearMonthInterface) => void;
}

export interface SettersInterface {
  setType: (type: "income" | "expenditure") => void;
  setDescription: (description: string) => void;
  setValue: (value: string) => void;
  setExpirationDay: (expirationDay: number) => void;
  setStatus: (repeat: "done" | "pending") => void;
  setYear: (repeat: number) => void;
  setMonth: (repeat: number) => void;
  setRepeat: (repeat: string) => void;
}

export interface EditOptionsInterface {
  id: number;
  updateFutureOnes: boolean;
  openEditor: boolean;
}

export interface SetEditOptionsInterface {
  setId: (id: number) => void;
  setUpdateFutureOnes: (updateFutureOnes: boolean) => void;
  setOpenEditor: (openEditor: boolean) => void;
}
