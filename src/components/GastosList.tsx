import { useState } from "react";
import type { Gasto } from "@utils/gastos";
import { gastosIniciales } from "@utils/gastos";
import GastosHeader from "./GastosHeader";
import GastoItem from "./GastoItem";

export default function GastosList() {
  const [gastos, setGastos] = useState<Gasto[]>(gastosIniciales);
  const [seleccionado, setSeleccionado] = useState<number | null>(null);

  const seleccionar = (id: number) => {
    setSeleccionado(prev => (prev === id ? null : id));
  };

  const eliminarSeleccionado = () => {
    if (seleccionado === null) return;
    setGastos(gastos.filter(g => g.id !== seleccionado));
    setSeleccionado(null);
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
        {gastos.map((gasto) => (
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
