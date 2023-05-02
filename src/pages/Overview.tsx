import HighestIncomeTickers from "../components/overviewCharts/HighestIncomeTickers";
import DiversificationChart from "../components/overviewCharts/DiversificationChart";
import PortfolioVsSNP500 from "../components/overviewCharts/PortfolioVsSNP500";
import News from "../components/overviewCharts/News";
import RoiChart from "../components/overviewCharts/RoiChart";
import DividendsSoFarChart from "../components/overviewCharts/DividendsSoFarChart";
import MonthsProjectionChart from "../components/overviewCharts/MonthsProjectionChart";
import PortfolioChart from "../components/overviewCharts/PortfolioChart";
import YearsProjection from "../components/overviewCharts/YearsProjection";

const Overview = () => {
  return (
    <div className="flex flex-col gap-8 text-center mt-[240px]">
      <PortfolioChart />
      <DividendsSoFarChart />
      <MonthsProjectionChart />
      <HighestIncomeTickers />
      <YearsProjection />
      <RoiChart />
      <DiversificationChart />
      <PortfolioVsSNP500 />
      <News />
    </div>
  );
};

export default Overview;
