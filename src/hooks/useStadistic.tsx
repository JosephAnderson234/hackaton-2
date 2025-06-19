import useCurrentDataStore from "@utils/useCurrentData"
import useGeneralExpenseStore from "@utils/generalExpenseStore";
import { useState, useEffect } from "react";
import type { ExpenseGeneralData } from '@/types/expenseType';
import type { ExpensegraphData } from '@/types/graphTypes';


const useStadistic = () => {
    const { currentData } = useCurrentDataStore();
    const { gastos } = useGeneralExpenseStore();

    const total = currentData?.amount || 0;
    const yearFilter = currentData?.year || null;
    const monthFilter = currentData?.month || null;

    const [graphData, setGraphData] = useState<ExpensegraphData[]>()

    const filterGastos = (gastos: ExpenseGeneralData[]) => {
        return gastos.filter(gasto => {
            const yearMatch = yearFilter ? gasto.year === yearFilter : true;
            const monthMatch = monthFilter ? gasto.month === monthFilter : true;
            return yearMatch && monthMatch;
        });
    };

    const summarizeGastos = (gastos: ExpenseGeneralData[]) => {
        return gastos.reduce((acc: ExpensegraphData[], gasto) => {
            const existing = acc.find(item => item.name === gasto.expenseCategory.name);
            if (existing) {
                existing.total += gasto.amount;
            } else {
                acc.push({
                    name: gasto.expenseCategory.name,
                    //total debe tener 2 decimales
                    total: parseFloat(gasto.amount.toFixed(2)),
                    porcentage: 0 // Porcentaje se calculará más adelante
                });
            }
            return acc;
        }, []);
    };

    const calculatePorcentages = (data: ExpensegraphData[]) => {
        if (!currentData || currentData.amount <= 0) {
            return data
        }
        return data.map(item => ({
            ...item,
            porcentage: parseFloat(((item.total / total) * 100).toFixed(2))
        }));
    };

    const sortData = (data: ExpensegraphData[]) => {
        return data.sort((a, b) => b.total - a.total);
    }

    useEffect(() => {
        if (gastos && gastos.length > 0) {
            const summarizedData = summarizeGastos(filterGastos(gastos));
            const porcentagedData = calculatePorcentages(summarizedData);
            const sortedData = sortData(porcentagedData);
            setGraphData(sortedData);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gastos, yearFilter, monthFilter]);

    return {
        graphData
    };
}

export default useStadistic;