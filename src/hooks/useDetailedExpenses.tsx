// src/hooks/useExpenseParams.ts
import { useParams } from 'react-router-dom';

export function useExpenseParams() {
  const { year, month, categoryId } = useParams();
  const token = localStorage.getItem('token'); // o Zustand, Context, etc.

  const numericYear = parseInt(year || '');
  const numericMonth = parseInt(month || '');
  const numericCategoryId = parseInt(categoryId || '');

  const isValid =
    !isNaN(numericYear) &&
    !isNaN(numericMonth) &&
    !isNaN(numericCategoryId) &&
    !!token;

  return {
    year: numericYear,
    month: numericMonth,
    categoryId: numericCategoryId,
    token,
    isValid,
  };
}
