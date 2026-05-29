export type TodaysMarketItem = {
  id: string;
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

export type StockIdeaItem = {
  id: string;
  name: string;
  logoColor: string;
  logoLabel: string;
};

export const PORTFOLIO_OVERVIEW = {
  currentValue: '12,30,500',
  totalGain: { amount: '6200', percent: '3%' },
  totalLoss: { amount: '8420', percent: '7%' },
};

export const TODAYS_MARKET: TodaysMarketItem[] = [
  {
    id: 'nifty50',
    label: 'Nifty 50',
    value: '17,522.30',
    change: '-5.55',
    positive: false,
  },
  {
    id: 'sensex',
    label: 'Sensex',
    value: '58,786.60',
    change: '-20.46',
    positive: false,
  },
  {
    id: 'usdinr',
    label: 'USDINR',
    value: '76.0950',
    change: '0.1070',
    positive: true,
  },
  {
    id: 'gold',
    label: 'GOLD',
    value: '48,364.00',
    change: '250.00',
    positive: true,
  },
];

export const STOCK_IDEAS: StockIdeaItem[] = [
  { id: 'hdfc', name: 'HDFC Bank', logoColor: '#004C8F', logoLabel: 'H' },
  { id: 'reliance', name: 'Reliance', logoColor: '#1A3A8F', logoLabel: 'R' },
  { id: 'tcs', name: 'TCS', logoColor: '#6B21A8', logoLabel: 'T' },
  { id: 'infy', name: 'Infosys', logoColor: '#007CC3', logoLabel: 'I' },
];
