import type { Product } from "../../types";

export const setItemInStorage = (name: string, data: Product) =>
  localStorage?.setItem(name, JSON.stringify(data));

export const getItemFromStorage = (name: string) => localStorage?.getItem(name);

export const getParsedItemFromStorage = (name: string) =>
  JSON.parse(localStorage?.getItem(name) || "{}") as Product | null ;

export const removeItemFromStorage = (name: string) =>
  localStorage?.removeItem(name);
