import GastosFilter from "./GastosFilter";
import { useNavigate } from "react-router-dom";
import GastoItem from "./GastoItem";
import { useAllExpenses } from "@hooks/useExpenses";
import { LoadingDots } from "../PreLoading";
import { Modal } from "@components/Modals";
import { useState } from "react";
import CreateExpenseForm from "@components/CreateExpenseForm";
import CurrentData from "./CurrentData";
import Stadistic from "./Stadistic";

export default function GastosSection() {
  const { summerizedGastos, loading, error, yearFilter, monthFilter, setMonthFilter, setYearFilter } = useAllExpenses();
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
    <div className="flex flex-col md:flex-row gap-6 mt-8">
      
      <div className="w-11/12 md:w-1/2 h-full flex flex-col gap-4">
        <CurrentData />
        <Stadistic />
      </div>


      <div className="w-11/12 md:w-1/2 mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-between items-center mb-6">
          <h2 className="text-2xl p-2 font-bold text-gray-800">🧾 Mis Gastos</h2>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-green-600 transition-colors">
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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateExpenseForm onSuccess={() => {
          setIsOpen(false)
          //reload
          window.location.reload();
        }} />
      </Modal>
    </div>

  );
}
