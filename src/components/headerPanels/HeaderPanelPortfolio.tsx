import { useSelector } from "react-redux";
import { useGetAssetsQuery } from "../../features/portfolio/portfolioApiSlice";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";

const HeaderPanelPortfolio = () => {
  const selectedPortfolio = useSelector(selectCurrentPortfolio);

  const { data: assets } = useGetAssetsQuery(selectedPortfolio);

  return (
    <div className="bg-cardBackground shadow-lg p-2">
      <div className="flex flex-row justify-between gap-2">
        <span>{assets?.length} assets</span>
        <span className="w-[1px] h-6 bg-slate-400" />
        <span>:</span>
      </div>
      <div className="flex flex-col items-center"></div>
    </div>
  );
};

export default HeaderPanelPortfolio;
