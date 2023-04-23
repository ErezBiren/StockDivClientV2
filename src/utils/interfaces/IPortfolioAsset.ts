import { DividendFrequencyEnum } from '../enums/DividendFrequencyEnum';

export interface IPortfolioAsset {
  logoUrl: string;
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  averagePrice: number;
  sharePrice: number;
  invested: number;
  marketValue: number;
  income: number;
  dividendYield: number;
  yoc: number;
  dividendFrequency: keyof typeof DividendFrequencyEnum;
  profitLoss: number;
  profitLossPercent: number;
  annualized: number;
  dailyChange: number;
  dailyChangePercent: number;
  tax: number;
  lastExDay: string;
  lastPayDay: string;
  dividendAmount: number;
  lastTotalDividend: number;
  lastTotalDividendYearly: number;
  mvPortion: number;
  investedPortion: number;
}
