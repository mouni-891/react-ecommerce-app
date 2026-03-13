import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SearchPage.css"
import axios from "axios";

function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products?keyword=${query}`,
        );
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);
console.log(products);
  return (
    <div className="category-page">
      <h1>Search Results for "{query}"</h1>

      <div className="category-products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="category-product-card">
              <img
                src={`http://localhost:5000${product.thumbnail}`}
                alt={product.name}
              />
    
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
