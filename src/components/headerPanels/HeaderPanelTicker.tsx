import { useSelector } from "react-redux";
import { selectCurrentTicker } from "../../features/stockdivSlice";
import { useGetTickerLogoQuery, useGetTickerNameQuery } from "../../features/ticker/tickerApiSlice";
import Splitter from "../common/Splitter";

const HeaderPanelTicker = () => {
  const ticker = useSelector(selectCurrentTicker);
  const { data: tickerName } = useGetTickerNameQuery(ticker);
  const { data: tickerLogo } = useGetTickerLogoQuery(ticker);
  return (
    <div className="bg-[#E1F5FE] shadow-lg p-2">
      <div className="flex flex-row items-center justify-between gap-2">
        <img src={tickerLogo} className="w-[28px] h-[28px]" />
        <span>{ticker}:</span>
        <span>{tickerName?.substring(0, 30)}</span>
      </div>
      <Splitter/>
      <div className="flex flex-col items-center"></div>
    </div>
  );
};

export default HeaderPanelTicker;
