// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "@context/CartContext";
// import "./CategoryPage.css";
// import { useWishlist } from "@context/WishlistContext";
// import { useAuth } from "@auth/AuthContext";

// function CategoryPage() {
//   const { toggleWishlist, isInWishlist } = useWishlist();
//   const { category } = useParams();
//   const { addToCart, isInCart } = useCart();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const products = {
//     clothing: [
//       {
//         id: "CL001",
//         name: "Men Solid Casual Cotton Shirt",
//         img: "/hotPicks-images/menShirt.png",
//         price: 1119,
//         currency: "INR",
//         rating: 4.0,
//         reviews: 320,
//         category: "clothing",
//         subCategory: "Men Shirts",
//         sizeOptions: ["S", "M", "L", "XL"],
//         inStock: true,
//         isFeatured: true,
//         isNewArrival: false,
//       },
//       {
//         id: "CL002",
//         name: "Women Rayon Straight Kurti Top",
//         img: "/hotPicks-images/womenTop.png",
//         price: 250,
//         currency: "INR",
//         rating: 3.5,
//         reviews: 210,
//         category: "clothing",
//         subCategory: "Women Tops",
//         sizeOptions: ["S", "M", "L", "XL"],
//         inStock: true,
//         isFeatured: false,
//         isNewArrival: true,
//       },
//       {
//         id: "CL003",
//         name: "Baby Boy Printed T-Shirt & Shorts Set",
//         img: "/hotPicks-images/babyBoy1.png",
//         price: 630,
//         currency: "INR",
//         rating: 4.4,
//         reviews: 128,
//         category: "clothing",
//         subCategory: "Baby Boy Sets",
//         sizeOptions: ["S", "M", "L", "XL"],
//         inStock: true,
//         isFeatured: false,
//         isNewArrival: false,
//       },
//       {
//         id: "CL004",
//         name: "Baby Girl Festive Pavadai Dress",
//         img: "/hotPicks-images/babyGirl2.png",
//         price: 550,
//         currency: "INR",
//         rating: 4.2,
//         reviews: 220,
//         category: "clothing",
//         subCategory: "Baby Girl Ethnic Wear",
//         sizeOptions: ["S", "M", "L", "XL"],
//         inStock: true,
//         isFeatured: true,
//         isNewArrival: false,
//       },
//       {
//         id: "CL005",
//         name: "Men Winter Fleece Hoodie",
//         img: "/hotPicks-images/menHoddy.png",
//         price: 930,
//         currency: "INR",
//         rating: 3.8,
//         reviews: 110,
//         category: "clothing",
//         subCategory: "Hoodies",
//         sizeOptions: ["S", "M", "L", "XL"],
//         inStock: true,
//         isFeatured: false,
//         isNewArrival: false,
//       },
//       {
//         id: "CL006",
//         name: "Baby Boy Lightweight Cotton Set",
//         img: "/hotPicks-images/babyBoy.png",
//         price: 877,
//         currency: "INR",
//         rating: 4.0,
//         reviews: 490,
//         category: "clothing",
//         subCategory: "Baby Boy Sets",
//         sizeOptions: ["S", "M", "L", "XL"],
//         inStock: true,
//         isFeatured: true,
//         isNewArrival: true,
//       },
//       {
//         id: "CL007",
//         name: "Women Embroidered Ethnic Dress",
//         img: "/hotPicks-images/womenDress.png",
//         price: 799,
//         currency: "INR",
//         rating: 4.1,
//         reviews: 517,
//         category: "clothing",
//         subCategory: "Women Dresses",
//         sizeOptions: ["S", "M", "L", "XL"],
//         inStock: true,
//         isFeatured: false,
//         isNewArrival: true,
//       },
//       {
//         id: "CL008",
//         name: "Baby Girl Party Dress with Bow",
//         img: "/hotPicks-images/babyGirl1.png",
//         price: 435,
//         currency: "INR",
//         rating: 3.8,
//         reviews: 250,
//         category: "clothing",
//         subCategory: "Baby Girl Party Wear",
//         sizeOptions: ["S", "M", "L", "XL"],
//         inStock: true,
//         isFeatured: false,
//         isNewArrival: false,
//       },
//     ],

//     electronics: [
//       {
//         id: "EL001",
//         name: "NovaBook Air 14 (i5, 16GB RAM, SSD)",
//         img: "/hotPicks-images/laptop.png",
//         price: 55999,
//         currency: "INR",
//         rating: 4.5,
//         reviews: 820,
//         category: "electronics",
//         subCategory: "Laptops",
//         inStock: true,
//       },
//       {
//         id: "EL002",
//         name: "SoundMax ANC Wireless Headphones",
//         img: "/hotPicks-images/headPhones.png",
//         price: 2999,
//         currency: "INR",
//         rating: 4.2,
//         reviews: 540,
//         category: "electronics",
//         subCategory: "Audio",
//         inStock: true,
//       },
//       {
//         id: "EL003",
//         name: "True Wireless Earbuds with Charging Case",
//         img: "/hotPicks-images/earPods.png",
//         price: 1999,
//         currency: "INR",
//         rating: 4.0,
//         reviews: 670,
//         category: "electronics",
//         subCategory: "Audio",
//         inStock: true,
//       },
//       {
//         id: "EL004",
//         name: "PulseFit Pro Smart Watch",
//         img: "/hotPicks-images/watch.png",
//         price: 3499,
//         currency: "INR",
//         rating: 4.1,
//         reviews: 410,
//         category: "electronics",
//         subCategory: "Wearables",
//         inStock: true,
//       },
//       {
//         id: "EL005",
//         name: "Fully Automatic Washing Machine (7 kg)",
//         img: "/hotPicks-images/washingMachine.png",
//         price: 22999,
//         currency: "INR",
//         rating: 4.3,
//         reviews: 290,
//         category: "electronics",
//         subCategory: "Home Appliances",
//         inStock: true,
//       },
//       {
//         id: "EL006",
//         name: "20-Litre Convection Microwave Oven",
//         img: "/hotPicks-images/microwaveOven.png",
//         price: 12499,
//         currency: "INR",
//         rating: 4.0,
//         reviews: 180,
//         category: "electronics",
//         subCategory: "Kitchen Appliances",
//         inStock: true,
//       },
//       {
//         id: "EL007",
//         name: "Compact Hair Dryer with Heat Control",
//         img: "/hotPicks-images/hairDryer.png",
//         price: 1499,
//         currency: "INR",
//         rating: 4.1,
//         reviews: 360,
//         category: "electronics",
//         subCategory: "Personal Care",
//         inStock: true,
//       },
//       {
//         id: "EL008",
//         name: "ClickPro DSLR Camera 24MP",
//         img: "/hotPicks-images/Camera.png",
//         price: 38999,
//         currency: "INR",
//         rating: 4.6,
//         reviews: 210,
//         category: "electronics",
//         subCategory: "Cameras",
//         inStock: true,
//       },
//     ],
//   };

//   return (
//     <div className="category-page">
//       <h1>{category?.charAt(0).toUpperCase() + category?.slice(1)}</h1>

//       <div className="category-products-grid">
//         {products[category]?.map((item) => (
//           <div key={item.id} className="category-product-card">
//             <img
//               src={item.img}
//               alt={item.name}
//               className="category-product-img"
//               onClick={() => navigate(`/product/${item.id}`)}
//               style={{ cursor: "pointer" }}
//             />

//             <div className="category-product-content">
//               <h4 className="category-product-name">{item.name}</h4>
//               <p className="category-product-price">₹{item.price}</p>
//               <p className="category-product-rating">
//                 {item.rating} ({item.reviews})
//               </p>
//             </div>

//             <div className="category-product-actions">
//               <button
//                 className="category-cart-button"
//                 disabled={!item.inStock}
//                 onClick={() => {
//                   if (!user) {
//                     navigate("/login");
//                     return;
//                   }

//                   if (isInCart(item.id)) {
//                     navigate("/cart");
//                   } else {
//                     addToCart(item);
//                   }
//                 }}
//               >
//                 {!item.inStock
//                   ? "Out of Stock"
//                   : isInCart(item.id)
//                     ? "Go to Cart"
//                     : "Add to Cart"}
//               </button>
//               <button
//                 className="category-wishlist-button"
//                 onClick={(e) => {
//                   e.stopPropagation();

//                   if (!user) {
//                     navigate("/login");
//                     return;
//                   }

//                   toggleWishlist(item);
//                 }}
//               >
//                 <img
//                   src={
//                     isInWishlist(item.id)
//                       ? "/wishlist/favorite2.png"
//                       : "/wishlist/favorite.png"
//                   }
//                   alt="wishlist"
//                   className="wishlist-icon"
//                 />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CategoryPage;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductData from "@data/ProductData";
import { useCart } from "@context/CartContext";
import { useWishlist } from "@context/WishlistContext";
import { useAuth } from "@auth/AuthContext";
import { useEffect, useState } from "react";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const filteredProducts = ProductData.filter(
    (item) => item.category === category,
  );

  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Check if already in cart
    if (isInCart(product.id)) {
      navigate("/cart");
      return;
    }

    // For clothing items with size options, show size selector
    if (product.sizeOptions && product.sizeOptions.length > 0) {
      setSelectedProduct(product);
      setSelectedSize(product.sizeOptions[0]); // Set default size
      setShowSizeModal(true);
    } else {
      // For electronics, add directly
      addToCart({ ...product, quantity: 1 });
    }
  };

  const confirmAddToCart = () => {
    if (selectedProduct && selectedSize) {
      addToCart({
        ...selectedProduct,
        quantity: 1,
        selectedSize: selectedSize,
      });
      setShowSizeModal(false);
      setSelectedProduct(null);
      setSelectedSize("");
    }
  };

  return (
    <div className="category-page">
      <h1>{category?.toUpperCase()}</h1>

      <div className="category-products-grid">
        {filteredProducts.map((item) => (
          <div key={item.id} className="category-product-card">
            <img
              src={item.img}
              alt={item.name}
              className="category-product-img"
              onClick={() => navigate(`/product/${item.id}`)}
            />

            <div className="category-product-content">
              <h4 className="category-product-name">{item.name}</h4>
              <p className="category-product-price">
                ₹{item.price.toLocaleString()}
              </p>
              <div className="category-product-rating">
                {item.rating} ({item.reviews})
              </div>
            </div>

            <div className="category-product-actions">
              <button
                className="category-cart-button"
                disabled={!item.inStock}
                onClick={() => handleAddToCart(item)}
              >
                {!item.inStock
                  ? "Out of Stock"
                  : isInCart(item.id)
                    ? "Go to Cart"
                    : "Add to Cart"}
              </button>

              <button
                className="category-wishlist-button"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                    return;
                  }
                  toggleWishlist(item);
                }}
              >
                <img
                  src={
                    isInWishlist(item.id)
                      ? "/wishlist/favorite2.png"
                      : "/wishlist/favorite.png"
                  }
                  alt="wishlist"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showSizeModal && selectedProduct && (
        <div
          className="size-modal-overlay"
          onClick={() => setShowSizeModal(false)}
        >
          <div className="size-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Select Size</h3>
            <p className="modal-product-name">{selectedProduct.name}</p>

            <div className="modal-size-options">
              {selectedProduct.sizeOptions.map((size) => (
                <button
                  key={size}
                  className={`modal-size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setShowSizeModal(false)}
              >
                Cancel
              </button>
              <button className="modal-confirm-btn" onClick={confirmAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
