// src/components/ExpenseDetail.tsx
import { useEffect, useState } from 'react';
import { getExpensesByCategory } from '@utils/api';
import type { Expense } from '@/types/expenseType';
import { useExpenseParams } from '@hooks/useDetailedExpenses';

export function ExpenseDetail() {
  const { year, month, categoryId, token, isValid } = useExpenseParams();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!isValid) {
        setError('Parámetros inválidos o token ausente');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getExpensesByCategory(token!, year, month, categoryId);
        setExpenses(data);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [year, month, categoryId, token, isValid]);

  if (loading) return <p>Cargando gastos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (expenses.length === 0)
    return <p>No hay gastos registrados para esta categoría en este mes.</p>;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h2>Gastos en {expenses[0]?.category.name || 'Categoría'} — {month}/{year}</h2>
      <p>Total: <strong>S/ {total.toFixed(2)}</strong></p>

      <ul>
        {expenses.map((e) => (
          <li key={e.id} style={{ marginBottom: '8px' }}>
            <strong>S/ {e.amount.toFixed(2)}</strong> — Fecha: {new Date(e.date).toLocaleDateString('es-PE')}
          </li>
        ))}
      </ul>
    </div>
  );
}
