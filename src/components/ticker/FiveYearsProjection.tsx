import { useParams } from "react-router-dom";
import ChartCard from "../ChartCard";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useLazyGetAverageIncreaseQuery } from "../../features/dividend/dividendApiSlice";

import useFormatHelper from "../../hooks/useFormatHelper";
import { useLazyGetTickerCurrencyQuery } from "../../features/ticker/tickerApiSlice";
import { ApexOptions } from "apexcharts";

const FiveYearsProjection = () => {
  const { ticker } = useParams();
  const { formatToCurrency } = useFormatHelper();

  const [triggerGetAverageIncrease, averageIncrease] =
    useLazyGetAverageIncreaseQuery();

  const [triggerTicketCurrency, tickerCurrency] =
    useLazyGetTickerCurrencyQuery();

  const [yearsProjectionOptions, setYearsProjectionOptions] =
    useState<ApexOptions>({});

  const [yearsProjectionSeries, setYearsProjectionSeries] = useState<
    [{ data: number[] }]
  >([{ data: [] }]);

  useEffect(() => {
    setYearsProjectionOptions({
      chart: {
        type: "bar",
      },
      grid: {
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return formatToCurrency(val, tickerCurrency?.data);
        },
        offsetY: -20,
        style: {
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [
          new Date().getFullYear() - 1,
          new Date().getFullYear(),
          new Date().getFullYear() + 1,
          new Date().getFullYear() + 2,
          new Date().getFullYear() + 3,
          new Date().getFullYear() + 4,
          new Date().getFullYear() + 5,
        ],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val: number) {
            return formatToCurrency(val, tickerCurrency?.data);
          },
        },
      },
      title: {
        text: "5 years projection",
        align: "center",
      },
    });
  }, [tickerCurrency]);

  useEffect(() => {
    
    if (!ticker) return;
    triggerGetAverageIncrease(ticker);
    triggerTicketCurrency(ticker);
  }, [ticker]);

  useEffect(() => {
    if (!averageIncrease || !averageIncrease.data) return;

    const avrIncrease: number = averageIncrease.data.averageIncrease5y;

    setYearsProjectionSeries([
      {
        data: [
          averageIncrease.data.dividends1YearBack,
          averageIncrease.data.dividends1YearBack *
            Math.pow(1 + avrIncrease, 1),
          averageIncrease.data.dividends1YearBack *
            Math.pow(1 + avrIncrease, 2),
          averageIncrease.data.dividends1YearBack *
            Math.pow(1 + avrIncrease, 3),
          averageIncrease.data.dividends1YearBack *
            Math.pow(1 + avrIncrease, 4),
          averageIncrease.data.dividends1YearBack *
            Math.pow(1 + avrIncrease, 5),
          averageIncrease.data.dividends1YearBack *
            Math.pow(1 + avrIncrease, 6),
        ],
      },
    ]);
  }, [averageIncrease]);

  return (
    <ChartCard>
      <Chart
        type="bar"
        options={yearsProjectionOptions}
        series={yearsProjectionSeries}
        height={300}
      />
    </ChartCard>
  );
};

export default FiveYearsProjection;
