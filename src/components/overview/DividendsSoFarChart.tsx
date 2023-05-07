import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  useGetNextQuery,
  useGetPeriodsQuery,
  useGetSoFarQuery,
} from "../../features/portfolio/portfolioApiSlice";
import useFormatHelper from "../../hooks/useFormatHelper";
import useChartsInit from "../../hooks/useChartsInit";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";

const DividendsSoFarChart = () => {
  const selectedPortfolio = useSelector(selectCurrentPortfolio);

  const { yearChartOptions, monthChartOptions, weekChartOptions } =
    useChartsInit();

  const [nextDividendInfo, setNextDividendInfo] = useState("");
  const { formatToCurrency } = useFormatHelper();
  const { data: dividendsSoFar } =
    useGetSoFarQuery(selectedPortfolio);

  const [yearlyChartSeries, setYearlyChartSeries] = useState<number[]>([]);
  const [monthlyChartSeries, setMonthlyChartSeries] = useState<number[]>([]);
  const [weeklyChartSeries, setWeeklyChartSeries] = useState<number[]>([]);

  const { data: next, isSuccess: isSuccessNext } =
    useGetNextQuery(selectedPortfolio);
  const { data: periods, isSuccess: isSuccessPeriods } =
    useGetPeriodsQuery(selectedPortfolio);

  useEffect(() => {
    if (isSuccessPeriods) {
      setYearlyChartSeries(periods.yearDividend);
      setMonthlyChartSeries(periods.monthDividend);
      setWeeklyChartSeries(periods.weekDividend);
    }
  }, [isSuccessPeriods, periods]);

  useEffect(() => {
    if (isSuccessNext) {
      if (next.days === -1)
        setNextDividendInfo("Nothing in the next 31 days...");
      else if (next.days === 0)
        setNextDividendInfo(
          `Today you should get ${formatToCurrency(next.amount)}`
        );
      else if (next.days === 1)
        setNextDividendInfo(
          `Tomorrow you should get ${formatToCurrency(next.amount)}`
        );
      else
        setNextDividendInfo(
          `In ${next.days} days you should get ${formatToCurrency(next.amount)}`
        );
    }
  }, [isSuccessNext, next]);

  return (
    <div className="bg-[#E1F5FE] shadow-lg">
      <div className="justify-center text-h6 q-mt-sm row no-wrap">
        Dividends so far: {formatToCurrency(dividendsSoFar)}
      </div>
      <div className="text-h6 q-mt-sm">{nextDividendInfo}</div>

      <div className="flex flex-row justify-center">
        {next?.tickers.map((ticker: string, index: number) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div
              className="center relative inline-block select-none whitespace-nowrap rounded-xl bg-teal-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white"
              title={`Next Dividend: ${formatToCurrency(
                next?.amouts?.[index]
              )}`}
            >
              <div className="mt-px">{ticker}</div>
            </div>
            <img src={next?.logos[index]} className="h-[32px] w-[32px]" />
          </div>
        ))}
      </div>
      <div className="justify-center row">
        <Chart
          type="donut"
          height={200}
          options={yearChartOptions}
          series={yearlyChartSeries}
        />
        <Chart
          type="donut"
          height={200}
          options={monthChartOptions}
          series={monthlyChartSeries}
        />
        <Chart
          type="donut"
          height={200}
          options={weekChartOptions}
          series={weeklyChartSeries}
        />
      </div>
    </div>
  );
};

export default DividendsSoFarChart;
