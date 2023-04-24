import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  useGetMarketValueQuery,
  useGetInvestedQuery,
  useGetSoFarQuery,
  useGetNextQuery,
  useGetPeriodsQuery,
  useGetMonthsProjectionQuery,
  useGetRoiMeterQuery,
  useGetDiversityQuery,
} from "../features/portfolio/portfolioApiSlice";
import useFilters from "../hooks/useFilters";
import { IDiversification } from "../utils/interfaces/IDiversification";

const Overview = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState("Portfolio");
  const [portfolioMarketValue, setPortfolioMarketValue] = useState(1);
  const [showReinvest, setShowReinvest] = useState(false);
  const [nextDividendInfo, setNextDividendInfo] = useState("");

  const [monthsProjectionChartOptions, setMonthsProjectionChartOptions] =
    useState<ApexOptions>({
      chart: {
        type: "bar",
        toolbar: {
          tools: {
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            zoom: false,
          },
        },
      },
      title: {
        text: "12 months projection",
        align: "center",
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
          return filters.formatToCurrency(val);
        },
        offsetY: -20,
        style: {
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [],
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
            return filters.formatToCurrency(val);
          },
        },
      },
    });

  const { filters } = useFilters();

  const [portfolioChartSeries, setPortfolioChartSeries] =
    useState<ApexAxisChartSeries>([
      {
        data: [0, 0, 0, 0],
      },
    ]);

  const [yearlyChartSeries, setYearlyChartSeries] =
    useState<ApexAxisChartSeries>([
      {
        data: [0, 0, 0, 0],
      },
    ]);
  const [monthlyChartSeries, setMonthlyChartSeries] =
    useState<ApexAxisChartSeries>([
      {
        data: [0, 0, 0, 0],
      },
    ]);
  const [weeklyChartSeries, setWeeklyChartSeries] =
    useState<ApexAxisChartSeries>([
      {
        data: [0, 0, 0, 0],
      },
    ]);

  const [monthsProjectionChartSeries, setMonthsProjectionChartSeries] =
    useState<ApexAxisChartSeries>([
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ]);

  const { data: portfolioInvested, isSuccess: isSuccessPortfolioInvested } =
    useGetInvestedQuery(selectedPortfolio);
  const { data: marketValue, isSuccess: isSuccessMarketValue } =
    useGetMarketValueQuery(selectedPortfolio);
  const { data: dividendsSoFar, isSuccess: isSuccessDividendsSoFar } =
    useGetSoFarQuery(selectedPortfolio);

  const { data: next, isSuccess: isSuccessNext } =
    useGetNextQuery(selectedPortfolio);

  const { data: periods, isSuccess: isSuccessPeriods } =
    useGetPeriodsQuery(selectedPortfolio);

  const { data: monthsProjection, isSuccess: isSuccessMonthsProjection } =
    useGetMonthsProjectionQuery(selectedPortfolio);

  const { data: roiMeterText } = useGetRoiMeterQuery(selectedPortfolio);

  const { data: diversity, isSuccess: isSuccessDiversity } =
    useGetDiversityQuery(selectedPortfolio);

  const [diversificationChartOptions, setDiversificationChartOptions] =
    useState<ApexOptions>({
      tooltip: {
        enabled: false,
      },
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        align: "center",
        text: "Diversification",
      },
      legend: {
        show: false,
      },
      colors: [
        "#90EE90",
        "#ADD8E6",
        "#CBC3E3",
        "#29008b",
        "#89d74d",
        "#bef0d2",
        "#9179b3",
        "#466c8e",
        "#add06c",
        "#aee104",
        "#14f8b0",
        "#361ae0",
        "#f5e28f",
        "#c45201",
        "#f59095",
        "#ecdc68",
        "#6a0553",
        "#94aa32",
        "#a43afa",
        "#adc181",
      ],
      labels: [],
      fill: {
        type: "gradient",
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["black", "black", "black"],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: function (_val: number, opt: any) {
          return filters.formatToPercentage(
            opt.w.config.series[opt.seriesIndex]
          );
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
                formatter: function (val: string) {
                  return filters.formatToPercentage(Number(val));
                },
              },
              total: {
                show: false,
                showAlways: false,
              },
            },
          },
        },
      },
    });

  const [diversificationChartSeries, setDiversificationChartSeries] =
    useState<number[]>({});

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
          return filters.formatToCurrency(val);
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
                  : `${filters.formatToPercentage(
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
  }, [dividendsSoFar, filters, portfolioInvested, roiMeterText]);

  useEffect(() => {
    if (isSuccessMonthsProjection) {
      setMonthsProjectionChartOptions({
        xaxis: {
          categories: monthsProjection.map((item: [string, number]) => item[0]),
        },
      });

      setMonthsProjectionChartSeries(
        monthsProjection.map((item: [string, number]) => item[1])
      );
    }
  }, [isSuccessMonthsProjection, monthsProjection]);

  useEffect(() => {
    if (isSuccessPeriods) {
      setYearlyChartSeries(periods.yearDividend);
      setMonthlyChartSeries(periods.monthDividend);
      setWeeklyChartSeries(periods.weekDividend);
    }
  }, [isSuccessPeriods, periods]);

  useEffect(() => {
    if (isSuccessNext) {
      if (next.days === -1)
        setNextDividendInfo("Nothing in the next 31 days...");
      else if (next.days === 0)
        setNextDividendInfo(
          `Today you should get ${filters.formatToCurrency(next.amount)}`
        );
      else if (next.days === 1)
        setNextDividendInfo(
          `Tomorrow you should get ${filters.formatToCurrency(next.amount)}`
        );
      else
        setNextDividendInfo(
          `In ${next.days} days you should get ${filters.formatToCurrency(
            next.amount
          )}`
        );
    }
  }, [filters, isSuccessNext, next]);

  useEffect(() => {
    if (isSuccessDividendsSoFar) {
      console.log(1);
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
      console.log(1);
      setRoiChartSeries((prev) => {
        const res: [{ data: number[] }, { data: number[] }] = [
          { ...prev[0] },
          { data: [portfolioInvested] },
        ];
        return res;
      });
    }
  }, [isSuccessPortfolioInvested, portfolioInvested]);

  useEffect(() => {
    if (
      isSuccessPortfolioInvested &&
      isSuccessMarketValue &&
      isSuccessDividendsSoFar
    ) {
      setPortfolioChartSeries([
        {
          data: [
            portfolioInvested,
            marketValue,
            marketValue - portfolioInvested,
            marketValue - portfolioInvested + dividendsSoFar,
          ],
        },
      ]);
    }
  }, [
    portfolioInvested,
    isSuccessPortfolioInvested,
    isSuccessMarketValue,
    isSuccessDividendsSoFar,
    marketValue,
    dividendsSoFar,
  ]);

  const highestIncomeChartSeries: ApexAxisChartSeries = [
    {
      data: [30, 40, 35, 50],
    },
  ];

  const projectionChartSeries: ApexAxisChartSeries = [
    {
      data: [30, 40, 35, 50],
    },
  ];

  const portfolioChartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    colors: [
      (data: { value: number; dataPointIndex: number }) => {
        switch (data.dataPointIndex) {
          case 0:
            return "#55aaff";
          case 1:
            return portfolioMarketValue < portfolioInvested
              ? "#ff4122"
              : "#72bf6a";
          case 2:
            return portfolioMarketValue - portfolioInvested < 0
              ? "#ff4122"
              : "#72bf6a";
          case 3:
            return portfolioMarketValue - portfolioInvested + dividendsSoFar < 0
              ? "#ff4122"
              : "#72bf6a";
        }
      },
    ],
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
        return filters.formatToCurrency(val);
      },
      offsetY: -20,
      style: {
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: ["Invested", "Market Value", "Profit/Loss", "Total Return"],
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
          return filters.formatToCurrency(val);
        },
      },
    },
    title: {
      text: "",
    },
  };

  const highestIncomeChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        tools: {
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          zoom: false,
        },
      },
    },
    title: {
      text: "Highest income tickers",
      align: "center",
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
        return filters.formatToCurrency(val);
      },
      offsetY: -20,
      style: {
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: [],
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
          return filters.formatToCurrency(val);
        },
      },
    },
  };

  const projectionChartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "10 years projection",
      align: "center",
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
        return filters.formatToCurrency(val);
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
        new Date().getFullYear() + 6,
        new Date().getFullYear() + 7,
        new Date().getFullYear() + 8,
        new Date().getFullYear() + 9,
        new Date().getFullYear() + 10,
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
          return filters.formatToCurrency(val);
        },
      },
    },
  };

  const yearChartOptions: ApexOptions = {
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: number) {
          return filters.formatToCurrency(value);
        },
      },
    },
    colors: ["#90EE90", "#ADD8E6", "#CBC3E3"],
    labels: ["Received", "Remain", "Projected"],
    fill: {
      type: "gradient",
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["black", "black", "black"],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (_val: number, opt: any) {
        return filters.formatToCurrency(opt.w.config.series[opt.seriesIndex]);
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Year",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter: function (w: any) {
                return filters.formatToCurrency(
                  w.globals.seriesTotals.reduce((a: number, b: number) => {
                    return a + b;
                  }, 0)
                );
              },
            },
          },
        },
      },
    },
  };

  const weekChartOptions: ApexOptions = {
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: number) {
          return filters.formatToCurrency(value);
        },
      },
    },
    colors: ["#90EE90", "#ADD8E6", "#CBC3E3"],
    labels: ["Received", "Remain", "Projected"],
    fill: {
      type: "gradient",
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["black", "black", "black"],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (val: number, opt: any) {
        return filters.formatToCurrency(opt.w.config.series[opt.seriesIndex]);
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Week",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter: function (w: any) {
                return filters.formatToCurrency(
                  w.globals.seriesTotals.reduce((a: number, b: number) => {
                    return a + b;
                  }, 0)
                );
              },
            },
          },
        },
      },
    },
  };

  const monthChartOptions = {
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: number) {
          return filters.formatToCurrency(value);
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#90EE90", "#ADD8E6", "#CBC3E3"],
    labels: ["Received", "Remain", "Projected"],
    fill: {
      type: "gradient",
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["black", "black", "black"],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (val: number, opt: any) {
        return filters.formatToCurrency(opt.w.config.series[opt.seriesIndex]);
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Month",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter: function (w: any) {
                return filters.formatToCurrency(
                  w.globals.seriesTotals.reduce((a: number, b: number) => {
                    return a + b;
                  }, 0)
                );
              },
            },
          },
        },
      },
    },
  };

  const handleReinvestChanged = () => {
    setShowReinvest((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="bg-[#cce7ff] shadow-lg">
        <Chart
          type="bar"
          options={portfolioChartOptions}
          series={portfolioChartSeries}
          width={500}
          height={320}
        />
      </div>
      <div className="bg-[#cce7ff] shadow-lg">
        <div className="justify-center text-h6 q-mt-sm row no-wrap">
          Dividends so far: {filters.formatToCurrency(dividendsSoFar)}
        </div>
        <div className="text-h6 q-mt-sm">{nextDividendInfo}</div>

        {next?.tickers.map((ticker: string, index: number) => (
          <div className="flex flex-column ">
            <div
              key={index}
              className="center relative inline-block select-none whitespace-nowrap rounded-xl bg-teal-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white"
              title={`Next Dividend: ${filters.formatToCurrency(
                next?.amouts?.[index]
              )}`}
            >
              <div className="mt-px">{ticker}</div>
            </div>
            <img src={next?.logos[index]} className="h-[32px] w-[32px]" />
          </div>
        ))}
        <div className="justify-center row">
          <Chart
            type="donut"
            height={200}
            options={yearChartOptions}
            series={yearlyChartSeries}
          />
          <Chart
            type="donut"
            height={200}
            options={monthChartOptions}
            series={monthlyChartSeries}
          />
          <Chart
            type="donut"
            height={200}
            options={weekChartOptions}
            series={weeklyChartSeries}
          />
        </div>
      </div>
      <div className="bg-[#cce7ff] shadow-lg">
        <Chart
          type="bar"
          options={monthsProjectionChartOptions}
          series={monthsProjectionChartSeries}
          width={500}
          height={320}
        />
      </div>
      <div className="bg-[#cce7ff] shadow-lg">
        <Chart
          type="bar"
          options={highestIncomeChartOptions}
          series={highestIncomeChartSeries}
          width={500}
          height={320}
        />
      </div>
      <div className="bg-[#cce7ff] shadow-lg">
        <label className="relative inline-flex items-center mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showReinvest}
            className="sr-only peer"
            onChange={handleReinvestChanged}
          />
          <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 ">
            With Reinvest
          </span>
        </label>
        <Chart
          type="bar"
          options={projectionChartOptions}
          series={projectionChartSeries}
          width={500}
          height={320}
        />
      </div>
      <div className="bg-[#cce7ff] shadow-lg">
        <Chart
          type="bar"
          options={roiChartOptions}
          series={roiChartSeries}
          height={320}
        />
      </div>
      <div className="bg-[#cce7ff] shadow-lg">
        <Chart 
          type="donut"
          options={diversificationChartOptions}
          series={diversificationChartSeries}
          height={300}
        />
      </div>
    </div>
  );
};

export default Overview;
