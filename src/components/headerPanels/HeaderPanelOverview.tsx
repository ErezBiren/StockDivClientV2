import { BiCalendarEvent, BiFilter, BiWalletAlt } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { BsCalendarRange } from "react-icons/bs";
import useFormatHelper from "../../hooks/useFormatHelper";
import { useSelector } from "react-redux";
import {
  useGetDailyChangeQuery,
  useGetInvestedQuery,
  useGetLastTotalDividendQuery,
  useGetMarketValueQuery,
} from "../../features/portfolio/portfolioApiSlice";
import { useNavigate } from "react-router-dom";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";
import TrendingField from "../common/TrendingField";
import { useCallback } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Tooltip } from "flowbite-react";
import TooltipStock from "../common/TooltipStock";

const HeaderPanelOverview = () => {
  const navigate = useNavigate();
  const { formatToCurrency, formatToPercentage } = useFormatHelper();

  const selectedPortfolio = useSelector(selectCurrentPortfolio);

  const { data: dailyChange } = useGetDailyChangeQuery(selectedPortfolio);
  const { data: portfolioLastTotalDividend } =
    useGetLastTotalDividendQuery(selectedPortfolio);

  const { data: portfolioMarketValue } =
    useGetMarketValueQuery(selectedPortfolio);
  const { data: portfolioInvested } = useGetInvestedQuery(selectedPortfolio);

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

  const dailyChangePercentage = useCallback(() => {
    if (portfolioMarketValue - dailyChange !== 0) {
      return (dailyChange / (portfolioMarketValue - dailyChange)) * 100;
    } else return 0;
  }, [dailyChange, portfolioMarketValue]);

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

  const goToYearlyPayment = () => {
    navigate("/yearlyPaymentMatrix");
  };

  const goToAssets = () => {
    navigate("/portfolio");
  };

  const goToShowDividendAlerts = () => {
    navigate("/dividendAlerts");
  };

  const goToScreener = () => {
    navigate("/screener");
  };

  return (
    <div className="p-2 shadow-lg bg-cardBackground">
      <div className="flex flex-row justify-between border-b-[1px] border-gray-300">
        <span className="text-2xl justify-self-start">{selectedPortfolio}</span>
        <span className="flex items-center gap-4 row">
          <TooltipStock content="Show Dividend Alerts">
            <span
              className="cursor-pointer"
              onClick={goToShowDividendAlerts}
            >
              <HiBellAlert className="fill-[#f44336] cursor-pointer" />
            </span>
          </TooltipStock>
          <TooltipStock content="Show Yearly Payment">
            <span
              className="cursor-pointer fill-iconsColor"
              onClick={goToYearlyPayment}
            >
              <BsCalendarRange />
            </span>
          </TooltipStock>

          <TooltipStock content="Show Current Month">
            <BiCalendarEvent className="cursor-pointer fill-iconsColor" />
          </TooltipStock>

          <TooltipStock content="Show Assets">
            <span className="cursor-pointer" onClick={goToAssets}>
              <BiWalletAlt className="fill-iconsColor" />
            </span>
          </TooltipStock>

          <TooltipStock content="Show Screener">
            <span className="cursor-pointer" onClick={goToScreener}>
              <BiFilter className="fill-iconsColor" />
            </span>
          </TooltipStock>
          <span className="cursor-pointer" onClick={goToScreener}>
            <FiMoreVertical />
          </span>
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span
          className={`mt-1 text-xl ${
            portfolioMarketValue - portfolioInvested < 0
              ? "text-trendingDownColor"
              : "text-trendingUpColor"
          }`}
        >
          {formatToCurrency(portfolioMarketValue)}(
          <TrendingField
            positiveCondition={portfolioMarketValue - portfolioInvested >= 0}
            value={plPercentage()}
          />
        </span>
        <div className="flex flex-row items-center gap-1">
          <span
            className={`mt-1 text-l ${
              dailyChange < 0
                ? "text-trendingDownColor"
                : "text-trendingUpColor"
            }`}
          >
            Daily PL: {formatToCurrency(dailyChange)}(
            <TrendingField
              positiveCondition={dailyChange >= 0}
              value={dailyChangePercentage()}
            />
            )
          </span>
          <span className="w-[1px] bg-gray-300 h-6" />
          <span>
            Yield/YOC:
            {formatToPercentage(getPortfolioDivYield())}/
            {formatToPercentage(getPortfolioYOC())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderPanelOverview;
