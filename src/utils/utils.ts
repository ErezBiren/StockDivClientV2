import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
// import { date, EventBus, Notify } from 'quasar';
// import { stockdivStore } from 'stores/stockdivStore';

// export const bus = new EventBus();
// const store = stockdivStore();

export const showNotification = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

export const getRangeColor = (value: number): string => {
  if (value > 1) value = 1;
  const hue = ((1 - value) * 120).toString(10);
  return ["hsl(", hue, ",100%,50%)"].join("");
};

export const validateEmail = (email: string | undefined) => {
  if (email === undefined) return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isNumber = (str: string): boolean => {
  if (str.trim() === "") {
    return false;
  }

  return !Number.isNaN(Number(str));
};

export const showAPIError = (apiError: unknown) => {
  let err = "Unknown error";

  try {
    err = apiError.data.error;
  } catch (error) {
    err = "Unknown error";
  }

  showNotification(err);
};

export const getTodayDate = (full: boolean): string => {
  let str = new Date().toISOString();
  if (!full) str = str.substring(0, 10);
  return str;
};

// export const filters = {
//   formatToCurrency(value: number, currency?: string): string {
//     const formatter = new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: currency
//         ? currency
//         : store.portfolioCurrency
//         ? store.portfolioCurrency
//         : 'USD',
//       maximumFractionDigits: store.settings.decimalDigits,
//     });
//     return formatter.format(value);
//   },
//   formatToPercentage(value: number): string {
//     return `${value.toFixed(2)}%`;
//   },
//   formatToDate(value: string): string {
//     return date.formatDate(value, store.settings.dateFormat);
//   },
//   formatToNumber(value: number): string {
//     return `${value.toFixed(2)}`;
//   },
// };

export const getCurrencySymbol = (currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  })
    .format(1)
    .substring(0, 1);
};
