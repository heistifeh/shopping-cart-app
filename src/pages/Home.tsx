import Navbar from "../components/Navbar";
import ProductsView from "../components/ProductsView";
import Cart from "../components/Cart";
import { ToastContainer } from "react-toastify";
const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-titillium">
      <div className="px-4 container mx-auto">
        <Navbar />
        <ToastContainer />
        <Cart />
        <ProductsView />
      </div>
    </div>
  );
};

export default Home;
