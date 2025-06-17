
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
