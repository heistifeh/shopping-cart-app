import type { Product } from "../../types";

// Save item or list of items to localStorage
export function setItemInStorage(key: string, value: Product | Product[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Get raw string value from localStorage
export const getItemFromStorage = (key: string): string | null =>
  localStorage.getItem(key);

// Get parsed object or array from localStorage (with fallback to null)
export const getParsedItemFromStorage = (
  key: string
): Product | Product[] | null => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Failed to parse item for key "${key}":`, e);
    return null;
  }
};

// Remove key from localStorage
export const removeItemFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};
