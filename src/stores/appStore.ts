import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/authTypes';
import type { ExpenseSummary, ExpenseDetail, ExpenseCategory } from '../types/expenseTypes';
interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}
interface ExpenseState {
    categories: ExpenseCategory[];
    summary: ExpenseSummary[];
    details: Record<string, ExpenseDetail[]>; // key: `${year}-${month}-${categoryId}`
    currentMonth: number;
    currentYear: number;
    setCategories: (categories: ExpenseCategory[]) => void;
    setSummary: (summary: ExpenseSummary[]) => void;
    setDetails: (key: string, details: ExpenseDetail[]) => void;
    setCurrentDate: (year: number, month: number) => void;
    addExpense: (expense: ExpenseDetail) => void;    removeExpense: (expenseId: number) => void;
}
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: (user: User, token: string) => {
                localStorage.setItem('token', token);
                set({ user, token, isAuthenticated: true });
            },
            logout: () => {
                localStorage.removeItem('token');
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-store',
        }
    )
);
export const useExpenseStore = create<ExpenseState>((set, get) => ({
    categories: [],
    summary: [],
    details: {},
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
    setCategories: (categories) => set({ categories }),
    setSummary: (summary) => set({ summary }),
    setDetails: (key, details) => set((state) => ({
        details: { ...state.details, [key]: details }
    })),
    setCurrentDate: (year, month) => set({ currentYear: year, currentMonth: month }),
    addExpense: (expense) => {
        const state = get();
        const key = `${state.currentYear}-${state.currentMonth}-${expense.categoryId}`;
        const currentDetails = state.details[key] || [];
        set((state) => ({
            details: {
                ...state.details,
                [key]: [...currentDetails, expense]
            }
        }));
        const summary = state.summary.map(item => 
            item.categoryId === expense.categoryId 
                ? { ...item, totalAmount: (item.totalAmount || 0) + expense.amount, count: (item.count || 0) + 1 }
                : item
        );
        set({ summary });
    },
    removeExpense: (expenseId) => {
        const state = get();
        const updatedDetails = { ...state.details };
        let removedExpense: ExpenseDetail | null = null;
        Object.keys(updatedDetails).forEach(key => {
            const index = updatedDetails[key].findIndex(exp => exp.id === expenseId);
            if (index !== -1) {
                removedExpense = updatedDetails[key][index];
                updatedDetails[key] = updatedDetails[key].filter(exp => exp.id !== expenseId);
            }
        });
          if (removedExpense) {            // Update summary
            const summary = state.summary.map(item => 
                item.categoryId === removedExpense!.categoryId 
                    ? { ...item, totalAmount: (item.totalAmount || 0) - removedExpense!.amount, count: Math.max((item.count || 0) - 1, 0) }
                    : item
            );
            set({ details: updatedDetails, summary });
        }
    },
}));
