import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./Ecommerce/HomePage/HomePage";
import CategoryPage from "./Ecommerce/HomePage/components/Home/CategoryPage";
import Layout from "./Ecommerce/HomePage/components/Layout/Layout";

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
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

