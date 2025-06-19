import type { ExpenseSummerized } from "@/types/expenseType"
interface GastoItemProps {
  gasto: ExpenseSummerized;
  onSeleccionar: (idCategory: number) => void;
}

export default function GastoItem({ gasto, onSeleccionar }: GastoItemProps) {

  return (
    <li
      className={`flex items-center justify-between p-4 rounded-xl border "border-gray-200`}
    >
      <div className="flex items-center gap-3">

        <div onClick={()=> onSeleccionar(gasto.idCategory)} className="cursor-pointer">
          <p className="text-gray-900 font-semibold">{gasto.nameCategory}</p>
        </div>
      </div>
      <p className="text-green-600 font-bold">S/. {gasto.total.toFixed(2)}</p>
    </li>
  );
}
