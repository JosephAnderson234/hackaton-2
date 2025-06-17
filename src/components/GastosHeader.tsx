import { Plus, Trash2 } from "lucide-react";

interface GastosHeaderProps {
  onNuevo: () => void;
  onEliminar: () => void;
  eliminarHabilitado: boolean;
}

export default function GastosHeader({
  onNuevo,
  onEliminar,
  eliminarHabilitado,
}: GastosHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">🧾 Mis Gastos</h2>
      <div className="flex gap-3">
        <button
          onClick={onNuevo}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-xl transition"
        >
          <Plus size={18} />
          Nuevo
        </button>
        <button
          onClick={onEliminar}
          disabled={!eliminarHabilitado}
          className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition ${eliminarHabilitado
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gray-300 text-white cursor-not-allowed"
            }`}
        >
          <Trash2 size={18} />
          Eliminar
        </button>
      </div>
    </div>
  );
}
