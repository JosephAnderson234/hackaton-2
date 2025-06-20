import axios from "axios";
import type { LoginRequest, RegisterRequest } from "@/types/authTypes";
import type { CreateExpenese } from "@/types/expenseType";
const BACKEND_URL = import.meta.env.VITE_API_BACKEND || "http://localhost:3000";


export const login = async (loginRequest: LoginRequest) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/authentication/login`, loginRequest);
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

export const register = async (signupRequest: RegisterRequest) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/authentication/register`, signupRequest);
        return response;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
}

export const getAllExpenses = async (token: string) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/expenses_summary`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
}

export async function getExpensesByCategory(
    token: string,
    year: number,
    month: number,
    categoryId: number
) {
    try {
        const response = await axios.get(`${BACKEND_URL}/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching expense details:", error);
        throw error;
    }
}

export async function getExpenseCategories(token: string) {
    try {
        const response = await axios.get(`${BACKEND_URL}/expenses_category`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching expense categories:", error);
        throw error;
    }
}

export async function createExpense(token: string, expenseData: CreateExpenese) {
    try {
        const response = await axios.post(`${BACKEND_URL}/expenses`, expenseData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating expense:", error);
        throw error;
    }
}

export async function deleteExpenseById(token: string, expenseId: number) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/expenses/${expenseId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting expense:", error);
        throw error;
    }
}