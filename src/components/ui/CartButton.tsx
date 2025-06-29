import { useCart } from "../../context/CartContext";
import type { Product } from "../../types";

const CartButton = ({ product }: { product: Product }) => {
  const { addToCart, removeFromCart, updateQuantity } = useCart();

  return (
    <div
      className={`w-max absolute right-5 top-5 scale-90 cursor-pointer z-10`}
    >
      <div className="space-x-3">
        {!product.inCart ? (
          <button
            className="bg-zinc-400 border rounded-md px-2 py-1 text-sm text-white hover:bg-zinc-500 transition-colors"
            onClick={() => {
              addToCart(product);
              console.log("Product added to cart:", product);
            }}
          >
            + Add to Cart
          </button>
        ) : (
          <div>
            <div className="flex">
              <button
                className="border rounded-lg px-3"
                onClick={() => {
                  if (product.quantity === 1) {
                    removeFromCart(product);
                  } else {
                    updateQuantity(product, -1);
                  }
                }}
              >
                -
              </button>
              <p className="flex items-center gap-x-1 mx-1">
                <span className="min-w-7 bg-green-100 grid place-items-center border rounded-full">
                  {product.quantity}
                </span>
                <span className="text-xs">in cart</span>
              </p>
              <button
                className="border rounded-lg px-3"
                onClick={() => updateQuantity(product, 1)}
              >
                +
              </button>
            </div>
            <button
              className="bg-pink-300 mx-auto mt-2 block rounded-md px-2 py-1 text-xs text-white hover:bg-pink-400"
              onClick={() => removeFromCart(product)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartButton;
