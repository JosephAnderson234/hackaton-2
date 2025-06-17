import React from 'react';

interface MonthSelectorProps {
    currentYear: number;
    currentMonth: number;
    onMonthChange: (year: number, month: number) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
    currentYear,
    currentMonth,
    onMonthChange
}) => {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const currentDate = new Date();
    const minYear = currentDate.getFullYear() - 2;
    const maxYear = currentDate.getFullYear() + 1;
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            onMonthChange(currentYear - 1, 12);
        } else {
            onMonthChange(currentYear, currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            onMonthChange(currentYear + 1, 1);
        } else {
            onMonthChange(currentYear, currentMonth + 1);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <select
                    value={currentMonth}
                    onChange={(e) => onMonthChange(currentYear, parseInt(e.target.value))}
                    className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                    {months.map((month, index) => (
                        <option key={index} value={index + 1}>
                            {month}
                        </option>
                    ))}
                </select>

                <select
                    value={currentYear}
                    onChange={(e) => onMonthChange(parseInt(e.target.value), currentMonth)}
                    className="block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center space-x-1">
                <button
                    onClick={handlePrevMonth}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                    title="Mes anterior"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={handleNextMonth}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                    title="Mes siguiente"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
