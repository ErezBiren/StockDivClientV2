import { toast } from "react-toastify";

// import { date, EventBus, Notify } from 'quasar';
// import { stockdivStore } from 'stores/stockdivStore';

// export const bus = new EventBus();
// const store = stockdivStore();

const greenText = " text-[#4caf50]";
const redText = " text-[#f44336]";

export const getTradingColor = (positiveCondition: boolean) => {
  return positiveCondition ? greenText : redText;
};

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

export const getCurrencySymbol = (currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  })
    .format(1)
    .substring(0, 1);
};

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
