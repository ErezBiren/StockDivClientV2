import { useGetTickerNewsQuery } from "../../features/ticker/tickerApiSlice";
import News from "../common/News";

const TickerNews = () => {
  const { data: newsItems } = useGetTickerNewsQuery("HBEIF");
  return <News newsItems={newsItems} />;
};

export default TickerNews;
