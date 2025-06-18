import { useExpenseParams } from "@hooks/useExpenses";
import ExpenseList from "@components/ExpenseDetails/ExpenseList";
import ExpenseSummary from "@components/ExpenseDetails/ExpenseSummary";

export default function ExpenseDetail() {
  const { year, month, expenses, loading, error, categoryName } = useExpenseParams();

  if (loading) return <p className="text-gray-600">Cargando gastos...</p>;
  if (error) return <p className="text-red-600 font-medium">Error: {error}</p>;
  if (expenses.length === 0)
    return <p className="text-gray-500">No hay gastos registrados para esta categoría en este mes.</p>;

  return (
    <section className="space-y-4 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold text-gray-800">
        Gastos en {categoryName} — {month}/{year}
      </h2>
      <ExpenseSummary expenses={expenses} />
      <ExpenseList expenses={expenses} />
    </section>
  );
}
