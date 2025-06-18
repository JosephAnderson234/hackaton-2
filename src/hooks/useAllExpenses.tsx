import type { ExpenseSummary } from "@/types/expenseType"
import { getAllExpenses } from "@utils/api"
import { useState } from "react"
import { useEffect } from "react"
import useAuth from "./useAuthContext"

const useAllExpenses = () => {
    const [gastos, setGastos] = useState<ExpenseSummary[]>([])
    const { session } = useAuth();
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=> {

        const fetchData = async () => {
            try {
                if (!session) {
                    throw new Error("No token found");
                }
                const response = await getAllExpenses(session);
                setGastos(response);
            } catch (err) {
                console.error("Error fetching expenses:", err);
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [])
    return {gastos, loading, error}
}

export default useAllExpenses;