import { useSelector } from "react-redux";
import AssetsGridView from "../components/AssetsGridView";
import AssetsListView from "../components/AssetsListView";
import { selectPortfolioView } from "../features/stockdivSlice";
import { ViewModeEnum } from "../utils/enums/ViewModeEnum";

const Portfolio = () => {
  const portfolioView = useSelector(selectPortfolioView);
  return (
    <>
      {portfolioView.mode === ViewModeEnum.CARD ? (
        <AssetsListView />
      ) : (
        <AssetsGridView />
      )}
    </>
  );
};

export default Portfolio;
