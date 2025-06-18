
export interface Category {
  id: number;
  name: string;
}

export interface Expense {
  id: number;
  date: string;
  amount: number;
  category: Category;
}

export interface ExpenseSummary {
  id: number;
  expenseCategory: {
    id: number;
    name: string;
  }
  year: number;
  month: number;
  amount: number;
}