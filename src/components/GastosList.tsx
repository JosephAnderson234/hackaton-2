import { useState } from "react";
import GastosHeader from "./GastosHeader";
import GastoItem from "./GastoItem";
import useAllExpenses from "@hooks/useAllExpenses";
import { LoadingDots } from "./PreLoading";

export default function GastosList() {
  const {gastos, loading, error} = useAllExpenses();
  const [seleccionado, setSeleccionado] = useState<number | null>(null);

  const seleccionar = (id: number) => {
    setSeleccionado(prev => (prev === id ? null : id));
  };

  const eliminarSeleccionado = () => {
    console.log("Eliminar gasto con ID:", seleccionado);
  };

  const crearNuevoGasto = () => {
    alert("Función para crear nuevo gasto (a implementar)");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <GastosHeader
        onNuevo={crearNuevoGasto}
        onEliminar={eliminarSeleccionado}
        eliminarHabilitado={seleccionado !== null}
      />
      <ul className="space-y-3">
        {error && <p className="text-red-500 text-center">Error al cargar los gastos: {error}</p>}
        {loading ? <LoadingDots/> : gastos.map((gasto) => (
          <GastoItem
            key={gasto.id}
            gasto={gasto}
            seleccionado={seleccionado === gasto.id}
            onSeleccionar={seleccionar}
          />
        ))}
      </ul>
    </div>
  );
}
