import { createSlice } from '@reduxjs/toolkit';
import { SortByEnum } from '../utils/enums/SortByEnum';
import { SortDirectionEnum } from '../utils/enums/SortDirectionEnum';
import { ViewModeEnum } from '../utils/enums/ViewModeEnum';
import { IDividendAlert } from '../utils/interfaces/IDividendAlert';
import { RootState } from '../app/store';

const initialState = {
  portfolios: [],
  selectedPortfolio: 'Portfolio',
  selectedTicker: "",
  portfolioCurrency: '',
  settings: {
    dateFormat: 'yyyy-MM-dd',
    defaultTax: 0,
    decimalDigits: 2,
    portfolioView: {
      mode: ViewModeEnum.CARD,
      sortBy: SortByEnum.PROFITLOSSPERCENT,
      sortDirection: SortDirectionEnum.DESC,
      visibleColumns: [] as string[],
    },
    screenerView: {
      mode: ViewModeEnum.CARD,
      sortBy: SortByEnum.YEARS,
      sortDirection: SortDirectionEnum.DESC,
      visibleColumns: [] as string[],
    },
  },
  dividendAlerts: [] as IDividendAlert[],
  announcements: [] as { theDate: string; theMessage: string }[],
};

export const stockdivSlice = createSlice({
  name: 'stockdiv',
  initialState,
  reducers: {
    setPortfolios: (state, action) => {
      state.portfolios = action.payload;
    },
    setSelectedPortfolio: (state, action) => {
      state.selectedPortfolio = action.payload;
    },
    setSelectedTicker: (state, action) => {
      state.selectedTicker = action.payload;
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
  setSelectedTicker,
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


export const selectCurrentPortfolio = (state: RootState) => state.stockdiv.selectedPortfolio;
export const selectCurrentTicker = (state: RootState) => state.stockdiv.selectedTicker;
