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
  useGetDiversityQuery,
  useGetPerformanceQuery,
  useGetNewsQuery,
  useGetHighestIncomeQuery,
  useGetIncomeLastYearQuery,
  useGetAverageIncreaseQuery,
  useGetLastTotalDividendQuery,
} from "../features/portfolio/portfolioApiSlice";
import useFormatHelper from "../hooks/useFormatHelper";
import { IDiversification } from "../utils/interfaces/IDiversification";
import { IPriceAndDate } from "../utils/interfaces/IPriceAndDate";
import useChartsInit from "../hooks/useChartsInit";
import { ITickerNews } from "../utils/interfaces/ITickerNews";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Overview = () => {
  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const { formatToCurrency, formatToPercentage, formatToDate } =
    useFormatHelper();
  const {
    monthsProjectionChartOptionsInit,
    diversificationChartOptionsInit,
    performanceChartOptionsInit,
    portfolioChartOptions,
    monthChartOptions,
    yearChartOptions,
    weekChartOptions,
    projectionChartOptionsInit,
    highestIncomeChartOptionsInit,
  } = useChartsInit();

  const {
    data: portfolioLastTotalDividend,
    isSuccess: isSuccessPortfolioLastTotalDividend,
  } = useGetLastTotalDividendQuery(selectedPortfolio);
  const { data: performance, isSuccess: isSuccessPerformance } =
    useGetPerformanceQuery(selectedPortfolio);
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
  const { data: roiMeterText } = useGetRoiMeterQuery(selectedPortfolio);
  const { data: diversity, isSuccess: isSuccessDiversity } =
    useGetDiversityQuery(selectedPortfolio);

  const { data: highestIncome, isSuccess: isSuccessHighestIncome } =
    useGetHighestIncomeQuery(selectedPortfolio);

  const [diversificationChartOptions, setDiversificationChartOptions] =
    useState<ApexOptions>(diversificationChartOptionsInit);

  const [diversificationChartSeries, setDiversificationChartSeries] = useState<
    number[]
  >([]);

  const [performanceChartSeries, setPerformanceChartSeries] = useState<
    { name: string; data: number[] }[]
  >([{ name: "", data: [] }]);

  const [performanceChartOptions, setPerformanceChartOptions] =
    useState<ApexOptions>(performanceChartOptionsInit);

  const [showReinvest, setShowReinvest] = useState(false);
  const [nextDividendInfo, setNextDividendInfo] = useState("");

  const [monthsProjectionChartOptions, setMonthsProjectionChartOptions] =
    useState<ApexOptions>(monthsProjectionChartOptionsInit);

  const [highestIncomeChartSeries, setHighestIncomeChartSeries] = useState<
    [{ data: number[] }]
  >([{ data: [] }]);

  const [highestIncomeChartOptions, setHighestIncomeChartOptions] =
    useState<ApexOptions>(highestIncomeChartOptionsInit);

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

  const { data: newsItems } = useGetNewsQuery(selectedPortfolio);

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
    if (isSuccessPerformance) {
      setPerformanceChartOptions((prev) => ({
        ...prev,
        xaxis: {
          categories: performance.sp500.map(
            (item: IPriceAndDate) => item.valueDate
          ),
        },
      }));
      setPerformanceChartSeries([
        {
          name: "S&P500",
          data: performance.sp500.map((item: IPriceAndDate) => item.value),
        },
        {
          name: "Your portfolio",
          data: performance.thePortfolio.map(
            (item: IPriceAndDate) => item.value
          ),
        },
      ]);
    }
  }, [performance, isSuccessPerformance]);

  useEffect(() => {
    if (isSuccessDiversity) {
      setDiversificationChartOptions((prev) => ({
        ...prev,
        labels: diversity.map((item: IDiversification) => item.sector),
      }));
      setDiversificationChartSeries(
        diversity.map((item: IDiversification) => item.percentage)
      );
    }
  }, [diversity, isSuccessDiversity]);

  const [roiChartOptions, setRoiChartOptions] = useState({});
  const [roiChartSeries, setRoiChartSeries] = useState<
    [{ data: number[] }, { data: number[] }]
  >([{ data: [0] }, { data: [0] }]);

  useEffect(() => {
    setRoiChartOptions({
      chart: {
        type: "bar",
        stacked: true,
      },
      tooltip: {
        enabled: false,
      },
      grid: {
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return formatToCurrency(val);
        },
        style: {
          fontSize: "1em",
          colors: ["#304758"],
        },
      },
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              formatter: () => {
                return portfolioInvested === 0
                  ? ""
                  : `${formatToPercentage(
                      (dividendsSoFar / portfolioInvested) * 100
                    )} | Approximately ${roiMeterText} to 100% ROI`;
              },
            },
          },
        },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        type: "string",
        categories: ["ROI"],
      },
      fill: {
        opacity: 1,
      },
    });
  }, [dividendsSoFar, portfolioInvested, roiMeterText]);

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
    if (isSuccessDividendsSoFar) {
      setRoiChartSeries((prev) => {
        const res: [{ data: number[] }, { data: number[] }] = [
          { data: [dividendsSoFar] },
          { ...prev[1] },
        ];
        return res;
      });
    }
  }, [isSuccessDividendsSoFar, dividendsSoFar]);

  useEffect(() => {
    if (isSuccessPortfolioInvested) {
      setRoiChartSeries((prev) => {
        const res: [{ data: number[] }, { data: number[] }] = [
          { ...prev[0] },
          { data: [portfolioInvested] },
        ];
        return res;
      });
    }
  }, [isSuccessPortfolioInvested, portfolioInvested]);

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

  useEffect(() => {
    if (isSuccessHighestIncome) {
      setHighestIncomeChartSeries([
        {
          data: [...highestIncome.map((item: [string, number]) => item[1])],
        },
      ]);
    }
  }, [highestIncome, isSuccessHighestIncome]);

  useEffect(() => {
    if (isSuccessHighestIncome) {
      setHighestIncomeChartOptions((prev) => ({
        ...prev,
        xaxis: {
          categories: highestIncome.map((item: [string, number]) => item[0]),
        },
      }));
    }
  }, [highestIncome, isSuccessHighestIncome]);

  const gotoNews = (url: string) => {
    window.open(url, "_blank");
  };

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
      <div className="bg-[#E1F5FE] shadow-lg">
        <Chart
          type="bar"
          options={highestIncomeChartOptions}
          series={highestIncomeChartSeries}
          width={500}
          height={320}
        />
      </div>
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
      <div className="bg-[#E1F5FE] shadow-lg">
        <Chart
          type="bar"
          options={roiChartOptions}
          series={roiChartSeries}
          height={320}
        />
      </div>
      <div className="bg-[#E1F5FE] shadow-lg">
        <Chart
          type="donut"
          options={diversificationChartOptions}
          series={diversificationChartSeries}
          height={300}
        />
      </div>
      <div className="bg-[#E1F5FE] shadow-lg">
        <Chart
          type="line"
          options={performanceChartOptions}
          series={performanceChartSeries}
          height={300}
          width={500}
        />
      </div>
      <div className="bg-[#E1F5FE] shadow-lg">
        <span className="justify-center text-xl font-body">News</span>
        {newsItems?.map((newsItem: ITickerNews, index: number) => (
          <div
            key={index}
            className="py-2 px-2 border-gray-300 cursor-pointer border-b-[1px] hover:bg-gray-300"
            onClick={() => gotoNews(newsItem.link)}
          >
            <div className="text-xs text-gray-800">
              {formatToDate(newsItem.date.substring(0, 10))}
            </div>
            <div className="text-xs text-gray-500">{newsItem.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
