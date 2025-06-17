import React, { useState, useEffect } from 'react';
import { useExpenseStore } from '../stores/appStore';
import { getExpensesSummary, getExpenseCategories } from '../utils/api';
import { ExpenseSummaryCard } from '../components/ExpenseSummaryCard';
import { MonthSelector } from '../components/MonthSelector';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const DashboardPage: React.FC = () => {
    const {
        summary,
        categories,
        currentMonth,
        currentYear,
        setSummary,
        setCategories,
        setCurrentDate
    } = useExpenseStore();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadData = async (year: number, month: number) => {
        setLoading(true);
        setError('');
        
        try {
            const [summaryData, categoriesData] = await Promise.all([
                getExpensesSummary(year, month),
                categories.length === 0 ? getExpenseCategories() : Promise.resolve(categories)
            ]);
            
            setSummary(summaryData);
            if (categories.length === 0) {
                setCategories(categoriesData);
            }
        } catch (err: any) {
            setError('Error al cargar los datos. Intenta nuevamente.');
            console.error('Error loading dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(currentYear, currentMonth);
    }, [currentYear, currentMonth]);

    const handleMonthChange = (year: number, month: number) => {
        setCurrentDate(year, month);
    };

    const totalExpenses = summary.reduce((total, item) => total + item.totalAmount, 0);
    const totalTransactions = summary.reduce((total, item) => total + item.count, 0);

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600">
                            Resumen de gastos - {monthNames[currentMonth - 1]} {currentYear}
                        </p>
                    </div>
                    <MonthSelector
                        currentYear={currentYear}
                        currentMonth={currentMonth}
                        onMonthChange={handleMonthChange}
                    />
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Gastado</p>
                            <p className="text-2xl font-bold text-gray-900">
                                S/ {totalExpenses.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Transacciones</p>
                            <p className="text-2xl font-bold text-gray-900">{totalTransactions.toLocaleString('es-PE')}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Categorías</p>
                            <p className="text-2xl font-bold text-gray-900">{summary.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                            <button
                                onClick={() => loadData(currentYear, currentMonth)}
                                className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && <LoadingSpinner />}

            {/* Expense Categories */}
            {!loading && summary.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Gastos por Categoría</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {summary.map((item) => (
                            <ExpenseSummaryCard
                                key={item.categoryId}
                                summary={item}
                                onClick={() => {
                                    // Navigation will be handled by the ExpenseSummaryCard component
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && summary.length === 0 && !error && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay gastos registrados</h3>
                    <p className="text-gray-600">No hay gastos registrados para este mes. Agrega tu primer gasto para comenzar.</p>
                </div>
            )}
        </div>
    );
};
