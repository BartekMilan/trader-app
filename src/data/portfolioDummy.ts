import type { MarketSparkline } from './marketDummy';

export type PerformancePeriod = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

export type PortfolioSummary = {
  totalBalance: number;
  dayChange: number;
  dayChangePercent: number;
  invested: number;
  availableCash: number;
};

export type AllocationItem = {
  id: string;
  label: string;
  percent: number;
  color: string;
};

export type HoldingData = {
  id: string;
  name: string;
  ticker: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  logoColor: string;
  sparkline: MarketSparkline;
};

export const PORTFOLIO_SUMMARY: PortfolioSummary = {
  totalBalance: 127842.5,
  dayChange: 1284.32,
  dayChangePercent: 1.02,
  invested: 118420.0,
  availableCash: 9422.5,
};

export const PERFORMANCE_PERIODS: PerformancePeriod[] = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

export const PERFORMANCE_SPARKLINES: Record<PerformancePeriod, MarketSparkline> = {
  '1D': [0.62, 0.6, 0.58, 0.61, 0.59, 0.63, 0.65, 0.64, 0.68, 0.66, 0.7, 0.72, 0.71, 0.75, 0.78, 0.82, 0.85, 0.88, 0.92, 1],
  '1W': [0.45, 0.48, 0.46, 0.5, 0.52, 0.49, 0.54, 0.58, 0.55, 0.6, 0.62, 0.65, 0.68, 0.72, 0.75, 0.78, 0.82, 0.86, 0.92, 1],
  '1M': [0.32, 0.35, 0.38, 0.36, 0.4, 0.42, 0.45, 0.48, 0.46, 0.52, 0.55, 0.58, 0.62, 0.65, 0.7, 0.74, 0.78, 0.84, 0.9, 1],
  '3M': [0.28, 0.3, 0.32, 0.35, 0.38, 0.36, 0.4, 0.42, 0.45, 0.48, 0.52, 0.55, 0.58, 0.62, 0.66, 0.72, 0.78, 0.85, 0.92, 1],
  '1Y': [0.18, 0.2, 0.22, 0.25, 0.28, 0.3, 0.32, 0.35, 0.38, 0.42, 0.45, 0.5, 0.55, 0.6, 0.65, 0.72, 0.78, 0.86, 0.94, 1],
  ALL: [0.12, 0.14, 0.16, 0.18, 0.2, 0.22, 0.25, 0.28, 0.32, 0.35, 0.4, 0.45, 0.52, 0.58, 0.65, 0.72, 0.8, 0.88, 0.95, 1],
};

export const PERFORMANCE_CHANGE: Record<PerformancePeriod, { value: number; percent: number }> = {
  '1D': { value: 1284.32, percent: 1.02 },
  '1W': { value: 3420.18, percent: 2.75 },
  '1M': { value: 8945.6, percent: 7.52 },
  '3M': { value: 15230.4, percent: 13.54 },
  '1Y': { value: 28450.0, percent: 28.67 },
  ALL: { value: 42180.0, percent: 49.23 },
};

export const ALLOCATION: AllocationItem[] = [
  { id: 'stocks', label: 'Stocks', percent: 58, color: '#3DD6A8' },
  { id: 'etfs', label: 'ETFs', percent: 24, color: '#60A5FA' },
  { id: 'crypto', label: 'Crypto', percent: 12, color: '#FBBF24' },
  { id: 'cash', label: 'Cash', percent: 6, color: '#A78BFA' },
];

export const HOLDINGS: HoldingData[] = [
  {
    id: 'aapl',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    shares: 42,
    avgCost: 148.2,
    currentPrice: 176.23,
    logoColor: '#555555',
    sparkline: [0.4, 0.42, 0.45, 0.48, 0.5, 0.52, 0.55, 0.58, 0.62, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
  },
  {
    id: 'nvda',
    name: 'NVIDIA',
    ticker: 'NVDA',
    shares: 18,
    avgCost: 312.5,
    currentPrice: 495.22,
    logoColor: '#76B900',
    sparkline: [0.35, 0.38, 0.42, 0.45, 0.5, 0.48, 0.52, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
  },
  {
    id: 'voo',
    name: 'Vanguard S&P 500',
    ticker: 'VOO',
    shares: 25,
    avgCost: 382.1,
    currentPrice: 468.75,
    logoColor: '#991B1B',
    sparkline: [0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.52, 0.55, 0.58, 0.62, 0.66, 0.7, 0.74, 0.78, 0.84, 0.9],
  },
  {
    id: 'msft',
    name: 'Microsoft',
    ticker: 'MSFT',
    shares: 15,
    avgCost: 298.4,
    currentPrice: 378.91,
    logoColor: '#00A4EF',
    sparkline: [0.38, 0.4, 0.43, 0.45, 0.48, 0.5, 0.53, 0.55, 0.58, 0.62, 0.65, 0.68, 0.72, 0.76, 0.8, 0.88, 1],
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    ticker: 'BTC',
    shares: 0.42,
    avgCost: 42100,
    currentPrice: 68250,
    logoColor: '#F7931A',
    sparkline: [0.32, 0.35, 0.38, 0.42, 0.45, 0.48, 0.52, 0.55, 0.58, 0.62, 0.66, 0.7, 0.74, 0.78, 0.84, 0.9, 1],
  },
  {
    id: 'tsla',
    name: 'Tesla',
    ticker: 'TSLA',
    shares: 22,
    avgCost: 198.6,
    currentPrice: 248.42,
    logoColor: '#CC0000',
    sparkline: [0.32, 0.35, 0.38, 0.4, 0.45, 0.48, 0.52, 0.55, 0.58, 0.62, 0.66, 0.7, 0.75, 0.8, 0.86, 0.92, 1],
  },
];

export function formatPortfolioCurrency(value: number): string {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPortfolioChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${formatPortfolioCurrency(value)}`;
}

export function formatPortfolioPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatShares(value: number): string {
  if (Number.isInteger(value)) {
    return value.toString();
  }
  return value.toFixed(2);
}
