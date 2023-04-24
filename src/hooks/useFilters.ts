import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const useFilters = () => {
  const store: RootState = useSelector((state: RootState) => state);

  const filters = {
    formatToCurrency(value: number, currency?: string): string {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency
          ? currency
          : store.stockdiv.portfolioCurrency
          ? store.stockdiv.portfolioCurrency
          : "USD",
        maximumFractionDigits: store.stockdiv.settings.decimalDigits,
      });
      return formatter.format(value);
    },
    formatToPercentage(value: number): string {
      return `${value.toFixed(2)}%`;
    },
    formatToDate(value: string): string {
      return date.formatDate(value, store.stockdiv.settings.dateFormat);
    },
    formatToNumber(value: number): string {
      return `${value.toFixed(2)}`;
    },
  };

  return { filters };
};

export default useFilters;
