import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.jpg";
    return `${API_URL}${path}`;
  };

  // Fetch product by _id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setActiveImage(data.img);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, API_URL]);

  // Fetch related products once category is known
  useEffect(() => {
    if (!product?.category) return;

    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/products?category=${product.category}`
        );
        const data = await res.json();
        // Exclude current product, show up to 4
        setRelatedProducts(
          data.filter((item) => item._id !== product._id).slice(0, 4)
        );
      } catch (err) {
        console.error("Related fetch error:", err);
      }
    };

    fetchRelated();
  }, [product, API_URL]);

  if (loading) return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  if (error) return <h2 style={{ padding: "40px" }}>Error: {error}</h2>;
  if (!product) return <h2 style={{ padding: "40px" }}>Product not found</h2>;

  // Combine main image + additional images, remove duplicates
  const allImages = [...new Set([product.img, ...(product.images || [])])];

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>

        {/* Left: Images */}
        <div>
          <img
            src={getImageUrl(activeImage)}
            alt={product.name}
            style={{
              width: "400px",
              borderRadius: "10px",
              objectFit: "cover",
              border: "1px solid #eee",
            }}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            {allImages.map((img, index) => (
              <img
                key={index}
                src={getImageUrl(img)}
                alt={`thumb-${index}`}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "6px",
                  border: activeImage === img ? "2px solid purple" : "2px solid #ddd",
                }}
                onClick={() => setActiveImage(img)}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <p style={{ color: "#888", textTransform: "capitalize" }}>
            {product.category} {product.subCategory ? `› ${product.subCategory}` : ""}
          </p>

          <h1 style={{ margin: "8px 0" }}>{product.name}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "8px 0" }}>
            <span style={{ color: "#f5a623", fontWeight: "bold" }}>
              ★ {product.rating}
            </span>
            <span style={{ color: "#888" }}>({product.reviews} reviews)</span>
          </div>

          <div style={{ margin: "12px 0" }}>
            <span style={{ fontSize: "28px", fontWeight: "bold", color: "purple" }}>
              ₹{product.price?.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span style={{ marginLeft: "12px", color: "#888", textDecoration: "line-through" }}>
                ₹{product.originalPrice?.toLocaleString()}
              </span>
            )}
            {product.originalPrice && (
              <span style={{ marginLeft: "8px", color: "green", fontWeight: "bold" }}>
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
              </span>
            )}
          </div>

          {/* Size Options */}
          {product.sizeOptions?.length > 0 && (
            <div style={{ margin: "16px 0" }}>
              <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Select Size:</p>
              <div style={{ display: "flex", gap: "10px" }}>
                {product.sizeOptions.map((size) => (
                  <button
                    key={size}
                    style={{
                      padding: "6px 14px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      cursor: "pointer",
                      background: "white",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {product.keyFeatures?.length > 0 && (
            <div style={{ margin: "16px 0" }}>
              <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Key Features:</p>
              <ul style={{ paddingLeft: "20px", color: "#555" }}>
                {product.keyFeatures.map((feature, index) => (
                  <li key={index} style={{ marginBottom: "4px" }}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock Status */}
          <p style={{ color: product.inStock ? "green" : "red", fontWeight: "bold" }}>
            {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
          </p>

          <div style={{ display: "flex", gap: "15px", marginTop: "24px" }}>
            <button
              disabled={!product.inStock}
              style={{
                padding: "12px 28px",
                background: product.inStock ? "purple" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: product.inStock ? "pointer" : "not-allowed",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => console.log("Add to cart:", product._id)}
            >
              Add to Cart
            </button>

            <button
              style={{
                padding: "12px 28px",
                background: "transparent",
                border: "2px solid purple",
                color: "purple",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: "60px" }}>
          <h2>Related Products</h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                style={{
                  border: "1px solid #eee",
                  padding: "15px",
                  width: "180px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img
                  src={getImageUrl(item.img)}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />
                <h4 style={{ margin: "8px 0 4px", fontSize: "14px" }}>{item.name}</h4>
                <p style={{ color: "purple", fontWeight: "bold" }}>
                  ₹{item.price?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;