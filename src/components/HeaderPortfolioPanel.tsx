import { BiCalendarEvent } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import useFormatHelper from "../hooks/useFormatHelper";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  useGetInvestedQuery,
  useGetMarketValueQuery,
  useGetPortfoliosQuery,
} from "../features/portfolio/portfolioApiSlice";

const HeaderPortfolioPanel = () => {
  const { formatToCurrency, formatToPercentage } = useFormatHelper();
  
  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const {
    data: portfolioMarketValue,
    isSuccess: isSuccessPortfolioMarketValue,
  } = useGetMarketValueQuery(selectedPortfolio);
  const { data: portfolioInvested, isSuccess: isSuccessPortfolioInvested } =
    useGetInvestedQuery(selectedPortfolio);

  const plPercentage = (): number => {
    if (portfolioInvested !== 0) {
      return (
        (Math.abs(portfolioMarketValue - portfolioInvested) /
          portfolioInvested) *
        100 *
        (portfolioMarketValue > portfolioInvested ? 1 : -1)
      );
    } else return 0;
  };

  return (
    <div className="bg-[#E1F5FE] shadow-lg h-20 w-3/5 p-2">
      <div className="flex flex-row justify-between border-b-[1px] border-gray-300">
        <span className="text-2xl justify-self-start">{selectedPortfolio}</span>
        <span className="flex items-center gap-1 row">
          <span title="Show Divident Alerts" className="cursor-pointer">
            <HiBellAlert />
          </span>
          <span title="Show Current Month" className="cursor-pointer">
            <BiCalendarEvent />
          </span>
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="mt-1 text-xl text-green-600">
          {formatToCurrency(portfolioMarketValue)}(
          {portfolioMarketValue - portfolioInvested < 0 ? (
            <HiTrendingDown className="inline" />
          ) : (
            <HiTrendingUp className="inline" />
          )}
          {formatToPercentage(plPercentage())})
        </span>
        <div>
          <span>Daily PL:{formatToPercentage(plPercentage())}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderPortfolioPanel;
