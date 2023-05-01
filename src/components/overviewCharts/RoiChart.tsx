import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import ChartCard from "../ChartCard";
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import useFormatHelper from "../../hooks/useFormatHelper";
import {
  useGetInvestedQuery,
  useGetRoiMeterQuery,
  useGetSoFarQuery,
} from "../../features/portfolio/portfolioApiSlice";

const RoiChart = () => {
  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const { data: roiMeterText } = useGetRoiMeterQuery(selectedPortfolio);

  const { data: portfolioInvested, isSuccess: isSuccessPortfolioInvested } =
    useGetInvestedQuery(selectedPortfolio);

  const { data: dividendsSoFar, isSuccess: isSuccessDividendsSoFar } =
    useGetSoFarQuery(selectedPortfolio);
  const { formatToPercentage, formatToCurrency } = useFormatHelper();
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

  return (
    <ChartCard>
      <Chart
        type="bar"
        options={roiChartOptions}
        series={roiChartSeries}
        height={320}
      />
    </ChartCard>
  );
};

export default RoiChart;
