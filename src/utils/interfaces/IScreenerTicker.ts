import { DividendFrequencyEnum } from '../enums/DividendFrequencyEnum';

export interface IScreenerTicker {
  logoUrl: string;
  ticker: string;
  name: string;
  sector: string;
  yearsIncrease: number;
  sharePrice: number;
  frequency: keyof typeof DividendFrequencyEnum;
  lastExDay: string;
  lastPayDay: string;
  dividendAmount: number;
  pe: number;
  fpe: number;
  beta: number;
  high52w: number;
  low52w: number;
  payoutRatio: number;
  dividendYield: number;
  marketCapital: number;
  dgr1: number;
  dgr3: number;
  dgr5: number;
  dgr10: number;
  debtEquity: number;
  cccList: boolean;
  inPortfolio: boolean;
  dailyChange: number;
  dailyChangePercent: number;
}
