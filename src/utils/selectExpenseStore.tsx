import { create } from "zustand";

interface SelectedExpenseStore {
    selectedId: number | null;
    setSelectedId: (id: number) => void;
    clearSelectedId: () => void;
}

export const useSelectedExpense = create<SelectedExpenseStore>((set) => ({
    selectedId: null,
    setSelectedId: (id) => set({ selectedId: id }),
    clearSelectedId: () => set({ selectedId: null }),
}));