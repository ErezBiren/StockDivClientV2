import { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ITransactionData } from "../../utils/interfaces/ITransactionData";
import {
  useLazyGetTickerCurrencyQuery,
  useSubmitTransactionMutation,
} from "../../features/ticker/tickerApiSlice";
import { showError, showNotification } from "../../utils/utils";
import { useGetPortfoliosQuery } from "../../features/portfolio/portfolioApiSlice";
import Dropdown from "../common/Dropdown";

type AddTransactionDialogProps = { ticker: string };

const AddTransactionDialog = ({ ticker }: AddTransactionDialogProps) => {
  const { data: portfolios } = useGetPortfoliosQuery("");

  const [when, setWhen] = useState(new Date());
  const [shares, setShares] = useState(0);
  const [sharePrice, setSharePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isStockDivided, setIsStockDivided] = useState(false);
  const [portfolio, setPortfolio] = useState("");

  const [editedTransaction, setEditedTransaction] = useState<ITransactionData>({
    ticker: "",
    shares: 0,
    sharePrice: 0,
    portfolio: "",
    currency: "",
    when: "",
  });

  const [submitTransactionMutation] = useSubmitTransactionMutation();

  const [triggerTicketCurrency, tickerCurrency] =
    useLazyGetTickerCurrencyQuery();

  const [first, setfirst] = useState(true);

  // useEffect(() => {
  //   if (!portfolios || portfolios.length === 0 && !first) return;
  //   setPortfolio(portfolios[0]);
  //   setfirst(false);
  // }, []);

  useEffect(() => {
    if (!ticker) return;
    triggerTicketCurrency(ticker);
  }, [ticker]);

  function submitNewTransaction() {
    if (portfolio === "All Portfolios") {
      showNotification("You can't add/edit a transaction in All Portfolios");
    } else {
      const transactions: ITransactionData[] = [];
      transactions.push({
        ticker,
        portfolio,
        sharePrice,
        shares,
        when: when.toString(),
        currency: tickerCurrency.data,
      });
      try {
        submitTransactionMutation({ transactions, editedTransaction });
      } catch (error) {
        //showError(error.toString());
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

  return (
    <div className="flex flex-col items-center bg-drawerBackground h-[100%] gap-1 p-5">
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
          checked={isStockDivided}
          id="disabled-checked-checkbox"
          type="checkbox"
          onChange={() => setIsStockDivided((prev) => !prev)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="disabled-checked-checkbox"
          className="ml-2 text-sm font-medium "
        >
          Is stock dividend?
        </label>
      </span>
      <div className="flex flex-row gap-2">
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
        <button onClick={submitNewTransaction}>Save</button>
      </div>
    </div>
  );
};

export default AddTransactionDialog;
