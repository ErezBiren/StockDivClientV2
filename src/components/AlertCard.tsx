import useFormatHelper from "../hooks/useFormatHelper";
import { IDividendAlert } from "../utils/interfaces/IDividendAlert";
import TrendingField from "./common/TrendingField";

const AlertCard = ({ alert }: { alert: IDividendAlert }) => {
  const { formatToDate } = useFormatHelper();

  return (
    <div className="flex flex-col items-center p-5 shadow-lg bg-cardBackground">
      <div className="flex flex-row items-center gap-2">
        <img src={alert.logo} className="h-[16px] w-[16px]" />
        {alert.ticker}
      </div>
      <div className="w-5/6 bg-gray-300 h-[1px]" />
      <div>{formatToDate(alert.eventDate)}</div>
      <div className="w-5/6 bg-gray-300 h-[1px]" />

      <div className="mt-10">{alert.alert}</div>
      <div className="w-5/6 bg-gray-300 h-[1px]" />
      <TrendingField
        positiveCondition={alert.percentage >= 0}
        value={alert.percentage}
      />
    </div>
  );
};

export default AlertCard;
