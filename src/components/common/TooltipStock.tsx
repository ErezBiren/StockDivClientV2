import { Tooltip } from "flowbite-react";
import { ReactNode } from "react";

type TooltipStockProps = {
  content: string | ReactNode;
  children: ReactNode;
};

const TooltipStock = ({ content, children }: TooltipStockProps) => {
  return (
    <Tooltip content={content} className="text-xs transition-opacity duration-300"  style="light" >
      {children}
    </Tooltip>
  );
};

export default TooltipStock;
