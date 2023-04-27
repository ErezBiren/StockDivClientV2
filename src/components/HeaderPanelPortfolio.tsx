import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useGetAssetsQuery } from "../features/portfolio/portfolioApiSlice";

const HeaderPanelPortfolio = () => {
  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const { data: assets } = useGetAssetsQuery(selectedPortfolio);

  return (
    <div className="bg-[#E1F5FE] shadow-lg p-2">
      <div className="flex flex-row justify-between gap-2">
        <span>{assets?.length} assets</span>
        <span className="w-[1px] h-6 bg-slate-400"/>
        <span>:</span>
      </div>
      <div className="flex flex-col items-center"></div>
    </div>
  );
};

export default HeaderPanelPortfolio;
