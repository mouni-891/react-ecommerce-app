import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "@/HomePage/HomePage";
import CategoryPage from "@/pages/Home/CategoryPage";
import Layout from "@/components/Layout/Layout";
import CartPage from "@/Cart/CartPage";
import WishlistPage from "@/pages/Wishlist/WishlistPage";
import Login from "@/pages/Login/Login";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/auth/ProtectedRoute";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import BeautyPage from "@/pages/Category/BeautyPage";
import BeautySubCategoryProducts from "@/pages/Category/BeautySubCategoryProducts";

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
              <Route path="/category/" element={<CategoryPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/category/beauty" element={<BeautyPage />} />
              <Route
                path="/category/beauty/:subCategory"
                element={<BeautySubCategoryProducts />}
              />

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
              <Route path="/product/:slugOrId" element={<ProductDetail />} />
            </Route>
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
