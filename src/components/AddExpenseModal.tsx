import React, { useState, useEffect } from 'react';
import { useExpenseStore } from '../stores/appStore';
import { createExpense } from '../utils/api';
import type { ExpenseDetail } from '../types/expenseTypes';
interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId?: number;
    onExpenseAdded: (expense: ExpenseDetail) => void;
}
export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
    isOpen,
    onClose,
    categoryId,
    onExpenseAdded
}) => {
    const { categories, addExpense } = useExpenseStore();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        categoryId: categoryId || (categories[0]?.id || 0)
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (categoryId) {
            setFormData(prev => ({ ...prev, categoryId }));
        }
    }, [categoryId]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);        if (!formData.categoryId || formData.categoryId === 0) {
            setError('Debe seleccionar una categoría válida');
            setLoading(false);
            return;
        }
        if (!formData.description.trim()) {
            setError('La descripción es requerida');
            setLoading(false);
            return;
        }
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            setError('El monto debe ser mayor a 0');
            setLoading(false);
            return;
        }
        if (!formData.date) {
            setError('La fecha es requerida');
            setLoading(false);
            return;
        }        try {
            const dateValue = formData.date.includes('T') ? formData.date.split('T')[0] : formData.date;
            const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
            if (!selectedCategory) {
                setError('Categoría no encontrada');
                setLoading(false);
                return;
            }
            const expenseRequest = {
                description: formData.description.trim(),
                amount: parseFloat(formData.amount),
                date: dateValue,
                category: selectedCategory // Send full category object instead of categoryId
            };
            console.log('=== FORM DATA BEFORE SUBMISSION ===');
            console.log('Form data:', formData);
            console.log('Selected category:', selectedCategory);
            console.log('Expense request:', expenseRequest);
            console.log('CategoryId value:', formData.categoryId);
            console.log('CategoryId type:', typeof formData.categoryId);
            console.log('Amount value:', formData.amount);
            console.log('Parsed amount:', parseFloat(formData.amount));
            console.log('Date value:', formData.date);
            console.log('Processed date (LocalDate format):', dateValue);
            console.log('Current token:', localStorage.getItem('token') ? 'Present' : 'Missing');
            console.log('=====================================');            const newExpense = await createExpense(expenseRequest as any);
            console.log('=== NEW EXPENSE RESPONSE ===');
            console.log('New expense:', newExpense);
            console.log('New expense amount:', newExpense?.amount);
            console.log('New expense amount type:', typeof newExpense?.amount);
            console.log('============================');
            const category = categories.find(cat => cat.id === formData.categoryId);
            const expenseWithCategory = {
                ...newExpense,
                categoryName: category?.name || 'Unknown'
            };
            addExpense(expenseWithCategory);
            onExpenseAdded(expenseWithCategory);
            setFormData({
                description: '',
                amount: '',
                date: new Date().toISOString().split('T')[0],
                categoryId: categoryId || (categories[0]?.id || 0)
            });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al crear el gasto');
            console.error('Error creating expense:', err);
        } finally {
            setLoading(false);
        }
    };
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Agregar Nuevo Gasto</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {categoryId ? (
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-indigo-800">
                                        Categoría: {categories.find(cat => cat.id === categoryId)?.name}
                                    </p>
                                    <p className="text-xs text-indigo-600">
                                        Este gasto se agregará a esta categoría
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                                Categoría *
                            </label>
                            <select
                                id="categoryId"
                                required
                                value={formData.categoryId}
                                onChange={(e) => setFormData(prev => ({ ...prev, categoryId: parseInt(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-1 text-xs text-gray-500">
                                Selecciona primero la categoría para saber qué tipo de gasto registrar
                            </p>
                        </div>
                    )}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Descripción *
                        </label>
                        <input
                            id="description"
                            type="text"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Describe el gasto relacionado a la categoría seleccionada"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Ejemplo: "Almuerzo en McDonald's", "Gasolina para el auto", "Compra de medicinas"
                        </p>
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                            Monto (S/) *
                        </label>
                        <input
                            id="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={formData.amount}
                            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha *
                        </label>
                        <input
                            id="date"
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />                    </div>
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Guardando...' : 'Agregar Gasto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
