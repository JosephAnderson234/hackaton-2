import axios from "axios";
import type { LoginRequest, RegisterRequest, LoginResponse } from "../types/authTypes";
import type { 
    ExpenseCategory, 
    ExpenseSummary, 
    ExpenseDetail, 
    CreateExpenseRequest,
    CreateExpenseWithCategoryRequest
} from "../types/expenseTypes";
const BACKEND_URL = import.meta.env.DEV ? "/api" : "http://198.211.105.95:8080";
const apiClient = axios.create({
    baseURL: BACKEND_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url?.includes('/authentication/')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
const retryRequest = async (
    requestFn: () => Promise<any>, 
    maxRetries: number = 2, 
    delay: number = 1000
): Promise<any> => {
    let lastError: any;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await requestFn();
        } catch (error: any) {
            lastError = error;
            if ((error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') && attempt < maxRetries) {
                console.log(`Request failed, retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
            } else {
                break;
            }
        }
    }
      throw lastError;
};
export const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    return retryRequest(async () => {
        try {
            console.log('Sending login request:', { email: loginRequest.email, passwd: '[HIDDEN]' });
            const response = await apiClient.post('/authentication/login', loginRequest);
            console.log('Login response received:', response.data);            
            return response.data;
        } catch (error: any) {
            console.error("Error during login:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            }
            throw error;
        }
    });
};
export const register = async (registerRequest: RegisterRequest) => {
    return retryRequest(async () => {
        try {
            console.log('Sending register request:', { email: registerRequest.email, passwd: '[HIDDEN]' });
            const response = await apiClient.post('/authentication/register', registerRequest);
            console.log('Register response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error during registration:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            }
            throw error;
        }
    });
};
export const getExpensesSummary = async (year?: number, month?: number): Promise<ExpenseSummary[]> => {
    try {
        const params = new URLSearchParams();
        if (year) params.append('year', year.toString());
        if (month) params.append('month', month.toString());
          console.log('=== REQUESTING EXPENSES SUMMARY ===');
        console.log('Year:', year);
        console.log('Month:', month);
        console.log('URL params:', params.toString());
        console.log('=====================================');
        const response = await apiClient.get(`/expenses_summary?${params.toString()}`);
          console.log('=== EXPENSES SUMMARY RESPONSE ===');
        console.log('Raw response length:', response.data?.length);
        console.log('=====================================');        if (Array.isArray(response.data)) {
            const filteredData = response.data.filter((item: any) => {
                const itemYear = item.year;                const itemMonth = item.month;
                if (year && month) {
                    return itemYear === year && itemMonth === month;
                } else if (year) {
                    return itemYear === year;
                } else if (month) {
                    return itemMonth === month;
                }
                return true;
            });
            console.log('Filtered data length:', filteredData.length);
            if (filteredData.length === 0) {
                console.log('No expenses found for the selected period');
                return [];            }
            const categoryMap = new Map<number, {
                categoryId: number;
                categoryName: string;
                totalAmount: number;
                count: number;
            }>();
            filteredData.forEach((item: any) => {
                const categoryId = item.expenseCategory?.id;
                const categoryName = item.expenseCategory?.name;
                const amount = item.amount || 0;
                if (categoryId && categoryName) {
                    if (categoryMap.has(categoryId)) {
                        const existing = categoryMap.get(categoryId)!;
                        existing.totalAmount += amount;
                        existing.count += 1;
                    } else {
                        categoryMap.set(categoryId, {
                            categoryId,
                            categoryName,
                            totalAmount: amount,
                            count: 1
                        });
                    }
                }
            });
              const transformedData = Array.from(categoryMap.values());
            console.log('Transformed data length:', transformedData.length);
            console.log('=== END EXPENSES SUMMARY ===');
            return transformedData;
        }
        console.log('=== END EXPENSES SUMMARY ===');
        return [];
    } catch (error) {
        console.error("Error fetching expenses summary:", error);
        throw error;
    }
};
export const getExpenseDetails = async (year: number, month: number, categoryId: number): Promise<ExpenseDetail[]> => {
    try {
        const response = await apiClient.get('/expenses/detail', {
            params: { year, month, categoryId }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching expense details:", error);
        throw error;
    }
};
export const createExpense = async (expense: CreateExpenseRequest | CreateExpenseWithCategoryRequest): Promise<ExpenseDetail> => {
    try {        console.log('=== CREATING EXPENSE ===');
        console.log('Request payload:', expense);
        console.log('Request payload type:', typeof expense);
        console.log('Amount type:', typeof expense.amount);
        if ('categoryId' in expense) {
            console.log('CategoryId type:', typeof expense.categoryId);
        } else if ('category' in expense) {
            console.log('Category object:', expense.category);
        }
        console.log('Date:', expense.date);
        console.log('========================');
        const response = await apiClient.post('/expenses', expense);
        return response.data;    } catch (error: any) {
        console.error("Error creating expense:", error);
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
            if (error.response.data?.errors) {
                console.error("Validation errors:", error.response.data.errors);
                error.response.data.errors.forEach((validationError: any, index: number) => {
                    console.error(`Validation error ${index + 1}:`, validationError);
                    if (validationError.field) {
                        console.error(`  Field: ${validationError.field}`);
                    }
                    if (validationError.code) {
                        console.error(`  Code: ${validationError.code}`);
                    }
                    if (validationError.defaultMessage) {
                        console.error(`  Message: ${validationError.defaultMessage}`);
                    }
                    if (validationError.rejectedValue !== undefined) {
                        console.error(`  Rejected value: ${validationError.rejectedValue}`);
                    }
                });
            }
            console.error("Response headers:", error.response.headers);
        }
        throw error;
    }
};
export const deleteExpense = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`/expenses/${id}`);
    } catch (error) {
        console.error("Error deleting expense:", error);
        throw error;
    }
};
export const getExpenseCategories = async (): Promise<ExpenseCategory[]> => {
    try {
        const response = await apiClient.get('/expenses_category');
        return response.data;
    } catch (error) {
        console.error("Error fetching expense categories:", error);
        throw error;    }
};
