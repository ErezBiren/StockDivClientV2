import { ApexOptions } from "apexcharts";
import { useState } from "react";
import Chart from "react-apexcharts";

const Overview = () => {
  const [portfolioMarketValue, setPortfolioMarketValue] = useState(1);
  const [portfolioInvested, setPortfolioInvested] = useState(1);
  const [dividendsSoFar, setDividendsSoFar] = useState(1);
  const [showReinvest, setShowReinvest] = useState(false);

  const portfolioChartSeries: ApexAxisChartSeries = [
    {
      data: [30, 40, 35, 50],
    },
  ];

  const monthsProjectionChartSeries: ApexAxisChartSeries = [
    {
      data: [30, 40, 35, 50],
    },
  ];

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
      //   formatter: function (val: number) {
      //     return filters.formatToCurrency(val);
      //   },
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
        // formatter: function (val: number) {
        //   return filters.formatToCurrency(val);
        // },
      },
    },
    title: {
      text: "",
    },
  };

  const monthsProjectionChartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    title: {
      show: true,
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
      //   formatter: function (val: number) {
      //     return filters.formatToCurrency(val);
      //   },
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
        // formatter: function (val: number) {
        //   return filters.formatToCurrency(val);
        // },
      },
    },
  };

  const highestIncomeChartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    title: {
      show: true,
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
      //   formatter: function (val: number) {
      //     return filters.formatToCurrency(val);
      //   },
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
        // formatter: function (val: number) {
        //   return filters.formatToCurrency(val);
        // },
      },
    },
  };

  const projectionChartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    title: {
      show: true,
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
      //   formatter: function (val: number) {
      //     return filters.formatToCurrency(val);
      //   },
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
        // formatter: function (val: number) {
        //   return filters.formatToCurrency(val);
        // },
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
        <Chart
          type="bar"
          options={monthsProjectionChartOptions}
          series={monthsProjectionChartSeries}
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
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
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
    </div>
  );
};

export default Overview;
