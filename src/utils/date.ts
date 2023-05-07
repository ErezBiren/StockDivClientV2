import { capitalize } from "./format";

interface DateOptions {
  milliseconds?: number;
  millisecond?: number;
  seconds?: number;
  second?: number;
  minutes?: number;
  minute?: number;
  hours?: number;
  hour?: number;
  days?: number;
  day?: number;
  date?: number;
  months?: number;
  month?: number;
  year?: number;
  years?: number;
}

function getChange(date: Date, rawMod: DateOptions, sign: number) {
  const mod = normalizeMod(rawMod),
    d = new Date(date),
    t =
      mod.year !== void 0 || mod.month !== void 0 || mod.date !== void 0
        ? applyYearMonthDayChange(d, mod, sign) // removes year/month/day
        : d;

  for (const key in mod) {
    const op = capitalize(key);
    t[`set${op}`](t[`get${op}`]() + sign * mod[key]);
  }

  return t;
}

export const subtractFromDate = (date: Date, mod: DateOptions) => {
  return getChange(date, mod, -1);
};

function normalizeMod(mod: DateOptions) {
  const acc = { ...mod };

  if (mod.years !== void 0) {
    acc.year = mod.years;
    delete acc.years;
  }

  if (mod.months !== void 0) {
    acc.month = mod.months;
    delete acc.months;
  }

  if (mod.days !== void 0) {
    acc.date = mod.days;
    delete acc.days;
  }
  if (mod.day !== void 0) {
    acc.date = mod.day;
    delete acc.day;
  }

  if (mod.hour !== void 0) {
    acc.hours = mod.hour;
    delete acc.hour;
  }

  if (mod.minute !== void 0) {
    acc.minutes = mod.minute;
    delete acc.minute;
  }

  if (mod.second !== void 0) {
    acc.seconds = mod.second;
    delete acc.second;
  }

  if (mod.millisecond !== void 0) {
    acc.milliseconds = mod.millisecond;
    delete acc.millisecond;
  }

  return acc;
}

function applyYearMonthDayChange(date: Date, mod: DateOptions, sign: number) {
  let year = date.getFullYear(),
    month = date.getMonth();

  const day = date.getDate();

  if (mod.year !== void 0) {
    year += sign * mod.year;
    delete mod.year;
  }

  if (mod.month !== void 0) {
    month += sign * mod.month;
    delete mod.month;
  }

  date.setDate(1);
  date.setMonth(2);

  date.setFullYear(year);
  date.setMonth(month);
  date.setDate(Math.min(day, daysInMonth(date)));

  if (mod.date !== void 0) {
    date.setDate(date.getDate() + sign * mod.date);
    delete mod.date;
  }

  return date;
}

export function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function startOfDate(date: Date, unit: string, utc?: boolean) {
  const t = new Date(date),
    prefix = `set${utc === true ? "UTC" : ""}`;

  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](0);
    case "month":
    case "months":
      t[`${prefix}Date`](1);
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](0);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](0);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](0);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](0);
  }
  return t;
}
