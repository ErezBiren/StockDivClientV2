import useFormatHelper from "../hooks/useFormatHelper";
import {
  IPortfolioAsset,
  IPortfolioAssetDataGrid,
} from "../utils/interfaces/IPortfolioAsset";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useGetAssetsQuery } from "../features/portfolio/portfolioApiSlice";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";

const AssetsGridView = () => {
  const { formatToCurrency, formatToPercentage, formatToNumber, formatToDate } =
    useFormatHelper();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "ticker" },
    { field: "name" },
    { field: "sector" },
    { field: "shares" },
    { field: "averagePrice" },
    { field: "sharePrice" },
    { field: "invested" },
    { field: "marketValue" },
    { field: "income" },
    { field: "yield" },
    { field: "yoc" },
    { field: "frequency" },
    { field: "PL" },
    { field: "PLPercent", headerName: "PL%" },
    { field: "annualized" },
    { field: "Change" },
    { field: "ChangePercent", headerName: "Change%" },
    { field: "tax" },
    { field: "ex" },
    { field: "pay" },
    { field: "dividend" },
    { field: "total" },
    { field: "lastTotalDividendYearly" },
    { field: "mvPortion" },
    { field: "investedPortion" },
  ]);

  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const { data: assets, isSuccess: isSuccessAssets } =
    useGetAssetsQuery(selectedPortfolio);

  useEffect(() => {
    if (!isSuccessAssets) return;
    const changedAssets = assets?.map((asset: IPortfolioAsset) => ({
      ticker: asset.ticker,
      name: asset.name,
      sector: asset.sector,
      shares: asset.shares,
      averagePrice: formatToCurrency(asset.averagePrice),
      sharePrice: formatToCurrency(asset.sharePrice),
      marketValue: formatToCurrency(asset.marketValue),
      income: formatToCurrency(asset.income),
      invested: formatToCurrency(asset.invested),
      yield: formatToPercentage(asset.dividendYield),
      yoc: formatToPercentage(asset.yoc),
      frequency: asset.dividendFrequency,
      PL: formatToCurrency(asset.profitLoss),
      PLPercent: formatToPercentage(asset.profitLossPercent),
      annualized: formatToPercentage(asset.annualized),
      Change: formatToCurrency(asset.dailyChange),
      ChangePercent: formatToPercentage(asset.dailyChangePercent),
      tax: formatToPercentage(asset.tax),
      ex: formatToDate(asset.lastExDay),
      pay: formatToDate(asset.lastPayDay),
      dividend: formatToCurrency(asset.dividendAmount),
      total: formatToCurrency(asset.lastTotalDividend),
    }));
    setRowData(changedAssets);
  }, [assets, formatToCurrency, formatToPercentage, isSuccessAssets]);

  const gotoTickerPage = (ticker: string) => {
    navigate(`/ticker/${ticker}`);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default AssetsGridView;
