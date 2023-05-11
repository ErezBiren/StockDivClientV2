import { useState } from "react";
import { ITickerUserData } from "../../utils/interfaces/ITickerUserData";
import TooltipStock from "../common/TooltipStock";

const TickerPropertiesDialog = ({
  tickerUserData,
}: {
  tickerUserData?: ITickerUserData | null;
}) => {
  const [notesLength, setNotesLength] = useState(0);

  return (
    <div className="flex flex-col items-center bg-drawerBackground h-[100%] gap-3 pt-5">
      <span>Notes for {tickerUserData?.ticker}</span>
      <div className="flex flex-col gap-1">
        <input
          maxLength={200}
          type="text"
          name="notes"
          id="notes"
          className="bg-transparent border-0 border-b-2"
          onChange={(e) => setNotesLength(e.target.value.length)}
        />
        <div className="flex flex-row justify-between text-xs">
          <span>Notes</span>
          <span>{notesLength}/200</span>
        </div>
        <input
          maxLength={200}
          type="text"
          name="notes"
          id="notes"
          className="bottom-0 bg-transparent border-0 border-b-2"
          onChange={(e) => setNotesLength(e.target.value.length)}
        />
        <div className="flex flex-row justify-start text-xs">
          <span>Tax</span>
        </div>

        <span className="flex justify-center">
          <TooltipStock content="Save">
            <button>Save</button>
          </TooltipStock>
        </span>
      </div>
    </div>
  );
};

export default TickerPropertiesDialog;
