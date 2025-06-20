// src/components/ExpenseList.tsx

import type { Expense } from "@/types/expenseType";
import { useSelectedExpense } from "@utils/selectExpenseStore";

interface Props {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: Props) {
  const { selectedId, setSelectedId } = useSelectedExpense();

  return (
    <ul className="w-11/12 md:w-5/6 mx-auto grid divide-gray-200 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {expenses.map((expense) => (
        
        <li
          key={expense.id}
          onClick={() => setSelectedId(expense.id)}
          className={`py-3 px-4 cursor-pointer rounded-lg flex justify-between items-center transition-all border border-blue-400 ${
            selectedId === expense.id
              ? "bg-blue-100 border"
              : "hover:bg-gray-50"
          }`}
        >
          <span className="text-gray-800 font-medium">S/ {expense.amount.toFixed(2)}</span>
          <span className="text-sm text-gray-600">
            {expense.date}
          </span>
        </li>
      ))}
    </ul>
  );
}
