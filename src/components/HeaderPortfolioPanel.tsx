import { BiCalendarEvent } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import useFormatHelper from "../hooks/useFormatHelper";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  useGetDailyChangeQuery,
  useGetInvestedQuery,
  useGetLastTotalDividendQuery,
  useGetMarketValueQuery,
} from "../features/portfolio/portfolioApiSlice";
import { useNavigate } from "react-router-dom";

const HeaderPortfolioPanel = () => {
  const navigate = useNavigate();
  const { formatToCurrency, formatToPercentage } = useFormatHelper();

  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const { data: dailyChange } = useGetDailyChangeQuery(selectedPortfolio);
  const { data: portfolioLastTotalDividend } =
    useGetLastTotalDividendQuery(selectedPortfolio);

  const {
    data: portfolioMarketValue,
    isSuccess: isSuccessPortfolioMarketValue,
  } = useGetMarketValueQuery(selectedPortfolio);
  const { data: portfolioInvested, isSuccess: isSuccessPortfolioInvested } =
    useGetInvestedQuery(selectedPortfolio);

  const plPercentage = () => {
    if (portfolioInvested !== 0) {
      return (
        (Math.abs(portfolioMarketValue - portfolioInvested) /
          portfolioInvested) *
        100 *
        (portfolioMarketValue > portfolioInvested ? 1 : -1)
      );
    } else return 0;
  };

  const dailyChangePercentage = () => {
    if (portfolioMarketValue - dailyChange !== 0) {
      return (dailyChange / (portfolioMarketValue - dailyChange)) * 100;
    } else return 0;
  };

  const getPortfolioDivYield = () => {
    return portfolioMarketValue === 0
      ? 0
      : (portfolioLastTotalDividend / portfolioMarketValue) * 100;
  };
  const getPortfolioYOC = () => {
    return portfolioInvested === 0
      ? 0
      : (portfolioLastTotalDividend / portfolioInvested) * 100;
  };

  const handleShowAssest = () => {
    navigate("/portfolio");
  };

  return (
    <div className="bg-[#E1F5FE] shadow-lg p-2">
      <div className="flex flex-row justify-between border-b-[1px] border-gray-300">
        <span className="text-2xl justify-self-start">{selectedPortfolio}</span>
        <span className="flex items-center gap-1 row">
          <span title="Show Dividend Alerts" className="cursor-pointer">
            <HiBellAlert />
          </span>
          <span title="Show Current Month" className="cursor-pointer">
            <BiCalendarEvent />
          </span>
          <span
            title="Show Assets"
            className="cursor-pointer"
            onClick={handleShowAssest}
          >
            <BiCalendarEvent />
          </span>
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span
          className={`mt-1 text-xl ${
            portfolioMarketValue - portfolioInvested < 0
              ? "text-red-600"
              : "text-[#4caf50]"
          }`}
        >
          {formatToCurrency(portfolioMarketValue)}(
          {portfolioMarketValue - portfolioInvested < 0 ? (
            <HiTrendingDown className="inline" />
          ) : (
            <HiTrendingUp className="inline" />
          )}
          {formatToPercentage(plPercentage())})
        </span>
        <div className="flex flex-row items-center gap-1">
          <span
            className={`mt-1 text-l ${
              dailyChange < 0 ? "text-red-600" : "text-[#4caf50]"
            }`}
          >
            {`Daily PL: ${formatToCurrency(dailyChange)}(`}
            {dailyChange < 0 ? (
              <HiTrendingDown className="inline" />
            ) : (
              <HiTrendingUp className="inline" />
            )}
            {formatToPercentage(dailyChangePercentage())}
            {")"}
          </span>
          <span className="w-[1px] bg-gray-300 h-6"></span>
          <span>
            Yield/YOC:
            {formatToPercentage(getPortfolioDivYield())}
            {" / "}
            {formatToPercentage(getPortfolioYOC())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderPortfolioPanel;
