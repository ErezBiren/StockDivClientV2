import { useSelector } from "react-redux";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";
import {
  useLazyGetTickerCurrencyQuery,
  useLazyGetTickerDailyChangeQuery,
  useLazyGetTickerLogoQuery,
  useLazyGetTickerNameQuery,
  useLazyGetTickerPriceQuery,
  useLazyGetTickerAveragePriceQuery,
} from "../../features/ticker/tickerApiSlice";
import Splitter from "../common/Splitter";
import { useCallback, useEffect, useState } from "react";
import useFormatHelper from "../../hooks/useFormatHelper";
import { getTradingColor } from "../../utils/utils";
import { useLazyGetTickerTimelineQuery } from "../../features/portfolio/portfolioApiSlice";
import { RootState } from "../../app/store";
import { ITransactionData } from "../../utils/interfaces/ITransactionData";
import { useParams } from "react-router-dom";
import TrendingField from "../common/TrendingField";

const HeaderPanelTicker = () => {
  const { ticker } = useParams();
  const settingsDateFormat = useSelector(
    (state: RootState) => state.stockdiv.settings.dateFormat
  );

  const [showDivs, setShowDivs] = useState<boolean | undefined>();
  const [tickerShares, setTickerShares] = useState<number | undefined>();
  const [, setTimelineItemsToShow] = useState();
  const [, setFirstTransaction] = useState<Date | undefined>();
  const portfolio = useSelector(selectCurrentPortfolio);

  const { formatToDate, formatToCurrency } = useFormatHelper();
  const [tickerNameTrigger, tickerName] = useLazyGetTickerNameQuery();
  const [tickerLogoTrigger, tickerLogo] = useLazyGetTickerLogoQuery();
  const [dailyChangeTrigger, dailyChange] = useLazyGetTickerDailyChangeQuery();
  const [tickerAveragePriceTrigger, tickerAveragePrice] =
    useLazyGetTickerAveragePriceQuery();
  const [timelineItemsTrigger, timelineItems] = useLazyGetTickerTimelineQuery();
  const [triggerTicketCurrency, tickerCurrency] =
    useLazyGetTickerCurrencyQuery();

  const [triggerTickerPrice, tickerPrice] = useLazyGetTickerPriceQuery();

  const toggleShowDividends = () => {
    if (showDivs) setTimelineItemsToShow(timelineItems.data);
    else
      setTimelineItemsToShow(
        timelineItems.data.filter(
          (item: { transaction: unknown }) => item.transaction
        )
      );
  };

  useEffect(() => {
    if (!ticker) return;

    tickerNameTrigger(ticker);
    tickerLogoTrigger(ticker);
    dailyChangeTrigger(ticker);
    triggerTicketCurrency(ticker);
    triggerTickerPrice({
      ticker,
      when: formatToDate(new Date().toString(), "yyyy-MM-dd"),
    });

    if (portfolio) {
      const tickerPortfolioParam = { ticker, portfolio };
      timelineItemsTrigger(tickerPortfolioParam);
      tickerAveragePriceTrigger(tickerPortfolioParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker, portfolio]);

  useEffect(() => {
    if (!timelineItems.data) return;

    let withTransactions = false;
    let tickerShares = 0;

    timelineItems?.data.forEach(
      (element: {
        title: string;
        content: string;
        transaction?: ITransactionData;
      }) => {
        if (settingsDateFormat !== "yyyy-MM-dd")
          element.title = formatToDate(element.title);
        if (element.transaction) {
          setFirstTransaction(new Date(element.transaction.when));
          withTransactions = true;
          tickerShares += element.transaction.shares;
        }
      }
    );
    setTickerShares(tickerShares);
    setShowDivs(!withTransactions);
    toggleShowDividends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineItems, timelineItems.data]);

  const dailyChangePercentage = useCallback(() => {
    if (tickerPrice?.data - dailyChange?.data !== 0) {
      return (
        (dailyChange?.data / (tickerPrice?.data - dailyChange?.data)) * 100
      );
    } else return 0;
  }, [dailyChange?.data, tickerPrice?.data]);

  return (
    <div className="p-2 shadow-lg bg-cardBackground">
      <div
        className="flex flex-row items-center justify-start gap-2"
        title="no notes"
      >
        <img src={tickerLogo?.data} className="w-[28px] h-[28px]" />
        <span>{ticker}:</span>
        <span>{tickerName?.data?.substring(0, 30)}</span>
      </div>
      <Splitter />

      <div className="flex flex-col items-center">
        <span
          className={`mt-1 text-sm font-semibold ${getTradingColor(
            tickerPrice?.data - tickerAveragePrice?.data >= 0
          )}`}
        >
          {formatToCurrency(tickerPrice?.data, tickerCurrency?.data)}
        </span>
      </div>
      <div className="flex flex-row items-center gap-1">
        <span
          className={`mt-1 text-sm font-semibold ${getTradingColor(
            dailyChangePercentage() > 0
          )}`}
        >
          Daily PL:
          {` ${formatToCurrency(dailyChange?.data, tickerCurrency?.data)}`} (
          <TrendingField
            positiveCondition={dailyChangePercentage() > 0}
            value={dailyChangePercentage()}
          />
          )
        </span>
        <span className="w-[1px] bg-slate-300 h-6"></span>
        <span>{tickerShares} shares</span>
      </div>
    </div>
  );
};

export default HeaderPanelTicker;
