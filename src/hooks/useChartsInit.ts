import { ApexOptions } from "apexcharts";

import useFormatHelper from "./useFormatHelper";
import { useState } from "react";
import {
  useGetInvestedQuery,
  useGetSoFarQuery,
} from "../features/portfolio/portfolioApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentPortfolio } from "../features/stockdivSlice";

const useChartsInit = () => {
  const selectedPortfolio = useSelector(selectCurrentPortfolio);

  const { formatToCurrency, formatToPercentage } = useFormatHelper();
  const [portfolioMarketValue] = useState(0);
  const { data: portfolioInvested } =
    useGetInvestedQuery(selectedPortfolio);
  const { data: dividendsSoFar } =
    useGetSoFarQuery(selectedPortfolio);

  const monthsProjectionChartOptionsInit: ApexOptions = {
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
        return formatToCurrency(val);
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
          return formatToCurrency(val);
        },
      },
    },
  };

  const diversificationChartOptionsInit: ApexOptions = {
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
        return formatToPercentage(opt.w.config.series[opt.seriesIndex]);
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
                return formatToPercentage(Number(val));
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
  };

  const performanceChartOptionsInit: ApexOptions = {
    chart: {
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
      },
      animations: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#77B6EA", "#A1EA77"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      align: "center",
      text: `${selectedPortfolio} vs S&P500`,
    },
    markers: {
      size: 1,
    },
    xaxis: {
      type: "datetime",
      categories: [],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    yaxis: {
      title: {},
      labels: {
        formatter: function (val: number) {
          return formatToPercentage(val);
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

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
        return formatToCurrency(val);
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
          return formatToCurrency(val);
        },
      },
    },
    title: {
      text: "",
    },
  };

  const monthChartOptions = {
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: number) {
          return formatToCurrency(value);
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
      formatter: function (_val: number, opt: any) {
        return formatToCurrency(opt.w.config.series[opt.seriesIndex]);
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
                return formatToCurrency(
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

  const yearChartOptions: ApexOptions = {
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: number) {
          return formatToCurrency(value);
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
        return formatToCurrency(opt.w.config.series[opt.seriesIndex]);
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
                return formatToCurrency(
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
          return formatToCurrency(value);
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
      formatter: function (_val: number, opt: any) {
        return formatToCurrency(opt.w.config.series[opt.seriesIndex]);
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
                return formatToCurrency(
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

  const projectionChartOptionsInit: ApexOptions = {
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
        return formatToCurrency(val);
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
          return formatToCurrency(val);
        },
      },
    },
  };

  const highestIncomeChartOptionsInit: ApexOptions = {
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
        return formatToCurrency(val);
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
          return formatToCurrency(val);
        },
      },
    },
  };

  return {
    monthsProjectionChartOptionsInit,
    diversificationChartOptionsInit,
    performanceChartOptionsInit,
    portfolioChartOptions,
    monthChartOptions,
    yearChartOptions,
    weekChartOptions,
    projectionChartOptionsInit,
    highestIncomeChartOptionsInit,
  };
};

export default useChartsInit;
