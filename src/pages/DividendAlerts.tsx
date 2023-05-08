import { useSelector } from "react-redux";
import { selectCurrentPortfolio } from "../features/stockdivSlice";
import { useGetAlertsQuery } from "../features/portfolio/portfolioApiSlice";
import { IDividendAlert } from "../utils/interfaces/IDividendAlert";
import AlertCard from "../components/AlertCard";

const DividendAlerts = () => {
  const portfolio = useSelector(selectCurrentPortfolio);
  const { data: alerts } = useGetAlertsQuery(portfolio);

  return (
    <div className="flex flex-wrap mt-[160px] justify-around">
      {alerts?.map((alert: IDividendAlert, index: number) => (
        <AlertCard key={index} alert={alert} />
      ))}
    </div>
  );
};

export default DividendAlerts;
