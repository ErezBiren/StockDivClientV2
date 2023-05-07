import { ReactNode } from "react";

interface ChartCardProps {
  children?: ReactNode;
}

const ChartCard = ({ children }: ChartCardProps) => {
  return <div className="bg-[#E1F5FE] shadow-lg">{children}</div>;
};

export default ChartCard;
