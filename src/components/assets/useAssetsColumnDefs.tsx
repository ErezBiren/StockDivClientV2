import { ColDef, ColGroupDef } from "ag-grid-community";
import useFormatHelper from "../../hooks/useFormatHelper";
import { isSameDate } from "../../utils/utils";
import { IPortfolioAsset } from "../../utils/interfaces/IPortfolioAsset";

const bgGreen = "#4caf50";
const bgRed = "#ef5350";

const bgDateGreen = "#b9f6ca";
const bgDatePurple = "#e1bee7";
const bgDefault = "transparent";

const useAssetsColumnDefs = () => {
  const { formatToCurrency, formatToPercentage } = useFormatHelper();

  const currencyValueFormatter = (params: { value: number }) =>
    params.value ? formatToCurrency(params.value) : "";
  const percentageValueFormatter = (params: { value: number }) =>
    params.value ? formatToPercentage(params.value) : "";

  const tickerCellRenderer = (props: { value: string }) => {
    return <span>{props.value}</span>;
  };

  const getExPayColor = (params: { value: string }) => {
    if (!params.value) return { backgroundColor: bgDefault };

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnDefs: (ColDef<IPortfolioAsset> | ColGroupDef<IPortfolioAsset>)[] =
    [
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellStyle: (params: any) => {
          if (!params?.value) return { backgroundColor: bgDefault };

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellStyle: (params: any) => {
          if (!params.value) return { backgroundColor: bgDefault };

          if (params.value >= 0) {
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

  return { columnDefs };
};

export default useAssetsColumnDefs;
