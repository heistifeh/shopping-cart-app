import { useCart } from "../../context/CartContext";
import type { Product } from "../../types";

const CartButton = ({ product }: { product: Product }) => {
  const { allProducts, addToCart, removeFromCart, updateQuantity } = useCart();
  const currentProduct = allProducts.find((p) => p.id === product.id);

  if (!currentProduct) return null;
  return (
    <div
      className={`w-max absolute right-5 top-5 scale-90 cursor-pointer z-10`}
    >
      <div className="space-x-3">
        {!currentProduct.inCart ? (
          <button
            className="bg-zinc-400 border rounded-md px-2 py-1 text-sm text-white hover:bg-zinc-500 transition-colors"
            onClick={() => {
              addToCart(currentProduct);
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
                  if (currentProduct.quantity === 1) {
                    removeFromCart(currentProduct);
                  } else {
                    updateQuantity(currentProduct, -1);
                  }
                }}
              >
                -
              </button>
              <p className="flex items-center gap-x-1 mx-1">
                <span className="min-w-7 bg-green-100 grid place-items-center border rounded-full">
                  {currentProduct.quantity}
                </span>
                <span className="text-xs">in cart</span>
              </p>
              <button
                className="border rounded-lg px-3"
                onClick={() => updateQuantity(currentProduct, 1)}
              >
                +
              </button>
            </div>
            <button
              className="bg-pink-300 mx-auto mt-2 block rounded-md px-2 py-1 text-xs text-white hover:bg-red-500"
              onClick={() => removeFromCart(currentProduct)}
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
