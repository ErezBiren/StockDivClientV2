import TickerNews from "../components/ticker/TickerNews";
import TickerInvestments from "../components/ticker/TickerInvestments";

const TickerPage = () => {
  return <div className="flex flex-col gap-8 text-center mt-[240px]">
    <TickerInvestments/>
    <TickerNews/>
  </div>;
};

export default TickerPage;
