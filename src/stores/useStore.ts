import { create } from "zustand";

interface AppState {
    selectedCommission: {
        tab: number | null,
        index: number | null,
        id: number | null
    },
    setSelectedCommission: (tab: number, index: number, id: number) => void,
}

const useStore = create<AppState>((set) => ({
    selectedCommission: {
        tab: null,
        id: null,
        index: 0
    },
    setSelectedCommission: (tab, index, id) => set({ selectedCommission: { tab, index, id } })
}))

export default useStore;
