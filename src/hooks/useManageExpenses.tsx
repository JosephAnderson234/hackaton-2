import type { CreateExpenese } from "@/types/expenseType";
import { createExpense, deleteExpenseById } from "@utils/api";
import { useState } from "react";
import useAuth from "./useAuthContext";

export const useAddExpense = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { session } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const addExpense = async (expense: CreateExpenese) => {
        setIsLoading(true);
        setError(null);

        if (!session) {
            throw new Error("No session found. Please log in.");
        }

        try {
            const response = await createExpense(session, expense);
            return response.data;
        } catch (err) {
            console.error("Error creating expense:", err);
            setError("Error al crear el gasto. Por favor, inténtalo de nuevo.");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        error,
        addExpense,
    };
}

export const useDeleteExpense = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { session } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const deleteExpense = async (expenseId: number) => {
        setIsLoading(true);
        setError(null);

        if (!session) {
            throw new Error("No session found. Please log in.");
        }

        try {
            await deleteExpenseById(session, expenseId);
        } catch (err) {
            console.error("Error deleting expense:", err);
            setError("Error al eliminar el gasto. Por favor, inténtalo de nuevo.");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        error,
        deleteExpense,
    };
}