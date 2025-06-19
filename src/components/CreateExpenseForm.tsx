import { useAddExpense } from "@hooks/useManageExpenses"
import { useState } from "react";
import type { CreateExpenese } from '@/types/expenseType';
import { useCategioriesList } from "@hooks/useExpenses";

interface Props {
  onSuccess?: () => void;
}

const CreateExpenseForm = ({ onSuccess }: Props) => {
    const { addExpense, isLoading, error: errorAddExpenses } = useAddExpense();
    const { categories, loading, error: errorCategories } = useCategioriesList();
    const [formData, setFormData] = useState<CreateExpenese>({
        amount: 0,
        date: '',
        category: {
            id: 0
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) : value,
            category: name === 'category' ? { id: parseInt(value) } : prev.category
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addExpense(formData);
            setFormData({
                amount: 0,
                date: '',
                category: { id: 0 }
            });
            onSuccess?.();
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Crear Nuevo Gasto</h2>

            {errorAddExpenses && <p className="text-sm text-red-600 font-medium">{errorAddExpenses}</p>}
            {loading && <p className="text-sm text-gray-600">Cargando categorías...</p>}
            {errorCategories && <p className="text-sm text-red-600 font-medium">{errorCategories}</p>}

            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                    name="category"
                    id="category"
                    value={formData.category.id}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={isLoading || !!errorAddExpenses || !!errorCategories}
                className={`w-full py-2 px-4 text-white font-medium rounded-lg transition-colors duration-200 ${isLoading || !!errorAddExpenses || !!errorCategories
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 hover:cursor-pointer'
                    }`}
            >
                {isLoading ? 'Añadiendo...' : 'Añadir Gasto'}
            </button>
        </form>

    );
}

export default CreateExpenseForm;