import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

type TrendingArrowProps = {
  positiveCondition: boolean;
};

const TrendingArrow = ({ positiveCondition }: TrendingArrowProps) => {
  return positiveCondition ? (
    <HiTrendingUp className="inline" />
  ) : (
    <HiTrendingDown className="inline" />
  );
};

export default TrendingArrow;
