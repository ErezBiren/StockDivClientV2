import { ApexOptions } from "apexcharts";
import useFormatHelper from "../../hooks/useFormatHelper";
import ChartCard from "../ChartCard";
import Chart from "react-apexcharts";



const TickerInvestments = () => {
    const { formatToCurrency } = useFormatHelper();
const {tickerCurrency} = usegettick
    const whatHappenedSinceOptions:ApexOptions = {
        chart: {
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          height: 350,
          type: 'line',
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
        colors: ['#ADD8E6', '#00FF00'],
        tooltip: {
          shared: true,
          intersect: false,
        },
        stroke: {
          width: [5, 5],
          curve: 'straight',
        },
        title: {
          text: 'What happened since (up to 10 years)',
          align: 'center',
        },
        dataLabels: {
          enabled: false,
        },
        labels: [],
        xaxis: {
          type: 'datetime',
        },
        yaxis: [
          {
            title: {
              text: 'Price',
            },
            labels: {
              show: true,
              formatter: function (val: number) {
                return formatToCurrency(val, tickerCurrency.value);
              },
            },
          },
          {
            opposite: true,
            title: {
              text: 'Dividends',
            },
            labels: {
              show: true,
              formatter: function (val: number) {
                return formatToCurrency(val, tickerCurrency.value);
              },
            },
          },
        ],
      };


  return (
    <ChartCard>
    <Chart
      type="line"
      height="300"
      options={whatHappenedSinceOptions}
      series={whatHappenedSinceSeries}
    />
  </ChartCard>
  )
}

export default TickerInvestments