import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./Ecommerce/HomePage/HomePage";
import CategoryPage from "./Ecommerce/components/Home/CategoryPage";
import Layout from "./Ecommerce/components/Layout/Layout";
import CartPage from "./Ecommerce/pages/Cart/CartPage";
import { CartProvider } from "@context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Layout Route */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

