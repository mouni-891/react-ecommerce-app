import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "@/HomePage/HomePage";
import Layout from "@/components/Layout/Layout";
import CartPage from "@/Cart/CartPage";
import WishlistPage from "@/pages/Wishlist/WishlistPage";
import Login from "@/pages/Login/Login";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/auth/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/auth/ProtectedRoute";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import BeautyPage from "@/pages/Category/BeautyPage";
import BeautySubCategoryProducts from "@/pages/Category/BeautySubCategoryProducts";
import MyAccount from "@/pages/Account/MyAccount";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Privacy from "@/pages/Privacy/Privacy";
import Terms from "@/pages/Terms/Terms";
import CategoryPage from "@/pages/Home/CategoryPage";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
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
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              <Route path="/category/:category?" element={<CategoryPage />} />
              <Route path="/category/beauty" element={<BeautyPage />} />
              <Route
                path="/category/beauty/:subCategory"
                element={<BeautySubCategoryProducts />}
              />
              <Route path="/product/:slugOrId" element={<ProductDetail />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/account" element={<MyAccount />} />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
