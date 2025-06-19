import { PieChartStadistic } from "@components/GraphStadistic";
import useStadistic from "@hooks/useStadistic";
import { COLORS } from "@utils/constants";

const Stadistic = () => {
    const { graphData } = useStadistic();

    return (
        <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl p-2 font-bold text-gray-800">📊 Estadísticas de Gastos</h2>
            {graphData && graphData.length > 0 ? (
                <PieChartStadistic data={graphData} />
            ) : (
                <p className="text-gray-500">No hay datos suficientes para mostrar estadísticas.</p>
            )}

            {graphData && graphData.length > 0 && (<div className="mt-4">
                <h3 className="text-xl font-semibold my-3">Resumen de Gastos</h3>
                <ul className="space-y-2">
                    {graphData && graphData.length > 0 ? (
                        graphData.map((item, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span className=" w-5 h-5 rounded-2xl" style={{background:COLORS[index % COLORS.length]}}></span>
                                <span className="text-gray-700">{item.name}</span>
                                <span className="text-gray-700">
                                    ${item.total.toFixed(2)} ({item.porcentage}%)
                                </span>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No hay datos para mostrar.</li>
                    )}
                </ul>
            </div>)}
        </div>
    );
}

export default Stadistic;