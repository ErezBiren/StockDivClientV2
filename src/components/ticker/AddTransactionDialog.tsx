import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ITransactionData } from "../../utils/interfaces/ITransactionData";
import {
  useLazyGetTickerCurrencyQuery,
  useLazyGetTickerPriceQuery,
  useSubmitTransactionMutation,
} from "../../features/ticker/tickerApiSlice";
import { showError } from "../../utils/utils";
import { useGetPortfoliosQuery } from "../../features/portfolio/portfolioApiSlice";
import Dropdown from "../common/Dropdown";
import { MdRequestQuote } from "react-icons/md";
import TooltipStock from "../common/TooltipStock";

type AddTransactionDialogProps = { ticker: string };

const AddTransactionDialog = ({ ticker }: AddTransactionDialogProps) => {
  const { data: portfolios } = useGetPortfoliosQuery("");
  const [triggerTickerPrice] = useLazyGetTickerPriceQuery();

  const [when, setWhen] = useState(new Date());
  const [shares, setShares] = useState(0);
  const [sharePrice, setSharePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isStockDividend, setIsStockDividend] = useState(false);
  const [portfolio, setPortfolio] = useState("");

  const [submitTransactionMutation] = useSubmitTransactionMutation();

  const [triggerTicketCurrency, tickerCurrency] =
    useLazyGetTickerCurrencyQuery();

  useEffect(() => {
    if (!portfolios || portfolios.length === 0) return;
    setPortfolio(portfolios[0]);
  }, [portfolios]);

  useEffect(() => {
    if (!ticker) return;
    triggerTicketCurrency(ticker);
  }, [ticker]);

  function submitNewTransaction(e: SyntheticEvent) {
    e.preventDefault();

    if (portfolio === "All Portfolios") {
      showError("You can't add/edit a transaction in All Portfolios");
    } else {
      const transactions: ITransactionData[] = [];
      const editedTransaction = {
        ticker,
        portfolio,
        sharePrice,
        shares,
        when: when.toString(),
        currency: tickerCurrency.data,
      };
      transactions.push(editedTransaction);
      try {
        submitTransactionMutation({ transactions, editedTransaction });
      } catch (error) {
        console.log(error);
        //showError(error.message.toString());
      } finally {
        //todo:
      }
    }
  }

  function handleQuantityChanged(e: ChangeEvent<HTMLInputElement>) {
    const newQuantity = Number.parseInt(e.target.value);
    setShares(newQuantity);
    setTotalPrice(newQuantity * sharePrice);
  }

  function handlePriceChanged(e: ChangeEvent<HTMLInputElement>) {
    const newPrice = Number.parseInt(e.target.value);
    setSharePrice(newPrice);
    setTotalPrice(newPrice * shares);
  }

  function handleTotalPriceChanged(e: ChangeEvent<HTMLInputElement>) {
    const newTotalPrice = Number.parseInt(e.target.value);
    setTotalPrice(newTotalPrice);
    setSharePrice(newTotalPrice / shares);
  }

  function getPriceForTransaction() {
    if (isStockDividend) return;

    triggerTickerPrice({ ticker, when: when.toString() })
      .unwrap()
      .then(() => sharePriceChange());
  }

  function sharePriceChange() {
    //todo:
    // if (!this.newTransactionSharePrice) return;
    // if (this.newTransactionShares === 0) this.newTransactionShares = 1;
    // this.newTransactionTotal =
    //   Math.round(
    //     this.newTransactionShares * this.newTransactionSharePrice * 1000
    //   ) / 1000;
  }

  return (
    <form
      className="flex flex-col items-center bg-drawerBackground h-[100%] gap-1 p-5"
      onSubmit={submitNewTransaction}
    >
      <span className="flex flex-row border-b-2">
        Add transaction to {ticker} in portfolio
        <Dropdown
          items={portfolios}
          selectedItem={portfolio}
          onItemChanged={(selectedItem) => setPortfolio(selectedItem)}
        />
      </span>
      <span className="flex flex-row items-center justify-between">
        <span className="flex flex-col items-start gap-1">
          <DatePicker
            selected={when}
            onChange={(date: Date) => setWhen(date)}
          />
          <span className="text-xs">When</span>
        </span>
        <input
          checked={isStockDividend}
          id="disabled-checked-checkbox"
          type="checkbox"
          onChange={() => setIsStockDividend((prev) => !prev)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="disabled-checked-checkbox"
          className="ml-2 text-sm font-medium "
        >
          Is stock dividend?
        </label>
      </span>
      <div className="flex flex-row items-center gap-2">
        <span className="flex flex-col items-start gap-1">
          <input
            min={1}
            value={shares}
            type="number"
            name="quantity"
            id="quantity"
            className="w-[125px] bg-transparent border-0 border-b-2"
            onChange={handleQuantityChanged}
          />
          <span className="text-xs">quantity</span>
        </span>
        <TooltipStock content="Get price (based on selected date)">
          <span onClick={getPriceForTransaction} className="cursor-pointer">
            <MdRequestQuote />
          </span>
        </TooltipStock>
        <span className="flex flex-col items-start gap-1">
          <input
            value={sharePrice}
            type="number"
            name="price"
            id="price"
            className="bg-transparent border-0 border-b-2 w-[125px]"
            onChange={handlePriceChanged}
          />
          <span className="text-xs">price</span>
        </span>
        <span className="flex flex-col items-start gap-1">
          <input
            value={totalPrice}
            type="number"
            name="totalPrice"
            id="totalPrice"
            className="w-[125px] bg-transparent border-0 border-b-2"
            onChange={handleTotalPriceChanged}
          />
          <span className="text-xs">Total Price</span>
        </span>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default AddTransactionDialog;
