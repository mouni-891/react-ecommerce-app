import { useNavigate } from "react-router-dom";
import "./BeautyPage.css";

export const beautySubCategories = [ 
  { name: "Hair Care", slug: "hair-care", img: "/Categories/beauty/haircareimage.png" },
  { name: "Make Up", slug: "make-up", img: "/Categories/beauty/makeupimage.png" },
  { name: "Men Grooming", slug: "men-grooming", img: "/Categories/beauty/mengroomingimage.png" },
  { name: "Perfumes", slug: "perfumes", img: "/Categories/beauty/perfumesimage.png" },
  { name: "Skin Care", slug: "skin-care", img: "/Categories/beauty/skincareimage.png" },
];

function BeautyPage() {
  const navigate = useNavigate();

  const handleCardClick = (slug) => {
    navigate(`/category/beauty/${slug}`);
  };

  return (
    <div className="beauty-main">
      <h1>Beauty</h1>
      <div className="beauty-grid" role="grid">
        {beautySubCategories.map((item) => (
          <div
            key={item.slug}
            className="beauty-card"
            onClick={() => handleCardClick(item.slug)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(item.slug);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${item.name} category`}
          >
            <img src={item.img} alt={`${item.name} category`} loading="lazy" />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeautyPage;
