export interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  endDate: string;
  yesPrice: number;
  noPrice: number;
  totalVolume: number;
  createdAt: string;
  updatedAt: string;
}

export interface Trade {
  id: string;
  marketId: string;
  userId: string;
  amount: number;
  position: 'YES' | 'NO';
  price: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  balance: number;
  createdAt: string;
}

export interface MarketCategory {
  id: string;
  name: string;
  description: string;
}

export interface CreateMarketData {
  title: string;
  description: string;
  category: string;
  endDate: string;
}

export interface CreateTradeData {
  marketId: string;
  amount: number;
  position: 'YES' | 'NO';
}

export interface ResolutionData {
  resolution: 'YES' | 'NO';
  explanation: string;
} 