import { create } from "zustand";

type MarketStore = {
  selectedMarket: string;
  setSelectedMarket: (selectedMarket: string) => void;
  tradeSide: "YES" | "NO" | null;
  setTradeSide: (tradeSide: "YES" | "NO") => void;
};

export const useMarketStore = create<MarketStore>((set) => ({
  selectedMarket: "",
  setSelectedMarket: (selectedMarket) => set({ selectedMarket }),
  tradeSide: null,
  setTradeSide: (tradeSide) => set({ tradeSide }),
}));
