import { Plus, Trash2 } from "lucide-react";
import { MONTHS, YEARS } from "@utils/constants";

interface GastosFilterProps {
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  year: number | null;
  month: number | null;
}

export default function GastosFilter({ setYear, setMonth, year, month }: GastosFilterProps) {
  return (

    <div className="flex gap-3 p-3">
      <select
        value={year ?? ""}
        onChange={(e) => setYear(Number(e.target.value))}
        className="border p-1 rounded"
      >
        <option value="">Seleccionar año</option>
        {YEARS.map((y, idx) => (
          <option key={idx} value={y.value}>
            {y.name}
          </option>
        ))}
      </select>
      <select
        value={month ?? ""}
        onChange={(e) => setMonth(Number(e.target.value))}
        className="border p-1 rounded"
      >
        <option value="">Seleccionar mes</option>
        {MONTHS.map((m, idx) => (
          <option key={idx} value={m.value}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  );
}
