import axios from "axios";
import type { LoginRequest, RegisterRequest } from "@/types/authTypes";

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

export async function getExpensesByCategory(
    token: string,
    year: number,
    month: number,
    categoryId: number
) {
    const url = `${BACKEND_URL}/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('No se pudo obtener el detalle de gastos');
    }

    return response.json();
}
