import { IPortfolioAsset } from "../../utils/interfaces/IPortfolioAsset";
import { useSelector } from "react-redux";
import { useGetAssetsQuery } from "../../features/portfolio/portfolioApiSlice";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";
import useAssetsColumnDefs from "./useAssetsColumnDefs";

const AssetsGridView = () => {
  const [rowDataAssets, setRowDataAssets] = useState<IPortfolioAsset[]>([]);
  const {columnDefs} = useAssetsColumnDefs();

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getRowStyle = (params: any) => {
    if (params.node.data.id === "sum") {
      return { background: "#cfdef5" };
    }
  };

  return (
    <div className="ag-theme-alpine mt-[200px]" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowDataAssets}
        columnDefs={columnDefs}
        getRowStyle={getRowStyle}
      />
    </div>
  );
};

export default AssetsGridView;
