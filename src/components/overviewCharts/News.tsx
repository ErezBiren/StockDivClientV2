import ChartCard from "../ChartCard";
import { useGetNewsQuery } from "../../features/portfolio/portfolioApiSlice";
import { ITickerNews } from "../../utils/interfaces/ITickerNews";
import { useSelector } from "react-redux";
import useFormatHelper from "../../hooks/useFormatHelper";
import { selectCurrentPortfolio } from "../../features/stockdivSlice";

const News = () => {
  const selectedPortfolio = useSelector(selectCurrentPortfolio);

  const { formatToDate } = useFormatHelper();

  const { data: newsItems } = useGetNewsQuery(selectedPortfolio);

  const gotoNews = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <ChartCard>
      <span className="justify-center text-xl font-body">News</span>
      {newsItems?.map((newsItem: ITickerNews, index: number) => (
        <div
          key={index}
          className="py-2 px-2 border-gray-300 cursor-pointer border-b-[1px] hover:bg-gray-300"
          onClick={() => gotoNews(newsItem.link)}
        >
          <div className="text-xs text-gray-800">
            {formatToDate(newsItem.date.substring(0, 10))}
          </div>
          <div className="text-xs text-gray-500">{newsItem.title}</div>
        </div>
      ))}
    </ChartCard>
  );
};

export default News;
