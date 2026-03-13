import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { getImageUrl } from "@/api";
import "./CategoryPage.css";

const BEAUTY_SUB_SLUGS = ["hair-care", "make-up", "men-grooming", "perfumes", "skin-care"];
const SORT_OPTIONS = [
  { value: "default",    label: "Relevance" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
];
const RATING_OPTIONS = [4, 3, 2];

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [sortBy, setSortBy]           = useState("default");
  const [minPrice, setMinPrice]       = useState("");
  const [maxPrice, setMaxPrice]       = useState("");
  const [minRating, setMinRating]     = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const { addToCart, isInCart }           = useCart();
  const { toggleWishlist, isInWishlist }  = useWishlist();
  const API_URL = import.meta.env.VITE_API_URL;

  const isBeautySub = BEAUTY_SUB_SLUGS.includes(category);
  const apiCategory = category?.replaceAll("-", " ");
  const displayName = apiCategory?.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchProducts = async () => {
      try {
        setLoading(true); setError(null);
        const url = isBeautySub
          ? `${API_URL}/api/products?category=beauty&subCategory=${encodeURIComponent(apiCategory)}`
          : `${API_URL}/api/products?category=${encodeURIComponent(apiCategory)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        setProducts(await res.json());
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };
    fetchProducts();
  }, [category, API_URL]);

  const priceMin = useMemo(() => products.length ? Math.min(...products.map(p => p.price || 0)) : 0, [products]);
  const priceMax = useMemo(() => products.length ? Math.max(...products.map(p => p.price || 0)) : 0, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (minPrice !== "")  list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice !== "")  list = list.filter(p => p.price <= Number(maxPrice));
    if (minRating > 0)    list = list.filter(p => (p.rating || 0) >= minRating);
    if (inStockOnly)      list = list.filter(p => p.inStock);
    if (sortBy === "price_asc")  list.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating")     list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list;
  }, [products, sortBy, minPrice, maxPrice, minRating, inStockOnly]);

  const clearFilters = () => { setSortBy("default"); setMinPrice(""); setMaxPrice(""); setMinRating(0); setInStockOnly(false); };
  const hasActiveFilters = sortBy !== "default" || minPrice || maxPrice || minRating > 0 || inStockOnly;

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error)   return <div className="category-page"><h2>Error: {error}</h2></div>;

  return (
    <div className="category-page">
      <div className="category-header">
        <div className="category-breadcrumb">
          <a href="/">Home</a><span>›</span>
          {isBeautySub && <><a href="/beauty">Beauty</a><span>›</span></>}
          <span>{displayName}</span>
        </div>
        <div className="category-title-row">
          <h1>{displayName}</h1>
          <span className="category-count">{filtered.length} of {products.length} products</span>
        </div>
      </div>

      <div className="category-layout">
        <aside className="filter-sidebar">
          <div className="filter-sidebar-header">
            <span className="filter-sidebar-title">Filters</span>
            {hasActiveFilters && <button className="filter-clear-btn" onClick={clearFilters}>Clear all</button>}
          </div>

          <div className="filter-block">
            <span className="filter-block-title">Sort By</span>
            <div className="filter-sort-list">
              {SORT_OPTIONS.map(opt => (
                <button key={opt.value} className={`filter-sort-option ${sortBy === opt.value ? "active" : ""}`} onClick={() => setSortBy(opt.value)}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-divider" />

          <div className="filter-block">
            <span className="filter-block-title">Price Range</span>
            {products.length > 0 && <p className="filter-range-hint">Rs.{priceMin.toLocaleString()} to Rs.{priceMax.toLocaleString()}</p>}
            <div className="filter-price-row">
              <div className="filter-price-input">
                <label>Min</label>
                <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} min={0} />
              </div>
              <span className="filter-price-sep">-</span>
              <div className="filter-price-input">
                <label>Max</label>
                <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} min={0} />
              </div>
            </div>
          </div>

          <div className="filter-divider" />

          <div className="filter-block">
            <span className="filter-block-title">Min Rating</span>
            <div className="filter-rating-list">
              {RATING_OPTIONS.map(r => (
                <button key={r} className={`filter-rating-option ${minRating === r ? "active" : ""}`} onClick={() => setMinRating(minRating === r ? 0 : r)}>
                  {"★".repeat(r)}{"☆".repeat(5 - r)} {r}+
                </button>
              ))}
            </div>
          </div>

          <div className="filter-divider" />

          <div className="filter-block">
            <label className="filter-toggle-row">
              <span className="filter-block-title" style={{marginBottom:0}}>In Stock Only</span>
              <div className={`filter-toggle ${inStockOnly ? "on" : ""}`} onClick={() => setInStockOnly(v => !v)} role="switch" aria-checked={inStockOnly} tabIndex={0} onKeyDown={e => e.key === "Enter" && setInStockOnly(v => !v)}>
                <div className="filter-toggle-thumb" />
              </div>
            </label>
          </div>
        </aside>

        <div className="category-main">
          {filtered.length === 0 ? (
            <div className="category-empty-state">
              <h2>No Products Found</h2>
              <p>Try adjusting your filters</p>
              <button className="category-cart-button" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="category-products-grid">
              {filtered.map((item) => {
                const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : null;
                return (
                  <div key={item._id} className="category-product-card" onClick={() => navigate(`/product/${item._id}`)}>
                    <div className="product-img-wrapper">
                      <img className="category-product-img" src={getImageUrl(item.thumbnail)} alt={item.name} onError={(e) => (e.target.src = "/placeholder.jpg")} />
                      {discount && <span className="product-discount-badge">{discount}% OFF</span>}
                      <button
                        className={`category-wishlist-button ${isInWishlist(item._id) ? "active" : ""}`}
                        onClick={(e) => { e.stopPropagation(); const a = isInWishlist(item._id); toggleWishlist(item); a ? toast("Removed from wishlist") : toast.success("Added to wishlist"); }}
                      >
                        {isInWishlist(item._id) ? <FaHeart color="#ef4444" /> : <FaRegHeart />}
                      </button>
                    </div>
                    <div className="category-product-content">
                      <h4 className="category-product-name">{item.name}</h4>
                      <div className="product-price-row">
                        <span className="category-product-price">Rs.{item.price?.toLocaleString()}</span>
                        {item.originalPrice && <span className="product-original-price">Rs.{item.originalPrice?.toLocaleString()}</span>}
                      </div>
                      <div className="product-meta-row">
                        {item.rating && <div className="category-product-rating">{item.rating}</div>}
                        <span className={`product-stock-badge ${item.inStock ? "" : "out"}`}>
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <div className="category-product-actions">
                        <button
                          className={`category-cart-button ${isInCart(item._id) ? "in-cart" : ""}`}
                          onClick={(e) => { e.stopPropagation(); if (isInCart(item._id)) { navigate("/cart"); } else { addToCart(item); toast.success("Added to cart"); } }}
                        >
                          {isInCart(item._id) ? "Go To Cart" : "Add To Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;