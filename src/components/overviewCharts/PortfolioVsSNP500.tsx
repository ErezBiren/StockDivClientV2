import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetPerformanceQuery } from "../../features/portfolio/portfolioApiSlice";
import { IPriceAndDate } from "../../utils/interfaces/IPriceAndDate";
import useChartsInit from "../../hooks/useChartsInit";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import ChartCard from "../ChartCard";

const PortfolioVsSNP500 = () => {
  const { performanceChartOptionsInit } = useChartsInit();

  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const { data: performance, isSuccess: isSuccessPerformance } =
    useGetPerformanceQuery(selectedPortfolio);

  const [performanceChartOptions, setPerformanceChartOptions] =
    useState<ApexOptions>(performanceChartOptionsInit);

  const [performanceChartSeries, setPerformanceChartSeries] = useState<
    { name: string; data: number[] }[]
  >([{ name: "", data: [] }]);

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

  return (
    <ChartCard>
      <Chart
        type="line"
        options={performanceChartOptions}
        series={performanceChartSeries}
        height={300}
        width={500}
      />
    </ChartCard>
  );
};

export default PortfolioVsSNP500;
