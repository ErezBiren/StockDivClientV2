import Chart from "react-apexcharts";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetLastTotalDividendQuery,
  useGetMarketValueQuery,
  useGetAverageIncreaseQuery,
  useGetIncomeLastYearQuery,
} from "../../features/portfolio/portfolioApiSlice";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";
import useChartsInit from "../../hooks/useChartsInit";
import ChartCard from "../ChartCard";

const YearsProjection = () => {
  const selectedPortfolio = useSelector(selectCurrentPortfolio);

  const { projectionChartOptionsInit } = useChartsInit();

  const { data: portfolioLastTotalDividend } =
    useGetLastTotalDividendQuery(selectedPortfolio);

  const {
    data: portfolioMarketValue,
  } = useGetMarketValueQuery(selectedPortfolio);

  const [showReinvest, setShowReinvest] = useState(false);

  const { data: averageIncrease, isSuccess: isSuccessAverageIncrease } =
    useGetAverageIncreaseQuery(selectedPortfolio);

  const { data: incomeLastYear, isSuccess: isSuccessIncomeLastYear } =
    useGetIncomeLastYearQuery(selectedPortfolio);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [projectionChartSeries] = useState<
    [{ data: number[] }]
  >([{ data: [] }]);

  const [projectionActualChartSeries, setProjectionActualChartSeries] =
    useState<[{ data: number[] }]>([{ data: [] }]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [
    projectionWithReinvestChartSeries,
  ] = useState<[{ data: number[] }]>([{ data: [] }]);

  const getPortfolioDivYield = useCallback((): number => {
    return portfolioMarketValue === 0
      ? 0
      : (portfolioLastTotalDividend / portfolioMarketValue) * 100;
  }, [portfolioLastTotalDividend, portfolioMarketValue]);

  useEffect(() => {
    if (!isSuccessIncomeLastYear || !isSuccessAverageIncrease) return;

    const tempProjectionChartSeries = { ...projectionChartSeries };
    let tempIncomeLastYear = incomeLastYear;

    tempProjectionChartSeries[0].data=[];

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

    tempProjectionWithReinvestChartSeries[0].data = [];

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
    portfolioMarketValue,
    projectionWithReinvestChartSeries,
    getPortfolioDivYield,
  ]);

  const toggleReinvest = () => {
    setShowReinvest((prev) => !prev);
  };

  useEffect(() => {
    if (showReinvest)
      setProjectionActualChartSeries(projectionWithReinvestChartSeries);
    else setProjectionActualChartSeries(projectionChartSeries);
  }, [projectionChartSeries, projectionWithReinvestChartSeries, showReinvest]);

  return (
    <ChartCard>
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
        height={300}
      />
    </ChartCard>
  );
};

export default YearsProjection;
