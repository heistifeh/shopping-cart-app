import { createContext, useContext, useEffect, useState } from "react";

import type { Product } from "../types";
//this allows us to manage/share data across all components without sharing props

import type { PropsWithChildren } from "react";
import {
  getItemFromStorage,
  getParsedItemFromStorage,
  setItemInStorage,
} from "../components/utils/LocalStorage";

type CartContextType = {
  allProducts: Product[];
  setProducts: (_products: Product[]) => void;
  addToCart: (_product: Product) => void;
  removeFromCart: (_product: Product) => void;
  updateQuantity: (_product: Product, _amount: number) => void;
  isOpen: boolean;
  cartItems: Product[];
  setIsOpen: (_open: boolean) => void;
  setCartItems: (_items: Product[]) => void;
  setLocalStorage: () => void;
  setCartItemsFromStorage: () => void;
};

const CartContext = createContext<CartContextType>({
  allProducts: [] as Product[],
  setProducts: () => {},
  addToCart: (_product: Product) => {},
  removeFromCart: (_product: Product) => {},
  updateQuantity: (_product: Product, _amount: number) => {},
  isOpen: false,
  cartItems: [] as Product[],
  setIsOpen: (_open: boolean) => {},
  setCartItems: (_items: Product[]) => {},
  setLocalStorage: () => {},
  setCartItemsFromStorage: () => {},
});
export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  // stores and updates all items
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        const data = await response.json(); // This is the clean list of products

        const cartItems = getParsedItemFromStorage("cartItems");

        if (cartItems?.length) {
          const merged = data.map((product: Product) => {
            const matched = cartItems.find(
              (item: Product) => item.id === product.id
            );
            return matched ? { ...product, ...matched } : product;
          });

          setAllProducts(merged);
          setCartItems(cartItems); // optional: if you're using cartItems state
        } else {
          setAllProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const setProducts = () => {
    setAllProducts(allProducts);
  };

  const addToCart = (product: Product) => {
    setAllProducts((prevProducts) => {
      const updated = prevProducts.map((prevProduct) =>
        prevProduct.id === product.id
          ? { ...prevProduct, inCart: true }
          : prevProduct
      );

      // Save to localStorage
      setItemInStorage(
        "cartItems",
        updated.filter((item) => item.inCart)
      );
      return updated;
    });
  };

  // remove from cart
  const removeFromCart = (product: Product) => {
    setAllProducts((prevProducts) => {
      const updated = prevProducts.map((prevProduct) =>
        prevProduct.id === product.id
          ? { ...prevProduct, inCart: false, quantity: 1 }
          : prevProduct
      );

      setItemInStorage(
        "cartItems",
        updated.filter((item) => item.inCart) // only items still in cart
      );

      return updated;
    });
  };

  const updateQuantity = (product: Product, amount: number) => {
    setAllProducts((prevProducts) => {
      const updated = prevProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + amount }
          : item
      );

      setItemInStorage(
        "cartItems",
        updated.filter((item) => item.inCart)
      );

      return updated;
    });
  };

  const setLocalStorage = () => {
    if (allProducts.length !== 0) {
      const inCartItems = allProducts.filter((item) => item.inCart);
      setItemInStorage("cartItems", inCartItems);
    }
  };

  const setCartItemsFromStorage = () => {
    if (getItemFromStorage("cartItems") !== null) {
      const storageItems = getParsedItemFromStorage("cartItems");

      setAllProducts((prevItems) => {
        return prevItems.map((item) => {
          const matchedItem = storageItems.find(
            (storageItem: Product) => storageItem.id === item.id
          );
          return matchedItem ? matchedItem : item;
        });
      });
      // Set cart items state
      setCartItems(storageItems);
    }
  };

  // State for cart open/close
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  return (
    <CartContext.Provider
      value={{
        allProducts,
        setProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        isOpen,
        setIsOpen,
        cartItems,
        setCartItems,
        setLocalStorage,
        setCartItemsFromStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
