import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useState } from "react";

const Navbar = () => {
  const { setIsOpen, cartItems } = useCart();
  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 space-y-4 sm:space-y-0  container mx-auto">
      <Link
        to={"/"}
        className="text-2xl font-bold text-gray-800 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
      >
        Cartify
      </Link>
      <div className="flex items-center w-full gap-4 sm:gap-0  ">
        <form
          onSubmit={handleSearch}
          className="flex items-center sm:w-20 flex-1 sm:mx-4 "
        >
          <input
            type="search"
            placeholder="search for products.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-4 py-2 bg-gray-200 rounded focus:outline-gray-300 w-full max-w-6xl placeholder:text-xs sm:placeholder:text-sm"
          />
        </form>
        <div className="gap-2 sm:gap-4 flex items-center justify-center sm:justify-start  sm:w-auto">
          <div
            onClick={() => {
              if (cartItems.length > 0) {
                setIsOpen(true);
              } else {
                toast.info("😥 Your cart is empty.");
              }
            }}
            className=" relative text-white px-4 py-2 rounded  bg-gray-500 hover:bg-gray-600 lg:w-auto w-full flex items-center justify-center cursor-pointer"
          >
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="w-6 h-6 bg-red-500 absolute -bottom-4 -left-2 grid place-items-center border border-gray-300 rounded-full text-sm text-white ">
                {cartItems.length > 9 ? "9+" : cartItems.length}
              </span>
            )}
          </div>
          <div className=" text-white px-4 py-2 rounded  bg-gray-500 hover:bg-gray-600 lg:w-auto w-full items-center justify-center  sm:flex cursor-pointer">
            <FaUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
