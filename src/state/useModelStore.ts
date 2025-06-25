import { create } from "zustand";

type ModelStore = {
  isTradeModalVisible: boolean;
  setIsTradeModalVisible: (isTradeModalVisible: boolean) => void;
  isCreateMarketModalVisible: boolean;
  setIsCreateMarketModalVisible: (isTradeModalVisible: boolean) => void;
};

export const useModelStore = create<ModelStore>((set) => ({
  isTradeModalVisible: false,
  setIsTradeModalVisible: (isTradeModalVisible) => set({ isTradeModalVisible }),
  isCreateMarketModalVisible: false,
  setIsCreateMarketModalVisible: (isCreateMarketModalVisible) =>
    set({ isCreateMarketModalVisible }),
}));
