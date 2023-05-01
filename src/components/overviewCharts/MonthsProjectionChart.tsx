import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ChartCard from "../ChartCard";
import { ApexOptions } from "apexcharts";
import useChartsInit from "../../hooks/useChartsInit";
import { useGetMonthsProjectionQuery } from "../../features/portfolio/portfolioApiSlice";

const MonthsProjectionChart = () => {
  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const {
    monthsProjectionChartOptionsInit,
  } = useChartsInit();

  const [monthsProjectionChartOptions, setMonthsProjectionChartOptions] =
  useState<ApexOptions>(monthsProjectionChartOptionsInit);


  const [monthsProjectionChartSeries, setMonthsProjectionChartSeries] =
  useState<ApexAxisChartSeries>([
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);

  const { data: monthsProjection, isSuccess: isSuccessMonthsProjection } =
    useGetMonthsProjectionQuery(selectedPortfolio);
  
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

  return (
    <ChartCard>
      <Chart
        type="bar"
        options={monthsProjectionChartOptions}
        series={monthsProjectionChartSeries}
        width={500}
        height={320}
      />
    </ChartCard>
  );
};

export default MonthsProjectionChart;
