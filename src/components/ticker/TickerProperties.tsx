import { ITickerUserData } from "../../utils/interfaces/ITickerUserData";

const TickerProperties = ({
  tickerUserData,
}: {
  tickerUserData?: ITickerUserData | null;
}) => {
  console.log(tickerUserData);

  return (
    <div className="flex flex-col items-center bg-drawerBackground h-[100%]">
      <span>Notes for {tickerUserData?.ticker}</span>
    </div>
  );
};

export default TickerProperties;
