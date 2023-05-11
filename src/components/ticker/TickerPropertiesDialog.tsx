import { useEffect, useState } from "react";
import { ITickerUserData } from "../../utils/interfaces/ITickerUserData";
import TooltipStock from "../common/TooltipStock";
import { useSubmitTickerUserDataMutation } from "../../features/ticker/tickerApiSlice";

const TickerPropertiesDialog = ({
  tickerUserData,
}: {
  tickerUserData?: ITickerUserData | null;
}) => {
  const [submitTickerUserData] = useSubmitTickerUserDataMutation();

  useEffect(() => {
    setNotes(tickerUserData?.notes);
    setTax(tickerUserData?.tax);
  }, [tickerUserData]);

  const [notes, setNotes] = useState<string>();
  const [tax, setTax] = useState<number>();

  async function submitData() {
    const newTickerUserData: ITickerUserData = {
      notes: notes ?? "",
      tax,
      ticker: tickerUserData?.ticker ?? "", // todo: what if we dont have it??
      portfolio: tickerUserData?.portfolio ?? "",
    };
    const x = await submitTickerUserData(newTickerUserData);
  }

  return (
    <div className="flex flex-col items-center bg-drawerBackground h-[100%] gap-3 pt-5">
      <span>Notes for {tickerUserData?.ticker}</span>
      <div className="flex flex-col gap-1">
        <input
          value={notes}
          maxLength={200}
          type="text"
          name="notes"
          id="notes"
          className="bg-transparent border-0 border-b-2"
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="flex flex-row justify-between text-xs">
          <span>Notes</span>
          <span>{notes?.length ?? 0}/200</span>
        </div>
        <input
          value={tax}
          type="number"
          name="notes"
          id="notes"
          className="bottom-0 bg-transparent border-0 border-b-2"
          onChange={(e) => setTax(e.target.value)}
        />
        <div className="flex flex-row justify-start text-xs">
          <span>Tax</span>
        </div>

        <span className="flex justify-center">
          <TooltipStock content="Save">
            <button onClick={submitData}>Save</button>
          </TooltipStock>
        </span>
      </div>
    </div>
  );
};

export default TickerPropertiesDialog;
