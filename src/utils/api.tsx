import axios from "axios";
import type { LoginRequest, RegisterRequest } from "@/types/authTypes";

const BACKEND_URL = import.meta.env.VITE_API_BACKEND || "http://localhost:3000";

/* export const getPokePages = async (page: number, limit: number = 50) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/pokemon`, {
            params: {
                offset: (page - 1) * limit,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Pokemon pages:", error);
        throw error;
    }
} */


export const login = async (loginRequest: LoginRequest) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, loginRequest);
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

export const register = async (signupRequest: RegisterRequest) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/register`, signupRequest);
        return response;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
}