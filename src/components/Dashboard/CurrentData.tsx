import { MONTHS_ARRAY } from "@utils/constants";
import useCurrentDataStore from "@utils/useCurrentData";

const CurrentData = () => {
    const { currentData } = useCurrentDataStore();
    return (
        <div className="mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl p-2 font-bold text-gray-800 text-center">
                Resumen de gastos de este mes y año:
            </h2>
            <div>
                {currentData ? (
                    <div className="text-center mt-4">
                        <p className="text-lg font-semibold">Total Gastos: ${currentData.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Mes: {MONTHS_ARRAY[currentData.month - 1]}, Año: {currentData.year}</p>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No hay datos disponibles para el mes y año actual.</p>
                )}
            </div>
        </div>
    )
}

export default CurrentData;