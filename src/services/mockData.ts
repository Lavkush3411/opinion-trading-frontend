import { Market, MarketCategory, UserProfile } from '../types/api.types';

export const mockMarkets: Market[] = [
  {
    id: '1',
    title: 'Will Bitcoin reach $100k in 2024?',
    description: 'Predict if Bitcoin will reach $100,000 by the end of 2024.',
    category: 'crypto',
    endDate: '2024-12-31',
    resolution: null,
    yesPrice: 0.65,
    noPrice: 0.35,
    totalVolume: 1000000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Will AI replace 50% of jobs by 2030?',
    description: 'Predict if artificial intelligence will replace 50% of current jobs by 2030.',
    category: 'technology',
    endDate: '2030-12-31',
    resolution: null,
    yesPrice: 0.45,
    noPrice: 0.55,
    totalVolume: 750000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '3',
    title: 'Will Tesla stock double in 2024?',
    description: 'Predict if Tesla stock price will double from its current value by the end of 2024.',
    category: 'stocks',
    endDate: '2024-12-31',
    resolution: null,
    yesPrice: 0.30,
    noPrice: 0.70,
    totalVolume: 500000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

export const mockCategories: MarketCategory[] = [
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    description: 'Markets related to cryptocurrencies and blockchain',
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Markets related to technology and innovation',
  },
  {
    id: 'stocks',
    name: 'Stocks',
    description: 'Markets related to stock market and companies',
  },
];

export const mockUserProfile: UserProfile = {
  id: '1',
  username: 'trader123',
  email: 'trader@example.com',
  balance: 10000,
  createdAt: '2024-01-01',
}; 