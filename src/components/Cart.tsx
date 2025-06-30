import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import { formatCurrency } from "./utils/FormatCurrency";
import ProductThumb from "./ProductThumb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const COUPON_KEY = "couponUsed";
const VALID_COUPON = "POWERLABSx";
const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { isOpen, setIsOpen } = useCart();
  const { allProducts, setLocalStorage, setProducts } = useCart();
  // hide when navbar shows
  const [hideCartIcon, setHideCartIcon] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
  const [couponUsed, setCouponUsed] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      if (scrollY < 50 || documentHeight <= windowHeight + 10) {
        setHideCartIcon(true);
      } else {
        setHideCartIcon(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const inCartItems = allProducts.filter((product) => product.inCart);
    setCartItems(inCartItems?.reverse());

    const price = inCartItems.reduce((acc, item) => {
      return (acc += item.price * item.quantity);
    }, 0);
    setTotalPrice(price);

    setLocalStorage();
  }, [allProducts]);

  useEffect(() => {
    const used = localStorage.getItem(COUPON_KEY);
    setCouponUsed(used === VALID_COUPON.toUpperCase());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const entered = coupon.trim().toUpperCase();

    if (couponUsed && entered === VALID_COUPON.toUpperCase()) {
      toast.error("Coupon has already been used.");
      return;
    }

    if (entered === VALID_COUPON.toUpperCase()) {
      setTotalPrice((prev) => prev * 0.868); // Apply 13.2% discount
      localStorage.setItem(COUPON_KEY, entered);
      setCouponUsed(true);
      toast.success("🎉 Coupon applied! 13.2% discount.");
    } else {
      toast.error("😥 Invalid coupon code.");
    }
  };
  const handlePurchase = () => {
    setShowConfirmation(true);
    // clear cart after purchase
    // Clear `inCart` and reset quantity in allProducts
    const cleared = allProducts.map((item) => ({
      ...item,
      inCart: false,
      quantity: 1,
    }));

    setCartItems([]);
    setProducts(cleared);
    localStorage.removeItem("cartItems");
  };
  // Effect to handle body overflow when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <>
      {cartItems.length !== 0 && (
        <div
          className={`w-[300px]  sm:w-[500px] h-screen bg-white fixed   z-20 border-l-1 border-gray-400 rounded-tl-lg transition-all duration-500 ease-in-out  ${
            isOpen
              ? "right-0 bottom-0 "
              : "-right-[300px] sm:-right-[500px] bottom-[-85%]"
          }`}
        >
          <div className="w-full h-16 bg-white absolute left-0 top-0 z-1000 grid place-items-center shadow rounded-lg">
            <h1 className="text-xl text-gray-600">My Basket</h1>
            <button
              className="w-9 h-9 bg-gray-400 border-gray-500 absolute right-3 z-15 grid place-items-center border-1 rounded-full hover:bg-red-500 transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <IoClose className="text-white" />
            </button>
          </div>
          {!hideCartIcon && (
            <button
              className="h-9 w-9 bg-gray-400 absolute -left-14 top-3 z-15 grid place-items-center border-1 rounded-full cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <FaShoppingCart className="text-xs text-white" />
              <span className="w-6 h-6 bg-red-500 absolute -bottom-4 -left-2 grid place-items-center border border-gray-300 rounded-full text-sm text-white ">
                {cartItems.length > 9 ? "9+" : cartItems.length}
              </span>
            </button>
          )}
          <div className="h-screen flex flex-col gap-y-2 overflow-y-scroll px-5 pb-18 pt-20">
            {cartItems?.map((product) => {
              return <ProductThumb product={product} scale={20} />;
            })}
          </div>
          <div className="w-full h-30 bg-gray-100 absolute bottom-0 left-0 z-10 grid place-items-center shadow-md rounded-lg">
            {/* coupon */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-x-2 justify-center"
            >
              <input
                onChange={handleChange}
                type="text"
                id="coupon"
                placeholder="Enter coupon code"
                className="px-4 py-2 bg-gray-200 rounded focus:outline-gray-300 w-full max-w-6xl placeholder:text-xs sm:placeholder:text-sm"
              />
              <button
                disabled={coupon == ""}
                className="rounded-md bg-green-300 px-2 py-1 text-white hover:bg-green-400 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            <h1 className="text-xl text-gray-600">
              Total: {formatCurrency(totalPrice)}
            </h1>
            <button
              onClick={handlePurchase}
              className="rounded-md bg-blue-300 px-2 text-white hover:bg-blue-400 transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center space-y-4 animate-fade-in">
            <FaCheckCircle className="mx-auto text-green-500 text-5xl" />
            <h2 className="text-lg font-semibold text-gray-800">
              Order is being processed...
            </h2>
            <p className="text-gray-600">
              Please wait while we confirm your purchase.
            </p>
            <button
              onClick={() => {
                setCartItems([]);
                setProducts(
                  allProducts.map((item) => ({
                    ...item,
                    inCart: false,
                    quantity: 1,
                  }))
                );
                toast.success("🎉 Purchase successful!");
                localStorage.removeItem("cartItems");
                setShowConfirmation(false);
                setIsOpen(false);
              }}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
