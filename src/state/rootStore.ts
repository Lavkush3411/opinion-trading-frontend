import { create } from 'zustand'
import { Market } from '../types/api.types'
export const useStore = create((set) => ({
  market: null,
  setMarket: (market: Market) => set({ market }),
}))
