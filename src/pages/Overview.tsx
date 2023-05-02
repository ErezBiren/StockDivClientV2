import HighestIncomeTickers from "../components/overview/HighestIncomeTickers";
import DiversificationChart from "../components/overview/DiversificationChart";
import PortfolioVsSNP500 from "../components/overview/PortfolioVsSNP500";
import PortfolioNews from "../components/overview/PortfolioNews";
import RoiChart from "../components/overview/RoiChart";
import DividendsSoFarChart from "../components/overview/DividendsSoFarChart";
import MonthsProjectionChart from "../components/overview/MonthsProjectionChart";
import PortfolioChart from "../components/overview/PortfolioChart";
import YearsProjection from "../components/overview/YearsProjection";

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
      <PortfolioNews />
    </div>
  );
};

export default Overview;
