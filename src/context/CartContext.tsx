import { createContext, useContext, useEffect, useState } from "react";

import type { Product } from "../types";
//this allows us to manage/share data across all components without sharing props
const CartContext = createContext({
  allProducts: [] as Product[],
  setProducts: () => {},
  addToCart: (product: Product) => {},
  removeFromCart: (product: Product) => {},
  updateQuantity: (product: Product, amount: number) => {},
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {},
  cartItems: [] as Product[],
  setCartItems: (items: Product[]) => {},
});

import type { PropsWithChildren } from "react";
import { getParsedItemFromStorage, setItemInStorage } from "../components/utils/LocalStorage";

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

  useEffect(() => {
  const storedItems = getParsedItemFromStorage("cartItems");
  if (Array.isArray(storedItems)) {
    setAllProducts((prev) =>
      prev.map((item) => {
        const match = storedItems.find((s: Product) => s.id === item.id);
        return match ? { ...item, ...match } : item;
      })
    );
  }
}, []);

useEffect(() => {
  const inCart = allProducts.filter((p) => p.inCart);
  setCartItems(inCart);
  setItemInStorage("cartItems", inCart);
}, [allProducts]);
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
          ? { ...prevProduct, inCart: true }
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
  
  // State for cart open/close
  const [isOpen, setIsOpen] = useState(false);

  // State for cart items
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
