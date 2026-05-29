export type MarketSparkline = readonly number[];

export type IndexCardData = {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline: MarketSparkline;
};

export type MostActiveData = {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  logoColor: string;
  sparkline: MarketSparkline;
};

export const INDEX_CARDS: IndexCardData[] = [
  {
    id: 'dji',
    name: 'Dow Jones',
    ticker: 'DJI',
    price: 35752.89,
    change: 261.19,
    changePercent: 0.74,
    sparkline: [0.42, 0.45, 0.44, 0.48, 0.47, 0.52, 0.5, 0.55, 0.53, 0.58, 0.56, 0.62, 0.6, 0.68, 0.72, 0.7, 0.78, 0.82, 0.88, 1],
  },
  {
    id: 'spx',
    name: 'S&P 500',
    ticker: 'SPX',
    price: 4704.54,
    change: 53.85,
    changePercent: 1.16,
    sparkline: [0.38, 0.4, 0.42, 0.41, 0.45, 0.48, 0.5, 0.52, 0.55, 0.54, 0.58, 0.62, 0.65, 0.68, 0.72, 0.75, 0.8, 0.85, 0.92, 1],
  },
  {
    id: 'ixic',
    name: 'NASDAQ',
    ticker: 'IXIC',
    price: 15686.92,
    change: -88.54,
    changePercent: -0.56,
    sparkline: [1, 0.95, 0.92, 0.88, 0.9, 0.85, 0.82, 0.78, 0.8, 0.75, 0.72, 0.68, 0.7, 0.65, 0.62, 0.58, 0.55, 0.52, 0.48, 0.45],
  },
  {
    id: 'aapl',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    price: 176.23,
    change: 2.65,
    changePercent: 1.53,
    sparkline: [0.35, 0.38, 0.4, 0.42, 0.45, 0.48, 0.5, 0.52, 0.55, 0.58, 0.6, 0.65, 0.68, 0.72, 0.75, 0.78, 0.82, 0.88, 0.94, 1],
  },
  {
    id: 'nvda',
    name: 'NVIDIA',
    ticker: 'NVDA',
    price: 495.22,
    change: 12.4,
    changePercent: 2.57,
    sparkline: [0.3, 0.32, 0.35, 0.38, 0.42, 0.45, 0.5, 0.48, 0.52, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 0.98, 1],
  },
  {
    id: 'ftse',
    name: 'FTSE 100',
    ticker: 'FTSE',
    price: 7215.4,
    change: -42.18,
    changePercent: -0.58,
    sparkline: [0.92, 0.88, 0.85, 0.82, 0.78, 0.75, 0.72, 0.68, 0.65, 0.62, 0.58, 0.55, 0.52, 0.48, 0.45, 0.42, 0.38, 0.35, 0.32, 0.3],
  },
];

export const MOST_ACTIVES: MostActiveData[] = [
  {
    id: 'aapl',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    price: 176.23,
    change: 2.65,
    logoColor: '#555555',
    sparkline: [0.4, 0.42, 0.45, 0.48, 0.5, 0.52, 0.55, 0.58, 0.62, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
  },
  {
    id: 'nvda',
    name: 'NVIDIA',
    ticker: 'NVDA',
    price: 495.22,
    change: 12.4,
    logoColor: '#76B900',
    sparkline: [0.35, 0.38, 0.42, 0.45, 0.5, 0.48, 0.52, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
  },
  {
    id: 'zm',
    name: 'Zoom',
    ticker: 'ZM',
    price: 178.5,
    change: -1.82,
    logoColor: '#2D8CFF',
    sparkline: [0.85, 0.82, 0.78, 0.75, 0.72, 0.68, 0.65, 0.62, 0.58, 0.55, 0.52, 0.48, 0.45, 0.42, 0.38, 0.35, 0.32],
  },
  {
    id: 'nio',
    name: 'NIO Inc.',
    ticker: 'NIO',
    price: 21.34,
    change: -0.45,
    logoColor: '#0099CC',
    sparkline: [0.9, 0.85, 0.82, 0.78, 0.75, 0.7, 0.68, 0.65, 0.6, 0.58, 0.55, 0.5, 0.48, 0.42, 0.38, 0.35, 0.3],
  },
  {
    id: 'msft',
    name: 'Microsoft',
    ticker: 'MSFT',
    price: 378.91,
    change: 4.12,
    logoColor: '#00A4EF',
    sparkline: [0.38, 0.4, 0.43, 0.45, 0.48, 0.5, 0.53, 0.55, 0.58, 0.62, 0.65, 0.68, 0.72, 0.76, 0.8, 0.88, 1],
  },
  {
    id: 'googl',
    name: 'Alphabet',
    ticker: 'GOOGL',
    price: 141.8,
    change: 1.95,
    logoColor: '#4285F4',
    sparkline: [0.42, 0.44, 0.46, 0.48, 0.5, 0.52, 0.55, 0.57, 0.6, 0.63, 0.66, 0.7, 0.74, 0.78, 0.84, 0.9, 1],
  },
  {
    id: 'amzn',
    name: 'Amazon',
    ticker: 'AMZN',
    price: 178.25,
    change: -2.34,
    logoColor: '#FF9900',
    sparkline: [0.88, 0.85, 0.82, 0.8, 0.78, 0.75, 0.72, 0.7, 0.68, 0.65, 0.62, 0.58, 0.55, 0.5, 0.45, 0.4, 0.35],
  },
  {
    id: 'tsla',
    name: 'Tesla',
    ticker: 'TSLA',
    price: 248.42,
    change: 6.78,
    logoColor: '#CC0000',
    sparkline: [0.32, 0.35, 0.38, 0.4, 0.45, 0.48, 0.52, 0.55, 0.58, 0.62, 0.66, 0.7, 0.75, 0.8, 0.86, 0.92, 1],
  },
  {
    id: 'meta',
    name: 'Meta',
    ticker: 'META',
    price: 505.75,
    change: 8.21,
    logoColor: '#0668E1',
    sparkline: [0.36, 0.38, 0.4, 0.43, 0.46, 0.5, 0.52, 0.55, 0.58, 0.62, 0.66, 0.7, 0.74, 0.8, 0.86, 0.92, 1],
  },
  {
    id: 'amd',
    name: 'AMD',
    ticker: 'AMD',
    price: 162.18,
    change: -3.45,
    logoColor: '#ED1C24',
    sparkline: [0.92, 0.88, 0.85, 0.82, 0.78, 0.75, 0.72, 0.68, 0.65, 0.62, 0.58, 0.54, 0.5, 0.46, 0.42, 0.38, 0.34],
  },
  {
    id: 'nflx',
    name: 'Netflix',
    ticker: 'NFLX',
    price: 628.4,
    change: 12.6,
    logoColor: '#E50914',
    sparkline: [0.34, 0.36, 0.38, 0.42, 0.45, 0.48, 0.52, 0.55, 0.58, 0.62, 0.66, 0.7, 0.75, 0.8, 0.86, 0.92, 1],
  },
  {
    id: 'dis',
    name: 'Disney',
    ticker: 'DIS',
    price: 112.55,
    change: -0.88,
    logoColor: '#113CCF',
    sparkline: [0.78, 0.75, 0.72, 0.7, 0.68, 0.65, 0.62, 0.6, 0.58, 0.55, 0.52, 0.48, 0.45, 0.42, 0.38, 0.35, 0.32],
  },
  {
    id: 'coin',
    name: 'Coinbase',
    ticker: 'COIN',
    price: 245.9,
    change: 15.2,
    logoColor: '#0052FF',
    sparkline: [0.28, 0.3, 0.34, 0.38, 0.42, 0.46, 0.5, 0.54, 0.58, 0.62, 0.66, 0.7, 0.76, 0.82, 0.88, 0.94, 1],
  },
  {
    id: 'pltr',
    name: 'Palantir',
    ticker: 'PLTR',
    price: 24.85,
    change: 0.62,
    logoColor: '#101820',
    sparkline: [0.45, 0.46, 0.48, 0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, 0.64, 0.66, 0.7, 0.74, 0.78, 0.84, 0.9],
  },
  {
    id: 'sofi',
    name: 'SoFi',
    ticker: 'SOFI',
    price: 8.42,
    change: -0.18,
    logoColor: '#00A2E0',
    sparkline: [0.82, 0.78, 0.75, 0.72, 0.68, 0.65, 0.62, 0.58, 0.55, 0.52, 0.48, 0.45, 0.42, 0.38, 0.35, 0.32, 0.28],
  },
  {
    id: 'rivn',
    name: 'Rivian',
    ticker: 'RIVN',
    price: 12.67,
    change: 0.34,
    logoColor: '#567B1C',
    sparkline: [0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, 0.66, 0.7, 0.76, 0.82, 0.88],
  },
  {
    id: 'intc',
    name: 'Intel',
    ticker: 'INTC',
    price: 43.12,
    change: -1.05,
    logoColor: '#0071C5',
    sparkline: [0.86, 0.82, 0.78, 0.75, 0.72, 0.68, 0.65, 0.62, 0.58, 0.55, 0.52, 0.48, 0.44, 0.4, 0.36, 0.32, 0.28],
  },
];

export function formatPrice(value: number): string {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}`;
}

export function formatChangePercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `(${sign}${value.toFixed(2)}%)`;
}
