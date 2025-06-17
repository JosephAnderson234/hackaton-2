import React, { useState } from 'react';

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGoalCreated: (goalData: { month: number; year: number; targetAmount: number; description?: string }) => Promise<void>;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({
    isOpen,
    onClose,
    onGoalCreated
}) => {
    const currentDate = new Date();
    const [formData, setFormData] = useState({
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        targetAmount: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const currentYear = currentDate.getFullYear();
    const years = Array.from({ length: 3 }, (_, i) => currentYear + i);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.targetAmount || parseFloat(formData.targetAmount) <= 0) {
            setError('El monto debe ser mayor a 0');
            setLoading(false);
            return;
        }

        try {
            await onGoalCreated({
                month: formData.month,
                year: formData.year,
                targetAmount: parseFloat(formData.targetAmount),
                description: formData.description.trim() || undefined
            });
            
            // Reset form
            setFormData({
                month: currentDate.getMonth() + 1,
                year: currentDate.getFullYear(),
                targetAmount: '',
                description: ''
            });
            
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al crear la meta');
            console.error('Error creating goal:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Nueva Meta de Ahorro</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                                Mes *
                            </label>
                            <select
                                id="month"
                                required
                                value={formData.month}
                                onChange={(e) => setFormData(prev => ({ ...prev, month: parseInt(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {months.map((month, index) => (
                                    <option key={index} value={index + 1}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                                Año *
                            </label>
                            <select
                                id="year"
                                required
                                value={formData.year}
                                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-2">
                            Meta de ahorro (S/) *
                        </label>
                        <input
                            id="targetAmount"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={formData.targetAmount}
                            onChange={(e) => setFormData(prev => ({ ...prev, targetAmount: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Descripción (opcional)
                        </label>
                        <input
                            id="description"
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Ej: Vacaciones de verano, Fondo de emergencia"
                        />
                    </div>

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
                            {loading ? 'Creando...' : 'Crear Meta'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
