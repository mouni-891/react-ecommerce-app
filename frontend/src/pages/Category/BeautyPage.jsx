import { useNavigate } from "react-router-dom";
import "./BeautyPage.css";

export const beautySubCategories = [
  { name: "Hair Care", slug: "hair-care", img: "/images/beauty/haircareimage.png", desc: "Shampoos, oils, serums & more" },
  { name: "Make Up", slug: "make-up", img: "/images/beauty/makeupimage.png", desc: "Lipsticks, foundations & more" },
  { name: "Men Grooming", slug: "men-grooming", img: "/images/beauty/mengroomingimage.png", desc: "Shaving, beard care & more" },
  { name: "Perfumes", slug: "perfumes", img: "/images/beauty/perfumesimage.png", desc: "Fragrances for every mood" },
  { name: "Skin Care", slug: "skin-care", img: "/images/beauty/skincareimage.png", desc: "Moisturizers, serums & more" },
];

function BeautyPage() {
  const navigate = useNavigate();

  return (
    <div className="beauty-main">
      {/* BREADCRUMB */}
      <div className="beauty-breadcrumb">
        <a href="/">Home</a>
        <span>›</span>
        <span>Beauty</span>
      </div>

      <div className="beauty-layout">
        {/* LEFT SIDEBAR */}
        <aside className="beauty-sidebar">
          <div className="sidebar-block">
            <h3 className="sidebar-title">Categories</h3>
            <ul className="sidebar-links">
              {beautySubCategories.map((item) => (
                <li key={item.slug}>
                  <button
                    className="sidebar-link"
                    onClick={() => navigate(`/category/${item.slug}`)}
                  >
                    <span className="sidebar-link-name">{item.name}</span>
                    <span className="sidebar-arrow">›</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-block">
            <h3 className="sidebar-title">Why Shop Beauty?</h3>
            <ul className="sidebar-perks">
              <li>✅ 100% Authentic Products</li>
              <li>🚚 Free Delivery on ₹499+</li>
              <li>↩️ Easy 7-Day Returns</li>
              <li>🎁 Gift Wrapping Available</li>
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="beauty-content">
          <div className="beauty-title-row">
            <h1>Beauty</h1>
            <span className="beauty-subtitle">Shop by Category</span>
          </div>

          <div className="beauty-grid" role="grid">
            {beautySubCategories.map((item) => (
              <div
                key={item.slug}
                className="beauty-card"
                onClick={() => navigate(`/category/${item.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/category/${item.slug}`);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Navigate to ${item.name} category`}
              >
                <div className="beauty-card-image">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${item.img}`}
                    alt={`${item.name} category`}
                    loading="lazy"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                  <div className="beauty-card-overlay">
                    <span>Shop Now →</span>
                  </div>
                </div>
                <div className="beauty-card-body">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeautyPage;