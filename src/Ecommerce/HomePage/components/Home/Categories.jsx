import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

function Categories() {
  const categories = [
    { id: 1, icon: "👔", name: "Men", link: "/category/men" },
    { id: 2, icon: "👗", name: "Women", link: "/category/women" },
    { id: 3, icon: "🧸", name: "Kids", link: "/category/kids" },
    { id: 4, icon: "📱", name: "Electronics", link: "/category/electronics" },
    { id: 5, icon: "👟", name: "Footwear", link: "/category/footwear" },
    { id: 6, icon: "💄", name: "Beauty", link: "/category/beauty" },
    { id: 7, icon: "🎾", name: "Sports", link: "/category/sports" },
    { id: 8, icon: "🍽️", name: "Kitchen", link: "/category/kitchen" },
  ];

  return (
    <nav className="categories-container" aria-label="Product categories">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          to={category.link} 
          className="category-card"
        >
          <div className="category-icon-wrapper">
            <span className="category-icon" aria-hidden="true">
              {category.icon}
            </span>
          </div>
          <span className="category-name">{category.name}</span>
        </Link>
      ))}
    </nav>
  );
}

export default Categories;


//needs to modify to route into men,women...pages