import { useNavigate } from "react-router-dom";
import "./BeautyPage.css";

const beautySubCategories = [
  {
    name: "Hair Care",
    slug: "Hair Care",
    img: "/Categories/beauty/haircareimage.png",
  },
  { name: "Make Up", slug: "Make Up", img: "/Categories/beauty/makeupimage.png" },
  {
    name: "Men Grooming",
    slug: "Men Grooming",
    img: "/Categories/beauty/mengroomingimage.png",
  },
  {
    name: "Perfumes",
    slug: "Perfumes",
    img: "/Categories/beauty/perfumesimage.png",
  },
  {
    name: "Skin Care",
    slug: "Skin Care",
    img: "/Categories/beauty/skincareimage.png",
  },
];

const toSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

function BeautyPage() {
  const navigate = useNavigate();

  return (
    <div className="beauty-main">
      <h1>Beauty</h1>
      <div className="beauty-grid">
        {beautySubCategories.map((item) => (
          <div
            key={item.slug}
            className="beauty-card"
            onClick={() => navigate(`/category/beauty/${toSlug(item.slug)}`)}
          >
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeautyPage;
