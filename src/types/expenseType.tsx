
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

export interface ExpenseGeneralData {
  id: number;
  expenseCategory: {
    id: number;
    name: string;
  }
  year: number;
  month: number;
  amount: number;
}

export interface CurrentExpenseData {
  month: number;
  year: number;
  amount: number;
}

export interface ExpenseSummerized{
  idCategory: number;
  nameCategory: string;
  total: number;
}

export interface CreateExpenese {
  date: string; // 2025-06-10
  amount: number;
  category: {
    id: number;
  };
}