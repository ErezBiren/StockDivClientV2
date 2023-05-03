import useFormatHelper from "../hooks/useFormatHelper";
import { IPortfolioAsset } from "../utils/interfaces/IPortfolioAsset";
import { useSelector } from "react-redux";
import { useGetAssetsQuery } from "../features/portfolio/portfolioApiSlice";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import { isSameDate } from "../utils/utils";
import { selectCurrentPortfolio, setSelectedTicker } from "../features/stockdivSlice";

const bgGreen = "#4caf50";
const bgRed = "#ef5350";

const bgDateGreen = "#b9f6ca";
const bgDatePurple = "#e1bee7";

const getExPayColor = (params: { value: string }) => {
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

const tickerCellRenderer = (props) => {
  return <span>{props.value}</span>;
};

const AssetsGridView = () => {
  const { formatToCurrency, formatToPercentage, formatToNumber, formatToDate } =
    useFormatHelper();
  const navigate = useNavigate();
  const [rowDataAssets, setRowDataAssets] = useState<IPortfolioAsset[]>([]);
  const currencyValueFormatter = (params) =>
    params.value ? formatToCurrency(params.value) : "";
  const percentageValueFormatter = (params) =>
    params.value ? formatToPercentage(params.value) : "";

  const columnDefs = [
    {
      field: "ticker",
      cellStyle: { backgroundColor: "#cfdef5" },
      cellRenderer: tickerCellRenderer,
    },
    { field: "name" },
    { field: "sector" },
    { field: "shares" },
    {
      field: "averagePrice",
      valueFormatter: currencyValueFormatter,
    },
    { field: "sharePrice", valueFormatter: currencyValueFormatter },
    { field: "invested", valueFormatter: currencyValueFormatter },
    { field: "marketValue", valueFormatter: currencyValueFormatter },
    {
      field: "income",
      valueFormatter: currencyValueFormatter,
    },
    {
      field: "dividendYield",
      headerName: "Yield",
      valueFormatter: percentageValueFormatter,
    },
    {
      field: "yoc",
      headerName: "YOC",
      valueFormatter: percentageValueFormatter,
    },
    { field: "dividendFrequency", headerName: "Frequency" },
    {
      field: "profitLoss",
      headerName: "PL%",
      valueFormatter: currencyValueFormatter,
    },
    {
      field: "profitLossPercent",
      headerName: "PL%",
      valueFormatter: percentageValueFormatter,
      cellStyle: (params) => {
        if (!params?.value) return {};

        if (params.value > 0) {
          return { backgroundColor: bgGreen };
        }
        return { backgroundColor: bgRed };
      },
    },
    { field: "annualized", valueFormatter: percentageValueFormatter },
    {
      field: "dailyChange",
      headerName: "Change",
      valueFormatter: currencyValueFormatter,
    },
    {
      field: "dailyChangePercent",
      headerName: "Change%",
      valueFormatter: percentageValueFormatter,
      cellStyle: (params) => {
        if (!params.value) return {};

        if (params.value[0] !== "-") {
          return { backgroundColor: bgGreen };
        }
        return { backgroundColor: bgRed };
      },
    },
    { field: "tax", valueFormatter: percentageValueFormatter },
    {
      field: "lastExDay",
      headerName: "ex",
      cellStyle: getExPayColor,
    },
    { field: "lastPayDay", headerName: "pay", cellStyle: getExPayColor },
    {
      field: "dividendAmount",
      headerName: "dividend",
      valueFormatter: currencyValueFormatter,
    },
    {
      field: "lastTotalDividend",
      headerName: "total",
      valueFormatter: currencyValueFormatter,
    },
    {
      field: "mvPortion",
      headerName: "Portion% (MV)",
      valueFormatter: percentageValueFormatter,
    },
    {
      field: "investedPortion",
      headerName: "Portion% (invested)",
      valueFormatter: percentageValueFormatter,
    },
  ];

  const selectedPortfolio = useSelector(selectCurrentPortfolio);

  const { data: assets, isSuccess: isSuccessAssets } =
    useGetAssetsQuery(selectedPortfolio);

  useEffect(() => {
    if (!isSuccessAssets) return;

    const sums = {
      profitLoss: 0,
      invested: 0,
      marketValue: 0,
      income: 0,
      dividendYield: 0,
      yoc: 0,
      dailyChange: 0,
    };

    assets.forEach((element: IPortfolioAsset) => {
      sums.profitLoss += element.profitLoss;
      sums.invested += element.invested;
      sums.income += element.income;
      sums.marketValue += element.marketValue;
      sums.dividendYield += element.dividendYield;
      sums.yoc += element.yoc;
      sums.dailyChange += element.dailyChange;
    });

    const sumRow = {
      id: "sum",
      profitLoss: sums.profitLoss,
      invested: sums.invested,
      income: sums.income,
      marketValue: sums.marketValue,
      dividendYield: sums.dividendYield,
      yoc: sums.yoc,
      dailyChange: sums.dailyChange,
    };

    setRowDataAssets([...assets, sumRow]);
  }, [isSuccessAssets, assets]);

  const gotoTickerPage = (ticker: string) => {
    setSelectedTicker(ticker);
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
        rowData={rowDataAssets}
        columnDefs={columnDefs}
        getRowStyle={getRowStyle}
      />
    </div>
  );
};

export default AssetsGridView;
