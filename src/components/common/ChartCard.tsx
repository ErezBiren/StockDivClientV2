import { ReactNode } from "react";

interface ChartCardProps {
  children?: ReactNode;
}

const ChartCard = ({ children }: ChartCardProps) => {
  return <div className="bg-cardBackground shadow-lg">{children}</div>;
};

export default ChartCard;
