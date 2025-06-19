import type { CurrentExpenseData, ExpenseGeneralData } from '@/types/expenseType';
import { create } from "zustand";


interface CurrentDataStore {
    currentData: CurrentExpenseData | null;
    getCurrentData: (gastos: ExpenseGeneralData[]) => void;
}


const useCurrentDataStore = create<CurrentDataStore>((set) => ({
    currentData: null,
    getCurrentData: (gastos) => {
        if (gastos.length === 0) return;

        const currentMonth = new Date().getMonth() + 1; 
        const currentYear = new Date().getFullYear();
        const currentGastos = gastos.filter(gasto => gasto.month === currentMonth && gasto.year === currentYear);
        const totalAmount = currentGastos.reduce((acc, gasto) => acc + gasto.amount, 0);
        set({
            currentData: {
                month: currentMonth,
                year: currentYear,
                amount: totalAmount,
            },
        });
    },
}));

export default useCurrentDataStore;