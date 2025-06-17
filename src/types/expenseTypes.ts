export interface ExpenseCategory {
    id: number;
    name: string;
    description?: string;
}

export interface ExpenseSummary {
    categoryId: number;
    categoryName?: string; // Made optional since backend might not provide it
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

export interface Goal {
    id: number;
    month: number;
    year: number;
    targetAmount: number;
    currentAmount?: number;
    description?: string;
}

export interface CreateGoalRequest {
    month: number;
    year: number;
    targetAmount: number;
    description?: string;
}

export interface UpdateGoalRequest {
    targetAmount?: number;
    description?: string;
}
