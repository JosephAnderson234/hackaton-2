import { useEffect, useState } from 'react';
import { getExpensesByCategory } from '../utils/api';
import type { Expense } from '../types/expenseType';

interface ExpenseDetailProps {
  year: number;
  month: number;
  categoryId: number;
  token: string;
}

export function ExpenseDetail({
  year,
  month,
  categoryId,
  token,
}: ExpenseDetailProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const data = await getExpensesByCategory(token, year, month, categoryId);
        setExpenses(data);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [year, month, categoryId, token]);

  if (loading) return <p>Cargando gastos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (expenses.length === 0)
    return <p>No hay gastos registrados para esta categoría en este mes.</p>;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h2>Detalle de Gastos</h2>
      <p>
        Total: <strong>S/ {total.toFixed(2)}</strong>
      </p>
      <ul>
        {expenses.map((e) => (
          <li key={e.id} style={{ marginBottom: '8px' }}>
            <strong>S/ {e.amount.toFixed(2)}</strong> — {e.description} (
            {new Date(e.date).toLocaleDateString('es-PE')})
          </li>
        ))}
      </ul>
    </div>
  );
}
