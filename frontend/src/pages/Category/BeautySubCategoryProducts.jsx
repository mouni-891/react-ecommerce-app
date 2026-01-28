import { useParams, useNavigate } from "react-router-dom";
import ProductData from "@/data/ProductData";
import "./BeautySubCategoryProducts.css";

function BeautySubCategoryProducts() {
  const { subCategory } = useParams();
  const navigate = useNavigate();

  const toSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  ProductData.forEach((p) => {
    if (p.category === "beauty") {
      console.log(
        "DATA subCategory:",
        p.subCategory,
        "→ slug:",
        toSlug(p.subCategory),
      );
    }
  });
  const products = ProductData.filter((p) => {
    return (
      p.category.toLowerCase() === "beauty" &&
      toSlug(p.subCategory) === subCategory
    );
  });

  return (
    <div className="subcategory-page">
      <h2>{subCategory.replace("-", " ").toUpperCase()}</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="subcategory-grid">
          {products.map((item) => (
            <div
              key={item.id}
              className="subcategory-card"
              onClick={() =>
                navigate(`/product/${item.slug || toSlug(item.name)}`)
              }
            >
              <img src={item.img} alt={item.name} />
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
