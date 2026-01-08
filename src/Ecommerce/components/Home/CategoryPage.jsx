import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@context/CartContext";
import "./CategoryPage.css";
// import { useWishlist } from "../../context/WishlistContext";

function CategoryPage() {
  // const { toggleWishlist } = useWishlist();
  const { category } = useParams();
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

  const products = {
    clothing: [
      {
        id: "CL001",
        name: "Men Solid Casual Cotton Shirt",
        img: "/hotPicks-images/menShirt.png",
        price: 1119,
        currency: "INR",
        rating: 4.0,
        reviews: 320,
        category: "clothing",
        subCategory: "Men Shirts",
        sizeOptions: ["S", "M", "L", "XL"],
        inStock: true,
        isFeatured: true,
        isNewArrival: false,
      },
      {
        id: "CL002",
        name: "Women Rayon Straight Kurti Top",
        img: "/hotPicks-images/womenTop.png",
        price: 250,
        currency: "INR",
        rating: 3.5,
        reviews: 210,
        category: "clothing",
        subCategory: "Women Tops",
        sizeOptions: ["S", "M", "L", "XL"],
        inStock: true,
        isFeatured: false,
        isNewArrival: true,
      },
      {
        id: "CL003",
        name: "Baby Boy Printed T-Shirt & Shorts Set",
        img: "/hotPicks-images/babyBoy1.png",
        price: 630,
        currency: "INR",
        rating: 4.4,
        reviews: 128,
        category: "clothing",
        subCategory: "Baby Boy Sets",
        sizeOptions: ["S", "M", "L", "XL"],
        inStock: true,
        isFeatured: false,
        isNewArrival: false,
      },
      {
        id: "CL004",
        name: "Baby Girl Festive Pavadai Dress",
        img: "/hotPicks-images/babyGirl2.png",
        price: 550,
        currency: "INR",
        rating: 4.2,
        reviews: 220,
        category: "clothing",
        subCategory: "Baby Girl Ethnic Wear",
        sizeOptions: ["S", "M", "L", "XL"],
        inStock: true,
        isFeatured: true,
        isNewArrival: false,
      },
      {
        id: "CL005",
        name: "Men Winter Fleece Hoodie",
        img: "/hotPicks-images/menHoddy.png",
        price: 930,
        currency: "INR",
        rating: 3.8,
        reviews: 110,
        category: "clothing",
        subCategory: "Hoodies",
        sizeOptions: ["S", "M", "L", "XL"],
        inStock: true,
        isFeatured: false,
        isNewArrival: false,
      },
      {
        id: "CL006",
        name: "Baby Boy Lightweight Cotton Set",
        img: "/hotPicks-images/babyBoy.png",
        price: 877,
        currency: "INR",
        rating: 4.0,
        reviews: 490,
        category: "clothing",
        subCategory: "Baby Boy Sets",
        sizeOptions: ["S", "M", "L", "XL"],
        inStock: true,
        isFeatured: true,
        isNewArrival: true,
      },
      {
        id: "CL007",
        name: "Women Embroidered Ethnic Dress",
        img: "/hotPicks-images/womenDress.png",
        price: 799,
        currency: "INR",
        rating: 4.1,
        reviews: 517,
        category: "clothing",
        subCategory: "Women Dresses",
        sizeOptions: ["S", "M", "L", "XL"],
        inStock: true,
        isFeatured: false,
        isNewArrival: true,
      },
      {
        id: "CL008",
        name: "Baby Girl Party Dress with Bow",
        img: "/hotPicks-images/babyGirl1.png",
        price: 435,
        currency: "INR",
        rating: 3.8,
        reviews: 250,
        category: "clothing",
        subCategory: "Baby Girl Party Wear",
        sizeOptions: ["S", "M", "L", "XL"],
        inStock: true,
        isFeatured: false,
        isNewArrival: false,
      },
    ],

    electronics: [
      {
        id: "EL001",
        name: "Laptop",
        img: "/hotPicks-images/laptop.png",
        price: 55999,
        currency: "INR",
        rating: 4.5,
        reviews: 820,
        category: "electronics",
        subCategory: "Laptops",
        inStock: true,
      },
      {
        id: "EL002",
        name: "Headphones",
        img: "/hotPicks-images/headPhones.png",
        price: 2999,
        currency: "INR",
        rating: 4.2,
        reviews: 540,
        category: "appliances",
        subCategory: "Audio",
        inStock: true,
      },
      {
        id: "EL003",
        name: "Ear Pods",
        img: "/hotPicks-images/earPods.png",
        price: 1999,
        currency: "INR",
        rating: 4.0,
        reviews: 670,
        category: "electronics",
        subCategory: "Audio",
        inStock: true,
      },
      {
        id: "EL004",
        name: "Smart Watch",
        img: "/hotPicks-images/watch.png",
        price: 3499,
        currency: "INR",
        rating: 4.1,
        reviews: 410,
        category: "electronics",
        subCategory: "Wearables",
        inStock: true,
      },
      {
        id: "EL005",
        name: "Washing Machine",
        img: "/hotPicks-images/washingMachine.png",
        price: 22999,
        currency: "INR",
        rating: 4.3,
        reviews: 290,
        category: "electronics",
        subCategory: "Home Appliances",
        inStock: true,
      },
      {
        id: "EL006",
        name: "Microwave Oven",
        img: "/hotPicks-images/microwaveOven.png",
        price: 12499,
        currency: "INR",
        rating: 4.0,
        reviews: 180,
        category: "electronics",
        subCategory: "Kitchen Appliances",
        inStock: true,
      },
      {
        id: "EL007",
        name: "Hair Dryer",
        img: "/hotPicks-images/hairDryer.png",
        price: 1499,
        currency: "INR",
        rating: 4.1,
        reviews: 360,
        category: "electronics",
        subCategory: "Personal Care",
        inStock: true,
      },
      {
        id: "EL008",
        name: "Digital Camera",
        img: "/hotPicks-images/Camera.png",
        price: 38999,
        currency: "INR",
        rating: 4.6,
        reviews: 210,
        category: "electronics",
        subCategory: "Cameras",
        inStock: true,
      },
    ],
  };

 return (
  <div className="category-page">
    <h1>{category ? category.toUpperCase() : "CATEGORY"}</h1>

    <div className="category-products-grid">
      {products[category]?.map((item) => (
        <div key={item.id} className="category-product-card">
          <img
            src={item.img}
            alt={item.name}
            className="category-product-img"
          />

          <div className="category-product-content">
            <h4 className="category-product-name">{item.name}</h4>
            <p className="category-product-price">₹{item.price}</p>
            <p className="category-product-rating">
              {item.rating} ({item.reviews})
            </p>
          </div>

          <div className="category-product-actions">
            <button
              className="category-cart-button"
              onClick={() => {
                if (isInCart(item.id)) {
                  navigate("/cart");
                } else {
                  addToCart(item);
                  alert("Item added to cart");
                }
              }}
            >
              {isInCart(item.id) ? "Go to Cart" : "Add to Cart"}
            </button>
            <button className="category-wishlist-button">💙</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default CategoryPage;
