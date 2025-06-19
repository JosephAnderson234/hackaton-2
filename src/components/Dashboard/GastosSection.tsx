import GastosFilter from "./GastosFilter";
import { MONTHS_ARRAY } from "@utils/constants";
import { useNavigate } from "react-router-dom";
import GastoItem from "./GastoItem";
import { useAllExpenses } from "@hooks/useExpenses";
import { LoadingDots } from "../PreLoading";
import { Modal } from "@components/Modals";
import { useState } from "react";
import CreateExpenseForm from "@components/CreateExpenseForm";

export default function GastosSection() {
  const { summerizedGastos, loading, error, yearFilter, monthFilter, setMonthFilter, setYearFilter, currentData } = useAllExpenses();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const seleccionar = (idCategory: number) => {
    if (!yearFilter || !monthFilter) {
      alert("Por favor, selecciona un año y un mes antes de continuar.");
      return;
    }
    navigate(`/dashboard/${yearFilter}/${monthFilter}/${idCategory}`);
  };

  return (
    <div className="flex flex-row gap-6 mt-8">
      <div className="w-1/2 mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-between items-center mb-6">
          <h2 className="text-2xl p-2 font-bold text-gray-800">🧾 Mis Gastos</h2>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Crear Nuevo Gasto
          </button>
          {!loading && <GastosFilter
            setMonth={setMonthFilter}
            setYear={setYearFilter}
            year={yearFilter}
            month={monthFilter}
          />}
        </div>

        <ul className="space-y-3">
          {error && <p className="text-red-500 text-center">Error al cargar los gastos: {error}</p>}
          {loading && <LoadingDots />}
          {!loading && summerizedGastos.length > 0 && summerizedGastos.map((gasto, index) => (
            <GastoItem
              key={index}
              gasto={gasto}
              onSeleccionar={seleccionar}
            />
          ))}
          {!loading && summerizedGastos.length === 0 && (
            <p className="text-gray-500 text-center">No hay gastos registrados para este mes y año.</p>)}
        </ul>
      </div>
      <div className="w-1/2 mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-2xl p-2 font-bold text-gray-800 text-center">

            Resumen de gastos de este mes y año:
          </h2>
          <div>
            {!error && !loading && currentData ? (
              <div className="text-center mt-4">
                <p className="text-lg font-semibold">Total Gastos: ${currentData.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Mes: { MONTHS_ARRAY[currentData.month-1] }, Año: {currentData.year}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No hay datos disponibles para el mes y año actual.</p>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateExpenseForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </div>

  );
}
