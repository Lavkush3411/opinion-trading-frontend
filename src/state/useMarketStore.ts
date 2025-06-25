import { create } from "zustand";

type MarketStore = {
  selectedMarket: string;
  setSelectedMarket: (selectedMarket: string) => void;
};

export const useMarketStore = create<MarketStore>((set) => ({
  selectedMarket: "",
  setSelectedMarket: (selectedMarket) => set({ selectedMarket }),
}));
