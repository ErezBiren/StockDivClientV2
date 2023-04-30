import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IDiversification } from "../../utils/interfaces/IDiversification";
import ChartCard from "../ChartCard";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useGetDiversityQuery } from "../../features/portfolio/portfolioApiSlice";
import useChartsInit from "../../hooks/useChartsInit";

const DiversificationChart = () => {
  const { diversificationChartOptionsInit } = useChartsInit();

  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const { data: diversity, isSuccess: isSuccessDiversity } =
    useGetDiversityQuery(selectedPortfolio);

  const [diversificationChartOptions, setDiversificationChartOptions] =
    useState<ApexOptions>(diversificationChartOptionsInit);

  const [diversificationChartSeries, setDiversificationChartSeries] = useState<
    number[]
  >([]);

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

  return (
    <ChartCard>
      <Chart
        type="donut"
        options={diversificationChartOptions}
        series={diversificationChartSeries}
        height={300}
      />
    </ChartCard>
  );
};

export default DiversificationChart;
