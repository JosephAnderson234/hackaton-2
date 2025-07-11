import type { ExpenseGeneralData, Category, Expense, ExpenseSummerized } from "@/types/expenseType"
import { getAllExpenses, getExpenseCategories, getExpensesByCategory } from "@utils/api"
import useGeneralExpenseStore from "@utils/generalExpenseStore";
import useCurrentDataStore from "@utils/useCurrentData";
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import useAuth from "./useAuthContext"


export const useAllExpenses = () => {
    const { setGastos, gastos } = useGeneralExpenseStore();
    const [yearFilter, setYearFilter] = useState<number>(new Date().getFullYear())
    const [monthFilter, setMonthFilter] = useState<number>(new Date().getMonth() + 1) // Months are 0-indexed in JavaScript, so we add 1 to get the correct month number
    const [summerizedGastos, setSummarizedGastos] = useState<ExpenseSummerized[]>([])
    const { session } = useAuth();
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const { getCurrentData } = useCurrentDataStore();


    const filterGastos = (gastos: ExpenseGeneralData[]) => {
        return gastos.filter(gasto => {
            const yearMatch = yearFilter ? gasto.year === yearFilter : true;
            const monthMatch = monthFilter ? gasto.month === monthFilter : true;
            return yearMatch && monthMatch;
        });
    }

    const summarizeGastos = (gastos: ExpenseGeneralData[]) => {
        return gastos.reduce((acc: ExpenseSummerized[], gasto) => {
            const existing = acc.find(item => item.idCategory === gasto.expenseCategory.id);
            if (existing) {
                existing.total += gasto.amount;
            } else {
                acc.push({
                    idCategory: gasto.expenseCategory.id,
                    nameCategory: gasto.expenseCategory.name,
                    total: gasto.amount,
                });
            }
            return acc;
        }, []);
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!session) {
                    throw new Error("No token found");
                }
                const response = await getAllExpenses(session);
                //console.log("Fetched expenses:", response);
                getCurrentData(response);
                setGastos(response);
            } catch (err) {
                console.error("Error fetching expenses:", err);
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (gastos.length > 0) {
            const filteredGastos = filterGastos(gastos);
            setSummarizedGastos(summarizeGastos(filteredGastos));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gastos, yearFilter, monthFilter]);

    return { summerizedGastos, loading, error, setYearFilter, setMonthFilter, yearFilter, monthFilter };
}

export const useCategioriesList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { session } = useAuth();

    const fetchCategories = async (token: string) => {
        try {
            const response = await getExpenseCategories(token);
            setCategories(response);
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (session) {
            fetchCategories(session);
        } else {
            setError("No token found");
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { categories, loading, error, fetchCategories };
}

export function useExpenseParams() {
    const { year, month, categoryId } = useParams();
    const { session } = useAuth();

    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const numericYear = Number(year);
    const numericMonth = Number(month);
    const numericCategoryId = Number(categoryId);

    const isValidParams = !isNaN(numericYear) && !isNaN(numericMonth) && !isNaN(numericCategoryId);

    useEffect(() => {
        const fetchExpenses = async () => {
            if (!session || !isValidParams) {
                setError("Parámetros inválidos o token ausente");
                setLoading(false);
                return;
            }

            try {
                const data:Expense[] = await getExpensesByCategory(session, numericYear, numericMonth, numericCategoryId);
                //orderByDate
                data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                setExpenses(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err?.message || "Error desconocido");
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchExpenses();
    }, [session, numericYear, numericMonth, numericCategoryId, isValidParams]);

    return {
        expenses,
        loading,
        error,
        year: numericYear,
        month: numericMonth,
        categoryName: expenses[0]?.category.name ?? "", // valor útil para mostrar en título
    };
}
