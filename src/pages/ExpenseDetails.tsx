import { useExpenseParams } from "@hooks/useExpenses";
import ExpenseList from "@components/ExpenseDetails/ExpenseList";
import ExpenseSummary from "@components/ExpenseDetails/ExpenseSummary";
import ExpenseActions from "@components/ExpenseDetails/ExpenseAction";
import { NavLink } from "react-router-dom";
import { MONTHS_ARRAY } from "@utils/constants";
import { LoadingDots } from "@components/PreLoading";

export default function ExpenseDetail() {
  const { year, month, expenses, loading, error, categoryName } = useExpenseParams();

  if (loading) return <div className="w-full"><LoadingDots/></div>;
  if (error) return <p className="text-red-600 font-medium">Error: {error}</p>;
  if (expenses.length === 0)
    return <p className="text-gray-500">No hay gastos registrados para esta categoría en este mes.</p>;

  return (
    <section className="space-y-4 p-4 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <NavLink to="/dashboard" className="bg-green-500 text-white p-1.5 rounded-xl hover:bg-green-600 transition-all duration-300"  > ⬅️ Regresar </NavLink>
      </div>
      <h2 className="text-xl font-bold text-gray-800">
        Gastos en {categoryName} — {MONTHS_ARRAY[month]}/{year}
      </h2>
      <ExpenseActions />
      <ExpenseSummary expenses={expenses} />
      <ExpenseList expenses={expenses} />

    </section>
  );
}
