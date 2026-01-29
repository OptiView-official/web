import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const sliceAddress = (address: string) => {
  if (!address) return "";
  if (address.length <= 6) return address;
  return `${address.slice(0, 4)}${"*".repeat(10)}${address.slice(-2)}`;
};

export const formatNumber = (
  number?: number | string,
  {
    hasCurrency = false,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  }: {
    hasCurrency?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
) => {
  const data = Number(number);
  if (!data && data !== 0) return "-";

  // Ensure maximumFractionDigits is not less than minimumFractionDigits
  const maxDigits = Math.max(maximumFractionDigits, minimumFractionDigits);

  return data.toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits: maxDigits,
    style: hasCurrency ? "currency" : undefined,
    currency: hasCurrency ? "USD" : undefined,
  });
};