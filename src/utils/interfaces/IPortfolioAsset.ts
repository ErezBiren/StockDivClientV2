import { DividendFrequencyEnum } from "../enums/DividendFrequencyEnum";

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

export type PortfolioAssetDataGrid = {
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  averagePrice: string;
  sharePrice: string;
  marketValue: string;
  income: string;
  invested: string;
  yield: string;
  yoc: string;
  frequency: string;
  PL: string;
  PLPercent: string;
  annualized: string;
  Change: string;
  ChangePercent: string;
  tax: string;
  ex: string;
  pay: string;
  dividend: string;
  total: string;
  mvPortion: string;
  investedPortion: string;
};
