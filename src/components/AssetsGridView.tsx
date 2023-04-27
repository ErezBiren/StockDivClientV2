import useFormatHelper from "../hooks/useFormatHelper";
import { IPortfolioAsset } from "../utils/interfaces/IPortfolioAsset";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useGetAssetsQuery } from "../features/portfolio/portfolioApiSlice";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import { isSameDate } from "../utils/utils";

const bgGreen = "#4caf50";
const bgRed = "#ef5350";

const bgDateGreen = "#b9f6ca";
const bgDatePurple = "#e1bee7";

const getExPayColor = (params: { value: any }) => {
  if (!params.value) return {};

  const value = params.value;

  if (
    new Date(value).getFullYear() < new Date().getFullYear() ||
    new Date(value).getMonth() < new Date().getMonth()
  )
    return { backgroundColor: bgDateGreen };
  else
    return isSameDate(new Date(), new Date(value)) //TODO: removed last parameter month, could cause bug
      ? { backgroundColor: bgDateGreen }
      : { backgroundColor: bgDatePurple };
};

const columnDefs = [
  {
    field: "ticker",
    cellStyle: { backgroundColor: "#cfdef5" },
  },
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
  {
    field: "PL",
  },
  {
    field: "PLPercent",
    headerName: "PL%",
    cellStyle: (params) => {
      if (!params.value) return;

      const value = Number(params.value.replace("%", ""));

      if (value > 0) {
        return { backgroundColor: bgGreen };
      }
      return { backgroundColor: bgRed };
    },
  },
  { field: "annualized" },
  {
    field: "Change",
  },
  {
    field: "ChangePercent",
    headerName: "Change%",
    cellStyle: (params) => {
      if (!params.value) return {};

      if (params.value[0] !== "-") {
        return { backgroundColor: bgGreen };
      }
      return { backgroundColor: bgRed };
    },
  },
  { field: "tax" },
  {
    field: "ex",
    cellStyle: getExPayColor,
  },
  { field: "pay", cellStyle: getExPayColor },
  { field: "dividend" },
  { field: "total" },
  { field: "lastTotalDividendYearly" },
  { field: "mvPortion", headerName: "Portion% (MV)" },
  { field: "investedPortion", headerName: "Portion% (invested)" },
];

const AssetsGridView = () => {
  const { formatToCurrency, formatToPercentage, formatToNumber, formatToDate } =
    useFormatHelper();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

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
      mvPortion: formatToPercentage(asset.mvPortion),
      investedPortion: formatToPercentage(asset.investedPortion),
    }));

    const sums = {
      pl: 0,
      invested: 0,
      marketValue: 0,
      income: 0,
      yield: 0,
      yoc: 0,
      change: 0,
    };

    assets.forEach((element: IPortfolioAsset) => {
      sums.pl += element.profitLoss;
      sums.invested += element.invested;
      sums.income += element.income;
      sums.marketValue += element.marketValue;
      sums.yield += element.dividendYield;
      sums.yoc += element.yoc;
      sums.change += element.dailyChange;
    });

    const sumRow = {
      id: "sum",
      PL: formatToCurrency(sums.pl),
      invested: formatToCurrency(sums.invested),
      income: formatToCurrency(sums.income),
      marketValue: formatToCurrency(sums.marketValue),
      yield: formatToCurrency(sums.yield),
      yoc: formatToCurrency(sums.yoc),
      change: formatToCurrency(sums.change),
    };

    changedAssets.push(sumRow);

    setRowData(changedAssets);
  }, [assets, formatToCurrency, formatToPercentage, isSuccessAssets]);

  const gotoTickerPage = (ticker: string) => {
    navigate(`/ticker/${ticker}`);
  };

  const getRowStyle = (params) => {
    if (params.node.data.id === "sum") {
      return { background: "#cfdef5" };
    }
  };

  return (
    <div className="ag-theme-alpine " style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        getRowStyle={getRowStyle}
      />
    </div>
  );
};

export default AssetsGridView;
