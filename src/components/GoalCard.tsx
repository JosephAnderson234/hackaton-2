import React, { useState } from 'react';
import type { Goal } from '../types/expenseTypes';

interface GoalCardProps {
    goal: Goal;
    isCurrentMonth: boolean;
    onUpdate: (updates: { targetAmount?: number; description?: string }) => Promise<void>;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, isCurrentMonth, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        targetAmount: goal.targetAmount.toString(),
        description: goal.description || ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const handleSave = async () => {
        setError('');
        setLoading(true);

        const targetAmount = parseFloat(editData.targetAmount);
        if (isNaN(targetAmount) || targetAmount <= 0) {
            setError('El monto debe ser mayor a 0');
            setLoading(false);
            return;
        }

        try {
            await onUpdate({
                targetAmount,
                description: editData.description.trim() || undefined
            });
            setIsEditing(false);
        } catch (err: any) {
            setError('Error al actualizar la meta');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditData({
            targetAmount: goal.targetAmount.toString(),
            description: goal.description || ''
        });
        setError('');
        setIsEditing(false);
    };

    // Calculate progress (for this demo, we'll use a mock calculation)
    // In a real app, this would be based on actual savings vs spending
    const currentAmount = goal.currentAmount || 0;
    const progressPercentage = Math.min((currentAmount / goal.targetAmount) * 100, 100);

    const getStatusColor = () => {
        if (progressPercentage >= 100) return 'text-green-600';
        if (progressPercentage >= 75) return 'text-blue-600';
        if (progressPercentage >= 50) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getProgressBarColor = () => {
        if (progressPercentage >= 100) return 'bg-green-500';
        if (progressPercentage >= 75) return 'bg-blue-500';
        if (progressPercentage >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className={`bg-white rounded-lg shadow-sm border p-6 ${
            isCurrentMonth ? 'border-indigo-200 ring-2 ring-indigo-100' : 'border-gray-200'
        }`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {monthNames[goal.month - 1]} {goal.year}
                        </h3>
                        {isCurrentMonth && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                Mes actual
                            </span>
                        )}
                    </div>
                    {goal.description && (
                        <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    )}
                </div>
                
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Editar meta"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meta de ahorro (S/)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={editData.targetAmount}
                            onChange={(e) => setEditData(prev => ({ ...prev, targetAmount: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción (opcional)
                        </label>
                        <input
                            type="text"
                            value={editData.description}
                            onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Ej: Vacaciones de verano"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Meta:</span>
                            <span className="text-lg font-semibold text-gray-900">
                                S/ {goal.targetAmount.toLocaleString('es-PE', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                })}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Progreso:</span>
                            <span className={`text-sm font-medium ${getStatusColor()}`}>
                                S/ {currentAmount.toLocaleString('es-PE', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                })}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Completado:</span>
                                <span className={`text-sm font-medium ${getStatusColor()}`}>
                                    {progressPercentage.toFixed(1)}%
                                </span>
                            </div>
                            
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        {progressPercentage >= 100 && (
                            <div className="flex items-center text-green-600 text-sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                ¡Meta completada!
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
