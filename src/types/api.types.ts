export interface Market {
  id: string;
  question: string;
  description: string;
  category?: string;
  result: string | null;
  // endDate: string;
  yesPrice: number;
  noPrice: number;
}
export interface Order {
 quantity: number,
 price: number,
 side: "favour" | "against",
}

export interface MarketDepth{
  order_book:{ 
  favour:Order[],
  against:Order[]
}
}

export interface UserType {
  id: string,
  name: string,
  email: string,
  password: string,
  created_at: string,
  updated_at: string,
  balance: number,
  hold_balance: number,
}

export interface Order {
  id: string;
  opinionId: string;
  userId: string;
  quantity:number;
  amount: number;
  side: "favour" | "against";
  price: number;
  createdAt: string;
}

export interface TradeModel {
  id: string;
  opinionId: string;
  favourUserId: string;
  againstUserId: string;
  favourPrice: number;
  againstPrice: number;
  quantity: number;
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
  marketId:string;
  quantity:number;
  price: number;
  side: "favour" | "against";
}

export interface ResolutionData {
  resolution: "YES" | "NO";
  explanation: string;
}
