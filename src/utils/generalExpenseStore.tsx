import type { ExpenseGeneralData } from "@/types/expenseType"
import { create } from "zustand"


type ExpenseGeneralDataStore = {
    gastos: ExpenseGeneralData[];
    setGastos: (expenses: ExpenseGeneralData[]) => void;
}

const useGeneralExpenseStore = create<ExpenseGeneralDataStore>((set) => ({
    gastos: [],
    setGastos: (expenses: ExpenseGeneralData[]) => set({ gastos: expenses
}),
}));

export default useGeneralExpenseStore;