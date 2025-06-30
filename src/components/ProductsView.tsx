import { useEffect, useState,useMemo } from "react";
import ProductsGrid from "./ProductsGrid";
import { useCart } from "../context/CartContext";
import {
  getItemFromStorage,
  getParsedItemFromStorage,
} from "./utils/LocalStorage";

const ProductsView = () => {

  const { allProducts, setCartItemsFromStorage ,universalInput,universalCategory,setUniversalCategory} = useCart();
  const [filteredProduct, setFilteredProduct] = useState(allProducts);

  useEffect(() => {
    // setProducts();

    if (
      getParsedItemFromStorage("cartItems")?.length !== 0 &&
      getItemFromStorage("cartItems") !== null
    ) {
      setCartItemsFromStorage();
    }
  }, []);

  useEffect(() => {}, allProducts);

  // const filteredProducts =
  //   category === "all"
  //     ? allProducts
  //     : allProducts.filter((product) => product.category === category);

const filteredProducts = useMemo(() => {
  return universalCategory === "all"
    ? allProducts
    : allProducts.filter((product) => product.category === universalCategory);
}, [universalCategory, allProducts]);

      useEffect(() => {

  setFilteredProduct(
    universalInput.trim() === ""
      ? filteredProducts
      : filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(universalInput.toLowerCase())
        )
  );
  
}, [universalInput, allProducts,filteredProducts]);

  return (
    <div className="products-view container mx-auto">
      <div className="bg-pink-900 text-white px-4 py-3 mb-6 rounded-lg max-w-sm w-full flex justify-between items-center shadow-md">
        <label htmlFor="category" className="text-base font-bold mr-2">
          Filter by Category
        </label>
        <select
          id="category"
          className="bg-white text-black px-3 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none cursor-pointer"
          value={universalCategory}
          onChange={(e) => setUniversalCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="hoodie">Hoodies</option>
          <option value="jacket">Jackets</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>

      <div>
        {/* //product grid */}
        <ProductsGrid products={filteredProduct} />
      </div>
    </div>
  );
};

export default ProductsView;
