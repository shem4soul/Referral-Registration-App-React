import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { countries } from "./mockData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(+value);
};


 const numberWithCommas = (number) => {
  if (number || number >= 0) {
    const sanitizedNumber = number.toString().replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(sanitizedNumber);

    if (!isNaN(numericValue)) {
      return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  return '';
};

export const formattedCurrency = (value) => {
  return numberWithCommas(value);
};


export const parseValue = (value) => {
  if (!value) return '';

  // collect all unique currency symbols
  const currencySigns = countries.map(c => c.currencySign);
  
  // escape special regex characters (like ₨, $, €, etc.)
  const escapedSigns = currencySigns.map(sign => sign.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));

  // build regex to match any currency sign or comma or whitespace
  const regex = new RegExp(`[${escapedSigns.join('')}\\s,]`, 'g');

  // remove them and trim
  console.log("Parsing value:", value, "Using regex:", regex);
  return value.replace("₦", '').trim();
};


// Format number with commas (e.g., 1234567 → 1,234,567)
export const formatWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
