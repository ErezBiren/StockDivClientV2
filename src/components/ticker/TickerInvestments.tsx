import { ApexOptions } from "apexcharts";
import useFormatHelper from "../../hooks/useFormatHelper";
import ChartCard from "../ChartCard";
import Chart from "react-apexcharts";
import { useGetTickerCurrencyQuery } from "../../features/ticker/tickerApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";
import { useState } from "react";

const periodOptions = [
  {
    label: "Week",
    value: "w",
  },
  {
    label: "Month",
    value: "m",
  },
  {
    label: "Year",
    value: "y",
  },
  {
    label: "YTD",
    value: "ytd",
  },
  {
    label: "3Y",
    value: "3y",
  },
  {
    label: "5Y",
    value: "5y",
  },
  {
    label: "10Y",
    value: "10y",
  },
  {
    label: "1st Purchase",
    value: "fp",
  },
];

const TickerInvestments = () => {
  const { formatToCurrency } = useFormatHelper();
  const { data: selectedTicker } = useSelector(selectCurrentPortfolio);
  const { data: tickerCurrency } = useGetTickerCurrencyQuery(selectedTicker);

  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0].value);

  const whatHappenedSinceOptions: ApexOptions = {
    chart: {
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      height: 350,
      type: "line",
      toolbar: {
        show: true,
      },
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
    },
    markers: {
      size: 0,
    },
    colors: ["#ADD8E6", "#00FF00"],
    tooltip: {
      shared: true,
      intersect: false,
    },
    stroke: {
      width: [5, 5],
      curve: "straight",
    },
    title: {
      text: "What happened since (up to 10 years)",
      align: "center",
    },
    dataLabels: {
      enabled: false,
    },
    labels: [],
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Price",
        },
        labels: {
          show: true,
          formatter: function (val: number) {
            return formatToCurrency(val, tickerCurrency);
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Dividends",
        },
        labels: {
          show: true,
          formatter: function (val: number) {
            return formatToCurrency(val, tickerCurrency);
          },
        },
      },
    ],
  };

  const whatHappenedSinceSeries = [
    {
      name: "Price",
      type: "line",
      data: [] as number[],
    },
    {
      name: "Dividends",
      type: "line",
      data: [] as number[],
    },
  ];

  const changePeriod = (e) => {
    setSelectedPeriod(e.target.value);
  };

  return (
    <ChartCard>
      <Chart
        type="line"
        height="300"
        options={whatHappenedSinceOptions}
        series={whatHappenedSinceSeries}
      />
      <div className="flex justify-center mb-4">
        {periodOptions?.map((periodOption) => (
          <div className="flex items-center mr-4">
            <input
              id="inline-radio"
              type="radio"
              value={selectedPeriod}
              name="inline-radio-group"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={changePeriod}
            />
            <label
              htmlFor="inline-radio"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {periodOption.label}
            </label>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

export default TickerInvestments;
