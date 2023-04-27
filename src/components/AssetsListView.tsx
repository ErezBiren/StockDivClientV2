import useFormatHelper from "../hooks/useFormatHelper";
import { IPortfolioAsset } from "../utils/interfaces/IPortfolioAsset";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useGetAssetsQuery } from "../features/portfolio/portfolioApiSlice";
import { useNavigate } from "react-router-dom";

type AssetsFieldProps = {
  fileName: string;
  fieldValue: string | number;
  textAlign?: string;
};

const AssetsField = ({ fileName, fieldValue, textAlign }: AssetsFieldProps) => {
  return (
    <span className={"font-bold " + textAlign}>
      {fileName}: <span className="font-normal">{fieldValue}</span>
    </span>
  );
};

const AssetsListView = () => {
  const navigate = useNavigate();

  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const { data: assets } = useGetAssetsQuery(selectedPortfolio);

  const { formatToCurrency, formatToPercentage, formatToNumber, formatToDate } =
    useFormatHelper();

  const gotoTickerPage = (ticker: string) => {
    navigate(`/ticker/${ticker}`);
  };

  return (
    <div className="flex flex-col gap-10 mt-[200px]">
      {assets?.map((item: IPortfolioAsset) => (
        <section
          key={item.ticker}
          className="h-[300px] bg-[#E1F5FE] cursor-pointer shadow-xl mx-10"
          onClick={() => gotoTickerPage(item.ticker)}
        >
          <div className="flex flex-row justify-center ">
            <img src={item.logoUrl} width="16px" height="16px" />
            <span>{item.ticker}:</span>
            <span>{item.sector}</span>
          </div>
          <div className="text-center">
            {formatToNumber(item.shares)} shares of {item.name}
          </div>
          <div className="text-center">
            Income: {formatToCurrency(item.income)}
          </div>
          <div className="flex flex-row justify-center gap-5">
            <span className="flex flex-col">
              <AssetsField
                fileName="Current price"
                fieldValue={item.sharePrice}
              />
              <AssetsField
                fileName="Yield"
                fieldValue={formatToPercentage(item.dividendYield)}
              />
              <AssetsField
                fileName="Frequency"
                fieldValue={item.dividendFrequency}
              />
              <AssetsField
                fileName="Annualized"
                fieldValue={formatToPercentage(item.annualized)}
              />
              <AssetsField
                fileName="Ex"
                fieldValue={formatToDate(item.lastExDay)}
              />
              <AssetsField
                fileName="Amount"
                fieldValue={formatToCurrency(item.dividendAmount)}
              />
              <AssetsField
                fileName="Portion (invested)"
                fieldValue={formatToPercentage(item.investedPortion)}
              />
            </span>
            <span className="w-[1px] bg-slate-400"></span>
            <span className="flex flex-col">
              <AssetsField
                fileName="Average price"
                fieldValue={formatToCurrency(item.averagePrice)}
              />
              <AssetsField
                fileName="YOC"
                fieldValue={formatToPercentage(item.yoc)}
              />
              <AssetsField
                fileName="Tax"
                fieldValue={formatToPercentage(item.tax)}
              />
              <AssetsField
                fileName="Portion (mv)"
                fieldValue={formatToPercentage(item.mvPortion)}
              />
              <AssetsField
                fileName="Pay"
                fieldValue={formatToDate(item.lastPayDay)}
              />
              <AssetsField
                fileName="Total"
                fieldValue={formatToCurrency(item.lastTotalDividend)}
              />
            </span>
          </div>
        </section>
      ))}
    </div>
  );
};

export default AssetsListView;
