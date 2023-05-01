import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ChartCard from "../ChartCard";
import Chart from "react-apexcharts";
import useChartsInit from "../../hooks/useChartsInit";
import { useGetHighestIncomeQuery } from "../../features/portfolio/portfolioApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";

const HighestIncomeTickers = () => {
  const selectedPortfolio = useSelector(selectCurrentPortfolio);

  const { data: highestIncome, isSuccess: isSuccessHighestIncome } =
    useGetHighestIncomeQuery(selectedPortfolio);
  const { highestIncomeChartOptionsInit } = useChartsInit();

  const [highestIncomeChartSeries, setHighestIncomeChartSeries] = useState<
    [{ data: number[] }]
  >([{ data: [] }]);

  const [highestIncomeChartOptions, setHighestIncomeChartOptions] =
    useState<ApexOptions>(highestIncomeChartOptionsInit);

  useEffect(() => {
    if (isSuccessHighestIncome) {
      setHighestIncomeChartSeries([
        {
          data: [...highestIncome.map((item: [string, number]) => item[1])],
        },
      ]);

      setHighestIncomeChartOptions((prev) => ({
        ...prev,
        xaxis: {
          categories: highestIncome.map((item: [string, number]) => item[0]),
        },
      }));
    }
  }, [highestIncome, isSuccessHighestIncome]);

  return (
    <ChartCard>
      <Chart
        type="bar"
        options={highestIncomeChartOptions}
        series={highestIncomeChartSeries}
        width={500}
        height={320}
      />
    </ChartCard>
  );
};

export default HighestIncomeTickers;
