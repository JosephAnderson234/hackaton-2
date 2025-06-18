import type { Expense } from "@/types/expenseType";
import ExpenseItem from "./ExpenseItem";

interface Props {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: Props) {
  return (
    <ul className="divide-y divide-gray-200">
      {expenses.map((e) => (
        <ExpenseItem key={e.id} expense={e} />
      ))}
    </ul>
  );
}