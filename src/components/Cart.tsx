import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { IoClose } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { formatCurrency } from "./utils/FormatCurrency";
import ProductsGrid from "./ProductsGrid";
import ProductThumb from "./ProductThumb";
const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { isOpen, setIsOpen } = useCart();
  const { allProducts } = useCart();
  useEffect(() => {
    const inCartItems = allProducts.filter((product) => product.inCart);
    setCartItems(inCartItems?.reverse());

    const price = inCartItems.reduce((acc, item) => {
      return (acc += item.price * item.quantity);
    }, 0);
    setTotalPrice(price);

    // setLocalStorage();
  }, [allProducts]);

  console.log("hey");

  console.log("cartItems", cartItems);

  return (
    <>
      {cartItems.length !== 0 && (
        <div
          className={`w-[300px]  sm:w-[500px] h-screen bg-white fixed   z-20 border-l-4 border-red-200 rounded-tl-lg ${
            isOpen ? "right-0 bottom-0 " : "-right-[300px] sm:-right-[500px] bottom-[-85%]"
          }`}
        >
          <div className="w-full h-16 bg-white absolute left-0 top-0 z-1000 grid place-items-center border rounded-lg">
            <h1 className="text-xl text-gray-600">Shopping Cart</h1>
            <button
              className="w-9 h-9 bg-yellow-400 absolute right-3 z-15 grid place-items-center border-2 rounded-full hover:bg-yellow-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <IoClose className="text-white" />
            </button>
          </div>
          <button
            className="h-9 w-9 bg-yellow-400 absolute -left-14 top-3 z-15 grid place-items-center border-2 rounded-full "
            onClick={() => setIsOpen(true)}
          >
            <FaShoppingCart className="text-xs text-white" />
            <span className="w-6 h-6 bg-red-500 absolute -bottom-4 -left-2 grid place-items-center border border-gray-300 rounded-full text-sm text-white ">
              {cartItems.length > 9 ? "9+" : cartItems.length}
            </span>
          </button>
          <div className="h-screen flex flex-col gap-y-3 overflow-y-scroll px-5 pb-24 pt-20">
            {cartItems?.map((product) => {
              return <ProductThumb product={product} scale={40} />;
            })}
          </div>
          <div className="w-full h-20 bg-white absolute bottom-0 left-0 z-10 grid place-items-center border rounded-lg">
            <h1 className="text-xl text-gray-600">
              Total: {formatCurrency(totalPrice)}
            </h1>
            <button className="rounded-md bg-blue-300 px-2 text-white hover:bg-blue-400 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
