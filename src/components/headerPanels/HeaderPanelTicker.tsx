import { useSelector } from "react-redux";
import {
  selectCurrentPortfolio,
  selectCurrentTicker,
} from "../../features/stockdivSlice";
import {
  useLazyGetTickerCurrencyQuery,
  useGetTickerDailyChangeQuery,
  useGetTickerLogoQuery,
  useGetTickerNameQuery,
  useLazyGetTickerPriceQuery,
  useGetTickerAveragePriceQuery,
} from "../../features/ticker/tickerApiSlice";
import Splitter from "../common/Splitter";
import { useEffect, useState } from "react";
import useFormatHelper from "../../hooks/useFormatHelper";
import TrendingArrow from "../common/TrendingArrow";
import { getTradingColor } from "../../utils/utils";

const HeaderPanelTicker = () => {
  const { formatToDate, formatToCurrency, formatToPercentage } =
    useFormatHelper();
  const ticker = useSelector(selectCurrentTicker);
  const portfolio = useSelector(selectCurrentPortfolio);
  const { data: tickerName } = useGetTickerNameQuery(ticker);
  const { data: tickerLogo } = useGetTickerLogoQuery(ticker);
  const { data: dailyChange } = useGetTickerDailyChangeQuery(ticker);
  const { data: tickerAveragePrice } = useGetTickerAveragePriceQuery({
    ticker,
    portfolio,
  });

  const [triggerTicketCurrency, tickerCurrency] =
    useLazyGetTickerCurrencyQuery();

  const [triggerTickerPrice, tickerPrice] = useLazyGetTickerPriceQuery();

  useEffect(() => {
    if (!ticker) return;

    triggerTicketCurrency(ticker);
    triggerTickerPrice({
      ticker: ticker,
      when: formatToDate(new Date().toString(), "yyyy-MM-dd"),
    });
  }, [ticker]);

  return (
    <div className="bg-[#E1F5FE] shadow-lg p-2">
      <div
        className="flex flex-row items-center justify-start gap-2"
        title="no notes"
      >
        <img src={tickerLogo} className="w-[28px] h-[28px]" />
        <span>{ticker}:</span>
        <span>{tickerName?.substring(0, 30)}</span>
      </div>
      <Splitter />

      <div className="flex flex-col items-center">
        <span
          className={`mt-1 text-sm font-semibold ${getTradingColor(
            tickerPrice?.data - tickerAveragePrice >= 0
          )}`}
        >
          {formatToCurrency(tickerPrice?.data, tickerCurrency?.data)}
        </span>
      </div>
      <div className="flex flex-row items-center gap-1">
        <span
          className={`mt-1 text-sm font-semibold ${getTradingColor(1 == 1)}`}
        >
          Daily PL:
          {` ${formatToCurrency(dailyChange, tickerCurrency?.data)}`} (
          <TrendingArrow positiveCondition={true} />
          {`${formatToPercentage(888)}`})
        </span>
        <span className="w-[1px] bg-slate-300 h-6"></span>
        <span>0 shares</span>
      </div>
    </div>
  );
};

export default HeaderPanelTicker;
