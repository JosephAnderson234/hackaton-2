
export interface Gasto {
  id: number;
  empresa: string;
  monto: number;
  fecha: string;
}

export const gastosIniciales: Gasto[] = [
  { id: 1, empresa: "Netflix", monto: 39.90, fecha: "2025-06-15" },
  { id: 2, empresa: "Spotify", monto: 18.90, fecha: "2025-06-14" },
  { id: 3, empresa: "Supermercado Wong", monto: 150.25, fecha: "2025-06-12" },
];
