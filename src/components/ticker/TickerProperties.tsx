import { ITickerUserData } from "../../utils/interfaces/ITickerUserData";

const TickerProperties = ({ ticker }: { ticker?: ITickerUserData | null }) => {
  console.log(555);
  return <div>{ticker?.notes}</div>;
};

export default TickerProperties;
