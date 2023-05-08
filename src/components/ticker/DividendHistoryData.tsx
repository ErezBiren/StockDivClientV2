import ChartCard from "../ChartCard";
import { IDividendHistoryData } from "../../utils/interfaces/IDividendHistoryData";
import { useEffect } from "react";
import { useLazyGetAllDividendsQuery } from "../../features/dividend/dividendApiSlice";
import useFormatHelper from "../../hooks/useFormatHelper";
import { useParams } from "react-router-dom";
import { useLazyGetTickerCurrencyQuery } from "../../features/ticker/tickerApiSlice";
import TrendingArrow from "../common/TrendingArrow";

const DividendHistoryData = () => {
  const { ticker } = useParams();
  const { formatToDate, formatToCurrency, formatToPercentage } =
    useFormatHelper();
  const [triggerDividendData, dividendData] = useLazyGetAllDividendsQuery();
  const [triggerTicketCurrency, tickerCurrency] =
    useLazyGetTickerCurrencyQuery();

  useEffect(() => {
    if (!ticker) return;
    triggerDividendData(ticker);
    triggerTicketCurrency(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  return (
    <ChartCard>
      <table className="w-full m-10 overflow-hidden">
        <thead>
          <tr>
            <th className="bg-headerBackground">Ex</th>
            <th className="bg-headerBackground">Pay</th>
            <th className="bg-headerBackground">Amount</th>
            <th className="bg-headerBackground">% Increment</th>
            <th className="bg-headerBackground">Special</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto h-[100px]">
          {dividendData?.data?.map((item: IDividendHistoryData) => (
            <tr key={item.exDay} className="border border-gray-300 border-b-1">
              <td>{formatToDate(item.exDay.substring(0, 10))}</td>
              <td>{formatToDate(item.payDay.substring(0, 10))}</td>
              <td>{formatToCurrency(item.amount, tickerCurrency?.data)}</td>
              <td
                className={`${
                  item.increasePercent > 0
                    ? "text-trendingUpColor"
                    : "text-trendingDownColor"
                }`}
              >
                {item.increasePercent !== 0 && (
                  <>
                    <TrendingArrow
                      positiveCondition={item.increasePercent > 0}
                    />
                    {formatToPercentage(item.increasePercent)}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChartCard>
  );
};

export default DividendHistoryData;
