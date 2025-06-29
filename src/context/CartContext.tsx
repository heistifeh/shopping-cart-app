import { createContext, useContext, useEffect, useState } from "react";
// import {
//   getItemFromStorage,
//   getParsedItemFromStorage,
//   setItemInStorage,
// } from "../utilities/LocalStorage";
// import {
//   getItemFromStorage,
//   getParsedItemFromStorage,
//   setItemInStorage,
// } from "../utilities/LocalStorage";
import type { Product } from "../types";
//this allows us to manage/share data across all components without sharing props
const CartContext = createContext({
  allProducts: [] as Product[],
  setProducts: () => {},
  addToCart: (product: Product) => {},
  removeFromCart: (product: Product) => {},
  updateQuantity: (product: Product, amount: number) => {},
  //   setLocalStorage: () => {},
  //   setCartItemsFromStorage: () => void;
});

import type { PropsWithChildren } from "react";

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  // stores and updates all items
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAllProducts(data);
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
      return prevProducts.map((prevProduct) => {
        if (prevProduct.inCart) {
          return prevProduct;
        }

        return prevProduct.id === product.id
          ? { ...prevProduct, 'inCart': true }
          : prevProduct;
      });
    });
  };
  const removeFromCart = (product: Product) => {
    setAllProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        return prevProduct.id === product.id
          ? { ...prevProduct, inCart: false, quantity: 1 }
          : prevProduct;
      });
    });
  };
  const updateQuantity = (product: Product, amount: number) => {
    setAllProducts((prevProducts) => {
      return prevProducts.map((item) => {
        return item.id === product.id
          ? { ...item, quantity: item.quantity + amount }
          : item;
      });
    });
  };
  //   const setLocalStorage = () => {
  //     if (allItems.length !== 0) {
  //       const inCartItems = allItems.filter((item) => item.inCart);
  //       setItemInStorage("cartItems", inCartItems);
  //     }
  //   };

  //   const setCartItemsFromStorage = () => {
  //     if (getItemFromStorage("cartItems") !== null) {
  //       const storageItems = getParsedItemFromStorage("cartItems");

  //       setAllItems((prevItems) => {
  //         return prevItems.map((item) => {
  //           const matchedItem = storageItems.find(
  //             (storageItem) => storageItem.id === item.id
  //           );
  //           return matchedItem ? matchedItem : item;
  //         });
  //       });
  //     }
  //   };
  // children allows to input whatever component
  return (
    <CartContext.Provider
      value={{
        allProducts,
        setProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
