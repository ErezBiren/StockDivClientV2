import { useGetNewsQuery } from "../../features/portfolio/portfolioApiSlice";
import { useSelector } from "react-redux";

import { selectCurrentPortfolio } from "../../features/stockdivSlice";
import News from "../common/News";

const PortfolioNews = () => {
  const selectedPortfolio = useSelector(selectCurrentPortfolio);
  const { data: newsItems } = useGetNewsQuery(selectedPortfolio);

  return <News newsItems={newsItems} />;
};

export default PortfolioNews;
