import { create } from 'zustand'

type OrderStore = {
  showOrderBook: boolean
  setShowOrderBook: (show: boolean) => void
}
export const useOrderStore = create<OrderStore>((set) => ({
  showOrderBook: false,
  setShowOrderBook: (showOrderBook: boolean) => set({ showOrderBook }),
}))
