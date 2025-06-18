import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../stores/appStore';
import type { ExpenseSummary } from '../types/expenseTypes';
interface ExpenseSummaryCardProps {
    summary: ExpenseSummary;
    onClick?: () => void;
}
export const ExpenseSummaryCard: React.FC<ExpenseSummaryCardProps> = ({ 
    summary,
    onClick 
}) => {
    const navigate = useNavigate();
    const { currentYear, currentMonth } = useExpenseStore();
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        navigate(`/expenses/${summary.categoryId}?year=${currentYear}&month=${currentMonth}`);
    };const getCategoryIcon = (categoryName?: string) => {
        if (!categoryName) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            );
        }
        const name = categoryName.toLowerCase();
        if (name.includes('comida') || name.includes('alimentacion') || name.includes('restaurante')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5h16M16 21a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            );
        } else if (name.includes('transporte') || name.includes('auto') || name.includes('gasolina')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9" />
                </svg>
            );
        } else if (name.includes('entretenimiento') || name.includes('ocio') || name.includes('diversión')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4m-6 0a2 2 0 012-2h2a2 2 0 012 2m-6 0H7a2 2 0 00-2 2v4a2 2 0 002 2h1m0-6h8m0 0v6a1 1 0 01-1 1H9a1 1 0 01-1-1v-6" />
                </svg>
            );
        } else if (name.includes('salud') || name.includes('medico') || name.includes('farmacia')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            );
        } else if (name.includes('educacion') || name.includes('libros') || name.includes('curso')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
        } else {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            );
        }
    };    // Ensure we have valid numbers
    const totalAmount = summary.totalAmount || 0;
    return (
        <div
            onClick={handleClick}
            className="bg-white border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md cursor-pointer hover:border-indigo-300"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <div className="text-indigo-600">
                            {getCategoryIcon(summary.categoryName)}
                        </div>
                    </div>                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                            {summary.categoryName}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Total gastado
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                        S/ {totalAmount.toLocaleString('es-PE', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                        })}
                    </p>
                </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-indigo-600 hover:text-indigo-800">
                <span>Ver detalles</span>
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
};
