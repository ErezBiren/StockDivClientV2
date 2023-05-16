import Chart from "react-apexcharts";
import ChartCard from "../common/ChartCard";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";
import useChartsInit from "../../hooks/useChartsInit";
import { useEffect, useState } from "react";
import {
  useGetInvestedQuery,
  useGetMarketValueQuery,
  useGetSoFarQuery,
} from "../../features/portfolio/portfolioApiSlice";
import { useSelector } from "react-redux";

const PortfolioChart = () => {
  const selectedPortfolio = useSelector(selectCurrentPortfolio);
  const { portfolioChartOptions } = useChartsInit();
  const { data: dividendsSoFar, isSuccess: isSuccessDividendsSoFar } =
    useGetSoFarQuery(selectedPortfolio);

  const {
    data: portfolioMarketValue,
    isSuccess: isSuccessPortfolioMarketValue,
  } = useGetMarketValueQuery(selectedPortfolio);

  const [portfolioChartSeries, setPortfolioChartSeries] =
    useState<ApexAxisChartSeries>([
      {
        data: [0, 0, 0, 0],
      },
    ]);

  const { data: portfolioInvested, isSuccess: isSuccessPortfolioInvested } =
    useGetInvestedQuery(selectedPortfolio);

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
    <ChartCard>
      <Chart
        type="bar"
        options={portfolioChartOptions}
        series={portfolioChartSeries}
        height={300}
      />
    </ChartCard>
  );
};

export default PortfolioChart;
