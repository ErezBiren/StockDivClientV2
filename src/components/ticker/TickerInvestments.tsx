import { ApexOptions } from "apexcharts";
import useFormatHelper from "../../hooks/useFormatHelper";
import ChartCard from "../ChartCard";
import Chart from "react-apexcharts";
import {
  useLazyGetTickerCurrencyQuery,
  useLazyGetWhatHappenedSinceQuery,
} from "../../features/ticker/tickerApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { startOfDate, subtractFromDate } from "../../utils/date";
import TrendingField from "../common/TrendingField";

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
  const portfolio = useSelector(selectCurrentPortfolio);
  const { ticker } = useParams();
  const { formatToCurrency, formatToPercentage } = useFormatHelper();
  const [triggerTickerCurrency, tickerCurrency] =
    useLazyGetTickerCurrencyQuery();

  const [triggerWhatHappenedSince, originalWhatHappenedSinceSeries] =
    useLazyGetWhatHappenedSinceQuery();

  const [period, setPeriod] = useState(periodOptions[0].value);
  const [firstTransaction] = useState();
  const [percentDifference, setPercentDifference] = useState(0);
  const [differencePercentColor, setDifferencePercentColor] =
    useState("text-black-500");
  const [firstAmount, setFirstAmount] = useState<number>(0);
  const [lastAmount, setLastAmount] = useState<number>(0);
  const [whatHappenedSinceSeries, setWhatHappenedSinceSeries] = useState([
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
  ]);

  const [whatHappenedSinceOptions, setWhatHappenedSinceOptions] =
    useState<ApexOptions>({});

  useEffect(() => {
    let limit: Date;
    const endDate: Date = subtractFromDate(new Date(), { days: 1 });
    if (period === "fp" && !firstTransaction) setPeriod("10y");

    switch (period) {
      case "w": {
        limit = subtractFromDate(endDate, { days: 7 });
        break;
      }
      case "m": {
        limit = subtractFromDate(endDate, { months: 1 });
        break;
      }
      case "y": {
        limit = subtractFromDate(endDate, { years: 1 });
        break;
      }
      case "ytd": {
        limit = startOfDate(endDate, "year");
        break;
      }
      case "3y": {
        limit = subtractFromDate(endDate, { years: 3 });
        break;
      }
      case "5y": {
        limit = subtractFromDate(endDate, { years: 5 });
        break;
      }
      case "10y": {
        limit = subtractFromDate(endDate, { years: 10 });
        break;
      }
      case "fp": {
        limit = firstTransaction
          ? firstTransaction
          : subtractFromDate(endDate, { years: 10 });
        break;
      }
    }

    if (
      !originalWhatHappenedSinceSeries ||
      !originalWhatHappenedSinceSeries.data
    )
      return;

    const filtered: [Date, [number, number]][] =
      originalWhatHappenedSinceSeries?.data?.filter(
        (element: [Date, [number, number]]) =>
          new Date(element[0]).getTime() >= limit.getTime()
      );

    setLastAmount(filtered[0][1][0] ? filtered[0][1][0] : filtered[1][1][0]);

    setFirstAmount(filtered[filtered.length - 1][1][0]);

    setWhatHappenedSinceSeries((prev) => {
      prev[0].data = filtered.map(
        (element: [Date, [number, number]]) => element[1][0]
      );

      prev[1].data = filtered.map(
        (element: [Date, [number, number]]) => element[1][1]
      );

      return prev;
    });

    setWhatHappenedSinceOptions((prev) => ({
      ...prev,
      xaxis: {
        categories: filtered.map(
          (element: [Date, [number, number]]) => element[0]
        ),
      },
    }));
  }, [period, firstTransaction, originalWhatHappenedSinceSeries]);

  useEffect(() => {
    if (!ticker) return;

    triggerTickerCurrency(ticker);
  }, [ticker]);

  useEffect(() => {
    if (!ticker || !portfolio) return;
    const tickerPortfolioParam = { ticker, portfolio };
    triggerWhatHappenedSince(tickerPortfolioParam);
  }, [ticker, portfolio]);

  useEffect(() => {
    setWhatHappenedSinceOptions({
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
              return formatToCurrency(val, tickerCurrency?.data);
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
              return formatToCurrency(val, tickerCurrency?.data);
            },
          },
        },
      ],
    });
  }, [tickerCurrency]);

  const changePeriod = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPeriod(e.target.value);
  };

  useEffect(() => {
    setDifferencePercentColor(
      lastAmount < firstAmount ? "text-red-500" : "text-green-500"
    );

    setPercentDifference(
      firstAmount === 0 ? 0 : ((lastAmount - firstAmount) / firstAmount) * 100
    );
  }, [firstAmount, lastAmount]);

  return (
    <ChartCard>
      <div className={`flex justify-end font-bold ${differencePercentColor}`}>
        <TrendingField positiveCondition={true} value={percentDifference} />
      </div>
      <Chart
        type="line"
        height="300"
        options={whatHappenedSinceOptions}
        series={whatHappenedSinceSeries}
      />
      <div className="flex justify-center mb-4">
        {periodOptions?.map((periodOption) => (
          <div className="flex items-center mr-4" key={periodOption.value}>
            <input
              id="inline-radio"
              type="radio"
              value={periodOption.value}
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
