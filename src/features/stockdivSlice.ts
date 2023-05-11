import { createSlice } from "@reduxjs/toolkit";
import { SortByEnum } from "../utils/enums/SortByEnum";
import { SortDirectionEnum } from "../utils/enums/SortDirectionEnum";
import { ViewModeEnum } from "../utils/enums/ViewModeEnum";
import { IDividendAlert } from "../utils/interfaces/IDividendAlert";
import { RootState } from "../app/store";

type StockDivStateType = {
  portfolios: any[];
  selectedPortfolio: string;
  portfolioCurrency: string;
  settings: {
    dateFormat: string;
    defaultTax: number;
    decimalDigits: number;
    portfolioView: {
      mode: ViewModeEnum;
      sortBy: SortByEnum;
      sortDirection: SortDirectionEnum;
      visibleColumns: Array<string>;
    };
    screenerView: {
      mode: ViewModeEnum;
      sortBy: SortByEnum;
      sortDirection: SortDirectionEnum;
      visibleColumns: Array<string>;
    };
  };
  dividendAlerts: Array<IDividendAlert>;
  announcements: Array<{ theDate: string; theMessage: string }>;
};

const initialState: StockDivStateType = {
  portfolios: [],
  selectedPortfolio: "Portfolio",
  portfolioCurrency: "",
  settings: {
    dateFormat: "yyyy-MM-dd",
    defaultTax: 0,
    decimalDigits: 2,
    portfolioView: {
      mode: ViewModeEnum.CARD,
      sortBy: SortByEnum.ProfitLossPercent,
      sortDirection: SortDirectionEnum.DESC,
      visibleColumns: [] as string[],
    },
    screenerView: {
      mode: ViewModeEnum.CARD,
      sortBy: SortByEnum.Years,
      sortDirection: SortDirectionEnum.DESC,
      visibleColumns: [] as string[],
    },
  },
  dividendAlerts: [] as IDividendAlert[],
  announcements: [] as { theDate: string; theMessage: string }[],
};

export const stockdivSlice = createSlice({
  name: "stockdiv",
  initialState,
  reducers: {
    setPortfolios: (state, action) => {
      state.portfolios = action.payload;
    },
    setSelectedPortfolio: (state, action) => {
      state.selectedPortfolio = action.payload;
    },
    setPortfolioCurrency: (state, action) => {
      state.portfolioCurrency = action.payload;
    },
    setDateFormat: (state, action) => {
      state.settings.dateFormat = action.payload;
    },
    setDefaultTax: (state, action) => {
      state.settings.defaultTax = action.payload;
    },
    setDecimalDigits: (state, action) => {
      state.settings.decimalDigits = action.payload;
    },
    setPortfolioView: (state, action) => {
      state.settings.portfolioView = action.payload;
    },
    setScreenerViewMode: (state, action) => {
      state.settings.screenerView = action.payload;
    },
    setDividendAlerts: (state, action) => {
      state.dividendAlerts = action.payload;
    },
    setAnnouncements: (state, action) => {
      state.announcements = action.payload;
    },
  },
});

export const {
  setPortfolios,
  setSelectedPortfolio,
  setPortfolioCurrency,
  setDateFormat,
  setDefaultTax,
  setDecimalDigits,
  setPortfolioView,
  setScreenerViewMode,
  setDividendAlerts,
  setAnnouncements,
} = stockdivSlice.actions;

export default stockdivSlice.reducer;

export const selectCurrentPortfolio = (state: RootState) =>
  state.stockdiv.selectedPortfolio;
export const selectPortfolioView = (state: RootState) =>
  state.stockdiv.settings.portfolioView;
