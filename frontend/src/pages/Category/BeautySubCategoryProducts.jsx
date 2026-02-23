import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BeautySubCategoryProducts.css";

function BeautySubCategoryProducts() {
  const { subCategory } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Convert URL slug back to subCategory name
  // e.g. "hair-care" → "Hair Care", "men-grooming" → "Men Grooming"
  const slugToSubCategory = (slug) =>
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const displayName = slugToSubCategory(subCategory);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}/api/products?category=beauty&subCategory=${encodeURIComponent(displayName)}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subCategory, API_URL]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="subcategory-page">
      <h2>{displayName.toUpperCase()}</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="subcategory-grid">
          {products.map((item) => (
            <div
              key={item._id}
              className="subcategory-card"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <img
                src={`${API_URL}${item.img}`}
                alt={item.name}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BeautySubCategoryProducts;