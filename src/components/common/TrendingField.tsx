import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import useFormatHelper from "../../hooks/useFormatHelper";

type TrendingFieldProps = {
  positiveCondition: boolean;
  value: number;
};

const TrendingField = ({ positiveCondition, value }: TrendingFieldProps) => {
  const { formatToPercentage } = useFormatHelper();

  return (
    <span
      className={
        positiveCondition ? "text-trendingUpColor" : "text-trendingDownColor"
      }
    >
      {positiveCondition ? (
        <HiTrendingUp className="inline" />
      ) : (
        <HiTrendingDown className="inline" />
      )}
      {formatToPercentage(value)}
    </span>
  );
};

export default TrendingField;
