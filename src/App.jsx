import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Ecommerce/HomePage/HomePage";
import CategoryPage from "./Ecommerce/components/Home/CategoryPage";
import Layout from "./Ecommerce/components/Layout/Layout";
import CartPage from "./Ecommerce/pages/Cart/CartPage";
import WishlistPage from "./Ecommerce/pages/Wishlist/WishlistPage";
import Login from "./Ecommerce/pages/Login/Login";
import { CartProvider } from "@context/CartContext";
import { WishlistProvider } from "@context/WishlistContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Ecommerce/auth/ProtectedRoute";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 4000,
              style: {
                fontSize: "20px",
                padding: "14px 20px",
                backgroundColor: "#39397a",
                color: "white",
              },
            }}
          />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:category" element={<CategoryPage />} />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <WishlistPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
