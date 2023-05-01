import { ApexOptions } from "apexcharts";
import { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  useGetMarketValueQuery,
  useGetInvestedQuery,
  useGetSoFarQuery,
  useGetNextQuery,
  useGetPeriodsQuery,
  useGetMonthsProjectionQuery,
  useGetRoiMeterQuery,
  useGetIncomeLastYearQuery,
  useGetAverageIncreaseQuery,
  useGetLastTotalDividendQuery,
} from "../features/portfolio/portfolioApiSlice";
import useFormatHelper from "../hooks/useFormatHelper";
import useChartsInit from "../hooks/useChartsInit";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import HighestIncomeTickers from "../components/overviewCharts/HighestIncomeTickers";
import DiversificationChart from "../components/overviewCharts/DiversificationChart";
import PortfolioVsSNP500 from "../components/overviewCharts/PortfolioVsSNP500";
import News from "../components/overviewCharts/News";
import RoiChart from "../components/overviewCharts/RoiChart";

const Overview = () => {
  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const { formatToCurrency, formatToPercentage } = useFormatHelper();
  const {
    monthsProjectionChartOptionsInit,
    performanceChartOptionsInit,
    portfolioChartOptions,
    monthChartOptions,
    yearChartOptions,
    weekChartOptions,
    projectionChartOptionsInit,
  } = useChartsInit();

  const {
    data: portfolioLastTotalDividend,
    isSuccess: isSuccessPortfolioLastTotalDividend,
  } = useGetLastTotalDividendQuery(selectedPortfolio);

  const { data: portfolioInvested, isSuccess: isSuccessPortfolioInvested } =
    useGetInvestedQuery(selectedPortfolio);
  const {
    data: portfolioMarketValue,
    isSuccess: isSuccessPortfolioMarketValue,
  } = useGetMarketValueQuery(selectedPortfolio);
  const { data: dividendsSoFar, isSuccess: isSuccessDividendsSoFar } =
    useGetSoFarQuery(selectedPortfolio);
  const { data: next, isSuccess: isSuccessNext } =
    useGetNextQuery(selectedPortfolio);
  const { data: periods, isSuccess: isSuccessPeriods } =
    useGetPeriodsQuery(selectedPortfolio);
  const { data: monthsProjection, isSuccess: isSuccessMonthsProjection } =
    useGetMonthsProjectionQuery(selectedPortfolio);

  const [showReinvest, setShowReinvest] = useState(false);
  const [nextDividendInfo, setNextDividendInfo] = useState("");

  const [monthsProjectionChartOptions, setMonthsProjectionChartOptions] =
    useState<ApexOptions>(monthsProjectionChartOptionsInit);

  const [portfolioChartSeries, setPortfolioChartSeries] =
    useState<ApexAxisChartSeries>([
      {
        data: [0, 0, 0, 0],
      },
    ]);

  const [yearlyChartSeries, setYearlyChartSeries] = useState<number[]>([]);
  const [monthlyChartSeries, setMonthlyChartSeries] = useState<number[]>([]);
  const [weeklyChartSeries, setWeeklyChartSeries] = useState<number[]>([]);

  const [monthsProjectionChartSeries, setMonthsProjectionChartSeries] =
    useState<ApexAxisChartSeries>([
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ]);

  const { data: averageIncrease, isSuccess: isSuccessAverageIncrease } =
    useGetAverageIncreaseQuery(selectedPortfolio);

  const { data: incomeLastYear, isSuccess: isSuccessIncomeLastYear } =
    useGetIncomeLastYearQuery(selectedPortfolio);

  const [projectionChartSeries, setProjectionChartSeries] = useState<
    [{ data: number[] }]
  >([{ data: [] }]);

  const [projectionActualChartSeries, setProjectionActualChartSeries] =
    useState<[{ data: number[] }]>([{ data: [] }]);

  const [
    projectionWithReinvestChartSeries,
    setProjectionWithReinvestChartSeries,
  ] = useState<[{ data: number[] }]>([{ data: [] }]);

  const getPortfolioDivYield = useCallback((): number => {
    return portfolioMarketValue === 0
      ? 0
      : (portfolioLastTotalDividend / portfolioMarketValue) * 100;
  }, [portfolioLastTotalDividend, portfolioMarketValue]);

  useEffect(() => {
    if (!isSuccessIncomeLastYear || !isSuccessAverageIncrease) return;

    setProjectionWithReinvestChartSeries([{ data: [incomeLastYear] }]);
    setProjectionChartSeries([{ data: [incomeLastYear] }]);

    const tempProjectionChartSeries = { ...projectionChartSeries };
    let tempIncomeLastYear = incomeLastYear;

    for (let i = 0; i < 11; i++) {
      tempProjectionChartSeries[0].data.push(
        tempIncomeLastYear *
          (1 +
            (i < 5
              ? averageIncrease.averageIncrease5y
              : averageIncrease.averageIncrease10y))
      );
      tempIncomeLastYear *=
        1 +
        (i < 5
          ? averageIncrease.averageIncrease5y
          : averageIncrease.averageIncrease10y);
    }
    setProjectionActualChartSeries(tempProjectionChartSeries);
    let divYield = getPortfolioDivYield() / 100;
    let marketValue = portfolioMarketValue;

    const tempProjectionWithReinvestChartSeries: [{ data: number[] }] = {
      ...projectionWithReinvestChartSeries,
    };

    for (let i = 0; i < 11; i++) {
      tempProjectionWithReinvestChartSeries[0].data.push(
        marketValue * divYield
      );
      marketValue += marketValue * divYield;
      divYield *=
        1 +
        (i < 6
          ? averageIncrease.averageIncrease5y
          : averageIncrease.averageIncrease10y);
    }
  }, [
    incomeLastYear,
    isSuccessIncomeLastYear,
    averageIncrease,
    isSuccessAverageIncrease,
    projectionChartSeries,
    getPortfolioDivYield,
    portfolioMarketValue,
    projectionWithReinvestChartSeries,
  ]);

  const toggleReinvest = () => {
    setShowReinvest((prev) => !prev);
  };

  useEffect(() => {
    if (showReinvest)
      setProjectionActualChartSeries(projectionWithReinvestChartSeries);
    else setProjectionActualChartSeries(projectionChartSeries);
  }, [projectionChartSeries, projectionWithReinvestChartSeries, showReinvest]);

  useEffect(() => {
    if (isSuccessMonthsProjection) {
      setMonthsProjectionChartOptions({
        xaxis: {
          categories: monthsProjection.map((item: [string, number]) => item[0]),
        },
      });

      setMonthsProjectionChartSeries([
        {
          data: monthsProjection.map((item: [string, number]) => item[1]),
        },
      ]);
    }
  }, [isSuccessMonthsProjection, monthsProjection]);

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
  }, [formatToCurrency, isSuccessNext, next]);

  useEffect(() => {
    if (
      isSuccessPortfolioInvested &&
      isSuccessPortfolioMarketValue &&
      isSuccessDividendsSoFar
    ) {
      setPortfolioChartSeries([
        {
          data: [
            portfolioInvested,
            portfolioMarketValue,
            portfolioMarketValue - portfolioInvested,
            portfolioMarketValue - portfolioInvested + dividendsSoFar,
          ],
        },
      ]);
    }
  }, [
    portfolioInvested,
    isSuccessPortfolioInvested,
    isSuccessPortfolioMarketValue,
    isSuccessDividendsSoFar,
    portfolioMarketValue,
    dividendsSoFar,
  ]);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="bg-[#E1F5FE] shadow-lg">
        <Chart
          type="bar"
          options={portfolioChartOptions}
          series={portfolioChartSeries}
          width={500}
          height={320}
        />
      </div>
      <div className="bg-[#E1F5FE] shadow-lg">
        <div className="justify-center text-h6 q-mt-sm row no-wrap">
          Dividends so far: {formatToCurrency(dividendsSoFar)}
        </div>
        <div className="text-h6 q-mt-sm">{nextDividendInfo}</div>

        {next?.tickers.map((ticker: string, index: number) => (
          <div key={index} className="flex flex-column ">
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
      <div className="bg-[#E1F5FE] shadow-lg">
        <Chart
          type="bar"
          options={monthsProjectionChartOptions}
          series={monthsProjectionChartSeries}
          width={500}
          height={320}
        />
      </div>
      <HighestIncomeTickers />
      <div className="bg-[#E1F5FE] shadow-lg">
        <label className="relative inline-flex items-center mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showReinvest}
            className="sr-only peer"
            onChange={toggleReinvest}
          />
          <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 ">
            With Reinvest
          </span>
        </label>
        <Chart
          type="bar"
          options={projectionChartOptionsInit}
          series={projectionActualChartSeries}
          width={500}
          height={320}
        />
      </div>
      <RoiChart />
      <DiversificationChart />
      <PortfolioVsSNP500 />
      <News />
    </div>
  );
};

export default Overview;
