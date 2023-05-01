import AssetsGridView from "../components/AssetsGridView";
import AssetsListView from "../components/AssetsListView";

const Portfolio = () => {
  const view = "assetsListView";

  return <>{view === "assetsListView" ? <AssetsListView /> : <AssetsGridView/>}</>;
};

export default Portfolio;
