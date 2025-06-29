import Navbar from "../components/Navbar";
import ProductsView from "../components/ProductsView";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="px-4 container mx-auto">
        <Navbar />
        <Cart />
        <ProductsView />
      </div>
    </div>
  );
};

export default Home;
