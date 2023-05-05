import TickerNews from "../components/ticker/TickerNews";
import TickerInvestments from "../components/ticker/TickerInvestments";
import DividendHistoryData from "../components/ticker/DividendHistoryData";
import FiveYearsProjection from "../components/ticker/FiveYearsProjection";

const TickerPage = () => {
  return (
    <div className="flex flex-col gap-8 text-center mt-[240px]">
      <FiveYearsProjection />
      <TickerInvestments />
      <DividendHistoryData />
      <TickerNews />
    </div>
  );
};

export default TickerPage;
