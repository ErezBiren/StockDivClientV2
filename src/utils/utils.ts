import { toast } from "react-toastify";

// import { date, EventBus, Notify } from 'quasar';
// import { stockdivStore } from 'stores/stockdivStore';

// export const bus = new EventBus();
// const store = stockdivStore();

const greenText = " text-trendingUpColor";
const redText = " text-trendingDownColor";

export const getTradingColor = (positiveCondition: boolean) => {
  return positiveCondition ? greenText : redText;
};

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showNotification = (message: string) => {
  toast.info(message);
};
export const showError = (message: string) => {
  toast.error(message);
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

export const startOfDate = (
  date: Date,
  unit: "year" | "month" | "week" | "day"
): Date => {
  const startOfDate = new Date(date);

  if (unit === "year") {
    startOfDate.setMonth(0);
    startOfDate.setDate(1);
    startOfDate.setHours(0, 0, 0, 0);
  } else if (unit === "month") {
    startOfDate.setDate(1);
    startOfDate.setHours(0, 0, 0, 0);
  } else if (unit === "week") {
    const dayOfWeek = startOfDate.getDay();
    const diff = startOfDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfDate.setDate(diff);
    startOfDate.setHours(0, 0, 0, 0);
  } else if (unit === "day") {
    startOfDate.setHours(0, 0, 0, 0);
  }

  return startOfDate;
};
