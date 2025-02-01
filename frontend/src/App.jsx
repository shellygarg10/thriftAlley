import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

// Layout and Pages
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import OrderHistory from "./pages/OrderHistory";
import LoginSignUp from "./pages/LoginSignUp";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShopProvider>
          <ToastContainer
            position="top-right"
            style={{
              top: "5rem",
            }}
          />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/place-order" element={<PlaceOrder />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/login-signup" element={<LoginSignUp />} />
              <Route path="*" element={<Home />} /> {/* Fallback route */}
            </Route>
          </Routes>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
