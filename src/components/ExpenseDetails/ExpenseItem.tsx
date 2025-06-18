import type { Expense } from "@/types/expenseType";

interface Props {
  expense: Expense;
}

export default function ExpenseItem({ expense }: Props) {
  return (
    <li className="py-2 flex justify-between items-center">
      <span className="text-gray-800 font-medium">
        S/ {expense.amount.toFixed(2)}
      </span>
      <span className="text-sm text-gray-500">
        {new Date(expense.date).toLocaleDateString("es-PE")}
      </span>
    </li>
  );
}
