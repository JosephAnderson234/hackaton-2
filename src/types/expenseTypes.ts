export interface ExpenseCategory {
    id: number;
    name: string;
    description?: string;
}

export interface ExpenseSummary {
    categoryId: number;
    categoryName: string;
    totalAmount: number;
    count: number;
}

export interface ExpenseDetail {
    id: number;
    description: string;
    amount: number;
    date: string;
    categoryId: number;
    categoryName: string;
}

export interface CreateExpenseRequest {
    description: string;
    amount: number;
    date: string;
    categoryId: number;
}

export interface CreateExpenseWithCategoryRequest {
    description: string;
    amount: number;
    date: string;
    category: ExpenseCategory;
}


