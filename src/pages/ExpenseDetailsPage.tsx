import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../stores/appStore';
import { getExpenseDetails, deleteExpense } from '../utils/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AddExpenseModal } from '../components/AddExpenseModal';
import type { ExpenseDetail } from '../types/expenseTypes';
export const ExpenseDetailsPage: React.FC = () => {    const { categoryId } = useParams<{ categoryId: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString());
    const parsedCategoryId = categoryId ? parseInt(categoryId) : null;
    const isValidCategoryId = parsedCategoryId && !isNaN(parsedCategoryId);
    const { details, categories, removeExpense } = useExpenseStore();
    const detailsKey = `${year}-${month}-${parsedCategoryId}`;
    const [expenses, setExpenses] = useState<ExpenseDetail[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const category = categories.find(cat => cat.id === parsedCategoryId);
      const loadExpenseDetails = async () => {
        if (!isValidCategoryId) {
            setError('ID de categoría inválido');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const cachedExpenses = details[detailsKey];
            if (cachedExpenses) {
                setExpenses(cachedExpenses);
                setLoading(false);
                return;
            }
            const expenseData = await getExpenseDetails(year, month, parsedCategoryId!);
            setExpenses(expenseData);
        } catch (err: any) {
            setError('Error al cargar los detalles de gastos. Intenta nuevamente.');
            console.error('Error loading expense details:', err);
        } finally {
            setLoading(false);
        }
    };    useEffect(() => {
        loadExpenseDetails();
    }, [parsedCategoryId, year, month, details]);
    const handleDeleteExpense = async (expenseId: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
            return;
        }
        setDeletingId(expenseId);
        try {
            await deleteExpense(expenseId);
            removeExpense(expenseId);
            setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
        } catch (err: any) {
            setError('Error al eliminar el gasto. Intenta nuevamente.');
            console.error('Error deleting expense:', err);
        } finally {
            setDeletingId(null);
        }
    };
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageAmount = expenses.length > 0 ? totalAmount / expenses.length : 0;    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    if (!isValidCategoryId) {
        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Error</h1>
                            <p className="text-gray-600">ID de categoría inválido</p>
                        </div>
                    </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                El ID de categoría proporcionado no es válido. Regresa al dashboard y selecciona una categoría válida.
                            </p>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
                            >
                                Volver al Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {category?.name || 'Categoría'}
                            </h1>
                            <p className="text-gray-600">
                                {monthNames[month - 1]} {year} • {expenses.length} transacciones
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Agregar Gasto
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Total</p>
                        <p className="text-2xl font-bold text-gray-900">
                            S/ {totalAmount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Promedio</p>
                        <p className="text-2xl font-bold text-gray-900">
                            S/ {averageAmount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Transacciones</p>
                        <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
                    </div>
                </div>
            </div>
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                            <button
                                onClick={loadExpenseDetails}
                                className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {loading && <LoadingSpinner />}
            {!loading && expenses.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Detalles de Gastos</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {expenses.map((expense) => (
                            <div key={expense.id} className="px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-center justify-between">                                <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    {expense.description}
                                                </h3>
                                                <p className="text-xs text-indigo-600 font-medium mt-1">
                                                    {category?.name || 'Categoría desconocida'}
                                                </p>
                                            </div><div className="flex items-center space-x-4">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    S/ {(expense.amount || 0).toLocaleString('es-PE', { 
                                                        minimumFractionDigits: 2, 
                                                        maximumFractionDigits: 2 
                                                    })}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteExpense(expense.id)}
                                                    disabled={deletingId === expense.id}
                                                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                                    title="Eliminar gasto"
                                                >
                                                    {deletingId === expense.id ? (
                                                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(expense.date).toLocaleDateString('es-PE', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {!loading && expenses.length === 0 && !error && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay gastos registrados</h3>
                    <p className="text-gray-600 mb-4">No hay gastos registrados en esta categoría para este mes.</p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Agregar primer gasto
                    </button>
                </div>
            )}
            {showAddModal && isValidCategoryId && (
                <AddExpenseModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    categoryId={parsedCategoryId!}
                    onExpenseAdded={(expense: ExpenseDetail) => {
                        setExpenses(prev => [expense, ...prev]);
                        setShowAddModal(false);
                    }}
                />
            )}
        </div>
    );
};
