import { ChangeEvent, useState } from "react";
import Splitter from "../common/Splitter";
import { MdModeEdit } from "react-icons/md";
import { showError, showNotification } from "../../utils/utils";
import TooltipStock from "../common/TooltipStock";
import { useSpiltTickerMutation } from "../../features/ticker/tickerApiSlice";

type SplitTickerDialogProps = { ticker: string };

const SplitTickerDialog = ({ ticker }: SplitTickerDialogProps) => {
  const [ratioFrom, setRatioFrom] = useState(0);
  const [ratioTo, setRatioTo] = useState(0);
  const [spiltTicker] = useSpiltTickerMutation();

  function handleRatioFromChanged(e: ChangeEvent<HTMLInputElement>) {
    setRatioFrom(Number.parseInt(e.target.value));
  }

  function handleRatioToChanged(e: ChangeEvent<HTMLInputElement>) {
    setRatioTo(Number.parseInt(e.target.value));
  }

  function submitSplitTicker() {
    if (ratioFrom === 0 || ratioTo === 0) {
      showNotification("Invalid ratio");
      return;
    }

    if (ratioFrom === ratioTo) {
      showNotification("This is not a split");
      return;
    }

    const ratio = ratioTo / ratioFrom;
    spiltTicker({ ticker, ratio })
      .unwrap()
      .then((response) => {
        if (response.result) {
          showNotification("Ticker was splitted successfully");
          // todo:close dialog
        } else {
          showNotification(response.data.error);
        }
      })
      .catch((error) => {
        showError(error);
      });
  }

  return (
    <form
      className="flex flex-col items-center bg-drawerBackground h-[100%] gap-3 p-5"
      onSubmit={submitSplitTicker}
    >
      <span className="flex flex-row">Split of {ticker}</span>
      <Splitter />
      <div className="flex flex-row items-center gap-2">
        <span className="flex flex-col items-start gap-1">
          <input
            value={ratioFrom}
            type="number"
            name="ratioFrom"
            id="ratioFrom"
            className="bg-transparent border-0 border-b-2 w-[125px]"
            onChange={handleRatioFromChanged}
          />
          <span className="text-xs">Ratio from</span>
        </span>
        <span className="flex flex-col items-start gap-1">
          <input
            value={ratioTo}
            type="number"
            name="ratioTo"
            id="ratioTo"
            className="w-[125px] bg-transparent border-0 border-b-2"
            onChange={handleRatioToChanged}
          />
          <span className="text-xs">Ratio to</span>
        </span>
        <span className="cursor-pointer" onClick={submitSplitTicker}>
          <TooltipStock content={`Split with ratio of ${ratioFrom}/${ratioTo}`}>
            <MdModeEdit />
          </TooltipStock>
        </span>
      </div>
      <div>
        * this action will change VFC in
        <span className="font-semibold"> ALL </span>your transactions
      </div>
    </form>
  );
};

export default SplitTickerDialog;
