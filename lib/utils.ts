import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(cents: number) {
  return currencyFormatter.format(cents / 100);
}
