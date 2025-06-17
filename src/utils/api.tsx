import axios from "axios";
import type { LoginRequest, RegisterRequest, LoginResponse } from "../types/authTypes";
import type { 
    ExpenseCategory, 
    ExpenseSummary, 
    ExpenseDetail, 
    CreateExpenseRequest,
    Goal,
    CreateGoalRequest,
    UpdateGoalRequest
} from "../types/expenseTypes";

// Use proxy in development, direct URL in production
const BACKEND_URL = import.meta.env.DEV ? "/api" : "http://198.211.105.95:8080";

// Create axios instance with interceptors
const apiClient = axios.create({
    baseURL: BACKEND_URL,
    timeout: 30000, // Increased timeout to 30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests (but not for authentication endpoints)
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // Don't add token for authentication endpoints
    if (token && !config.url?.includes('/authentication/')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Helper function to retry requests on timeout
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
            
            // Only retry on timeout or network errors
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

// Authentication
export const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    return retryRequest(async () => {
        try {
            console.log('Sending login request:', { email: loginRequest.email, passwd: '[HIDDEN]' });
            const response = await apiClient.post('/authentication/login', loginRequest);
            
            console.log('Login response received:', response.data);
            
            // Return the response data as-is since we now know the structure
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

// Expenses
export const getExpensesSummary = async (year?: number, month?: number): Promise<ExpenseSummary[]> => {
    try {
        const params = new URLSearchParams();
        if (year) params.append('year', year.toString());
        if (month) params.append('month', month.toString());
        
        const response = await apiClient.get(`/expenses_summary?${params.toString()}`);
        return response.data;
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

export const createExpense = async (expense: CreateExpenseRequest): Promise<ExpenseDetail> => {
    try {
        const response = await apiClient.post('/expenses', expense);
        return response.data;
    } catch (error) {
        console.error("Error creating expense:", error);
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

// Categories
export const getExpenseCategories = async (): Promise<ExpenseCategory[]> => {
    try {
        const response = await apiClient.get('/expenses_category');
        return response.data;
    } catch (error) {
        console.error("Error fetching expense categories:", error);
        throw error;
    }
};

// Goals
export const getGoals = async (): Promise<Goal[]> => {
    try {
        const response = await apiClient.get('/goals');
        return response.data;
    } catch (error) {
        console.error("Error fetching goals:", error);
        throw error;
    }
};

export const createGoal = async (goal: CreateGoalRequest): Promise<Goal> => {
    try {
        const response = await apiClient.post('/goals', goal);
        return response.data;
    } catch (error) {
        console.error("Error creating goal:", error);
        throw error;
    }
};

export const updateGoal = async (id: number, goal: UpdateGoalRequest): Promise<Goal> => {
    try {
        const response = await apiClient.patch(`/goals/${id}`, goal);
        return response.data;
    } catch (error) {
        console.error("Error updating goal:", error);
        throw error;
    }
};