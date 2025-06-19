// src/components/ExpenseList.tsx

import type { Expense } from "@/types/expenseType";
import { useSelectedExpense } from "@utils/selectExpenseStore";

interface Props {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: Props) {
  const { selectedId, setSelectedId } = useSelectedExpense();

  return (
    <ul className="divide-y divide-gray-200">
      {expenses.map((expense) => (
        
        <li
          key={expense.id}
          onClick={() => setSelectedId(expense.id)}
          className={`py-3 px-4 cursor-pointer rounded-lg flex justify-between items-center transition-all ${
            selectedId === expense.id
              ? "bg-blue-100 border border-blue-400 shadow"
              : "hover:bg-gray-50"
          }`}
        >
          <span className="text-gray-800 font-medium">S/ {expense.amount.toFixed(2)}</span>
          <span className="text-sm text-gray-600">
            {new Date(expense.date).toLocaleDateString("es-PE")}
          </span>
        </li>
      ))}
    </ul>
  );
}
