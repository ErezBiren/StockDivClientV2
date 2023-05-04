import ChartCard from "../ChartCard";
import { IDividendHistoryData } from "../../utils/interfaces/IDividendHistoryData";
import { useEffect, useState } from "react";
import { useLazyGetAllDividendsQuery } from "../../features/dividend/dividendApiSlice";
import useFormatHelper from "../../hooks/useFormatHelper";
import { useParams } from "react-router-dom";
import { useLazyGetTickerCurrencyQuery } from "../../features/ticker/tickerApiSlice";

const DividendHistoryData = () => {
  const { ticker } = useParams();
  const { formatToDate, formatToCurrency } = useFormatHelper();
  const [triggerDividendData, dividendData] = useLazyGetAllDividendsQuery();
  const [triggerTicketCurrency, tickerCurrency] =
    useLazyGetTickerCurrencyQuery();

  useEffect(() => {
    if (!ticker) return;
    triggerDividendData(ticker);
    triggerTicketCurrency(ticker);
  }, [ticker]);

  return (
    <ChartCard>
      <table className=" overflow-y-auto h-[300px]">
        <thead>
          <tr>
            <th className="bg-green-200">Ex</th>
            <th className="bg-green-200">Pay</th>
            <th className="bg-green-200">Amount</th>
            <th className="bg-green-200">% Increment</th>
            <th className="bg-green-200">Special</th>
          </tr>
        </thead>
        <tbody>
          {dividendData?.data?.map((item: IDividendHistoryData) => (
            <tr key={item.exDay}>
              <td>{formatToDate(item.exDay.substring(0, 10))}</td>
              <td>{formatToDate(item.payDay.substring(0, 10))}</td>
              <td>{formatToCurrency(item.amount, tickerCurrency?.data)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChartCard>
  );
};

export default DividendHistoryData;
