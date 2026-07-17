import { format, parse } from "date-fns";

export const toDateOnlyString = (date: Date) => format(date, "yyyy-MM-dd");
export const toTimestamp = (value: Date | string) => new Date(value).getTime();
export const formatDateOnly = (dateOnly: string) =>
  format(parse(dateOnly, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
