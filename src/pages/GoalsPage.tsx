import React, { useState, useEffect } from 'react';
import { useGoalStore } from '../stores/appStore';
import { getGoals, createGoal, updateGoal } from '../utils/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { GoalCard } from '../components/GoalCard';
import { AddGoalModal } from '../components/AddGoalModal';

export const GoalsPage: React.FC = () => {
    const { goals, setGoals, addGoal, updateGoal: updateGoalInStore } = useGoalStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const loadGoals = async () => {
        setLoading(true);
        setError('');
        
        try {
            const goalsData = await getGoals();
            setGoals(goalsData);
        } catch (err: any) {
            setError('Error al cargar las metas. Intenta nuevamente.');
            console.error('Error loading goals:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGoals();
    }, []);

    const handleCreateGoal = async (goalData: { month: number; year: number; targetAmount: number; description?: string }) => {
        try {
            const newGoal = await createGoal(goalData);
            addGoal(newGoal);
            setShowAddModal(false);
        } catch (err: any) {
            console.error('Error creating goal:', err);
            throw err;
        }
    };

    const handleUpdateGoal = async (id: number, updates: { targetAmount?: number; description?: string }) => {
        try {
            const updatedGoal = await updateGoal(id, updates);
            updateGoalInStore(updatedGoal);
        } catch (err: any) {
            console.error('Error updating goal:', err);
            throw err;
        }
    };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Group goals by year
    const goalsByYear = goals.reduce((acc, goal) => {
        if (!acc[goal.year]) {
            acc[goal.year] = [];
        }
        acc[goal.year].push(goal);
        return acc;
    }, {} as Record<number, typeof goals>);    // Sort years in descending order
    const sortedYears = Object.keys(goalsByYear)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Metas de Ahorro</h1>
                        <p className="text-gray-600">
                            Establece y hace seguimiento a tus metas de ahorro mensuales
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nueva Meta
                    </button>
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
                                onClick={loadGoals}
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

            {/* Goals by Year */}
            {!loading && sortedYears.length > 0 && (
                <div className="space-y-8">
                    {sortedYears.map((year) => (
                        <div key={year} className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">{year}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {goalsByYear[year]
                                    .sort((a, b) => b.month - a.month)
                                    .map((goal) => (
                                        <GoalCard
                                            key={goal.id}
                                            goal={goal}
                                            isCurrentMonth={year === currentYear && goal.month === currentMonth}
                                            onUpdate={(updates: { targetAmount?: number; description?: string }) => handleUpdateGoal(goal.id, updates)}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && goals.length === 0 && !error && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay metas de ahorro</h3>
                    <p className="text-gray-600 mb-4">
                        Establece tu primera meta de ahorro para comenzar a hacer seguimiento de tus objetivos financieros.
                    </p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Crear primera meta
                    </button>
                </div>
            )}

            {/* Add Goal Modal */}
            {showAddModal && (
                <AddGoalModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onGoalCreated={handleCreateGoal}
                />
            )}
        </div>
    );
};
