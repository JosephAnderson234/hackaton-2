import type { Expense } from "@/types/expenseType";

interface Props {
    expenses: Expense[];
}

export default function ExpenseSummary({ expenses }: Props) {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    return (
        <div className="text-lg text-gray-700">
            Total: <strong className="text-blue-600">S/ {total.toFixed(2)}</strong>
        </div>
    );
}