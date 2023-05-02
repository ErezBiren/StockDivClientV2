import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { format } from "date-fns";

const useFormatHelper = () => {
  const store: RootState = useSelector((state: RootState) => state);

  function formatToCurrency(val: number, currency?: string): string {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency
        ? currency
        : store.stockdiv.portfolioCurrency
        ? store.stockdiv.portfolioCurrency
        : "USD",
      maximumFractionDigits: store.stockdiv.settings.decimalDigits,
    });
    return formatter.format(val);
  }
  function formatToPercentage(value: number): string {
    return `${value.toFixed(2)}%`;
  }
  function formatToDate(value: string): string {
    return format(new Date(value), store.stockdiv.settings.dateFormat);
  }
  function formatToNumber(value: number): string {
    return `${value.toFixed(2)}`;
  }

  return { formatToCurrency, formatToPercentage, formatToNumber, formatToDate };
};

export default useFormatHelper;
