import type { ExpenseSummary } from "@/types/expenseType"

interface GastoItemProps {
  gasto: ExpenseSummary;
  seleccionado: boolean;
  onSeleccionar: (id: number) => void;
}

export default function GastoItem({ gasto, seleccionado, onSeleccionar }: GastoItemProps) {
  return (
    <li
      className={`flex items-center justify-between p-4 rounded-xl border ${seleccionado ? "border-green-500 bg-green-50" : "border-gray-200"
        }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="gastoSeleccionado"
          checked={seleccionado}
          onClick={() => onSeleccionar(gasto.id)}
          className="accent-green-500 w-5 h-5"
        />
        <div>
          <p className="text-gray-900 font-semibold">{gasto.expenseCategory.name}</p>
          <p className="text-xs text-gray-500"> {gasto.year}- {gasto.month}</p>
        </div>
      </div>
      <p className="text-green-600 font-bold">S/. {gasto.amount.toFixed(2)}</p>
    </li>
  );
}
