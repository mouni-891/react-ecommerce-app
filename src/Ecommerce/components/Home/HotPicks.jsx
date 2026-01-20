// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./HotPicks.css";

// const HotPicks = () => {
//   const navigate = useNavigate();

//   const clothing = [
//     {
//       id: 1,
//       name: "Men Shirt",
//       img: "/hotPicks-images/menShirt.png",
//       offer: "Min. 50% Off",
//     },
//     {
//       id: 2,
//       name: "Women Summer Top Wear",
//       img: "/hotPicks-images/womenTop.png",
//       offer: "Min. 60% Off",
//     },
//     {
//       id: 3,
//       name: "Baby Boy Lion Print Set",
//       img: "/hotPicks-images/babyBoy1.png",
//       offer: "Min. 55% Off",
//     },

//     {
//       id: 4,
//       name: "Baby Girl Pavadai Dress",
//       img: "/hotPicks-images/babyGirl2.png",
//       offer: "Min. 70% Off",
//     },
//     {
//       id: 5,
//       name: "Hoddy",
//       img: "/hotPicks-images/menHoddy.png",
//       offer: "Min. 50% Off",
//     },
//     {
//       id: 6,
//       name: "Baby Boy Summer Set",
//       img: "/hotPicks-images/babyBoy.png",
//       offer: "Min. 65% Off",
//     },
//   ];

//   const electronics = [
//     {
//       id: 1,
//       name: "Laptop",
//       img: "/hotPicks-images/laptop.png",
//       offer: "Min. 40% Off",
//     },
//     {
//       id: 2,
//       name: "Headphones",
//       img: "/hotPicks-images/headPhones.png",
//       offer: "Min. 65% Off",
//     },
//     {
//       id: 3,
//       name: "Ear Pods",
//       img: "/hotPicks-images/earPods.png",
//       offer: "Min. 70% Off",
//     },
//     {
//       id: 4,
//       name: "Watch",
//       img: "/hotPicks-images/watch.png",
//       offer: "Min. 90% Off",
//     },
//     {
//       id: 5,
//       name: "Washing Machine",
//       img: "/hotPicks-images/washingMachine.png",
//       offer: "Min. 60% Off",
//     },
//     {
//       id: 6,
//       name: "Microwave Oven",
//       img: "/hotPicks-images/microwaveOven.png",
//       offer: "Min. 50% Off",
//     },
//   ];

//   return (
//     <div className="hot-picks-container">
//       <div className="categories-wrapper">
//         {/* Clothing Category */}
//         <div className="category-card">
//           <h2 className="category-title">Clothing Hot Picks</h2>
//           <div className="products-grid">
//             {clothing.map((item) => (
//               <div key={item.id} className="product-card">
//                 <img src={item.img} alt={item.name} />
//                 <p className="product-name">{item.name}</p>
//                 <p className="product-offer">{item.offer}</p>
//               </div>
//             ))}
//           </div>
//           <button
//             className="explore-btn"
//             onClick={() => navigate("/category/clothing")}
//           >
//             Explore More →
//           </button>
//         </div>

//         {/* Electronics Category */}
//         <div className="category-card">
//           <h2 className="category-title">Electronics Hot Picks</h2>
//           <div className="products-grid">
//             {electronics.map((item) => (
//               <div key={item.id} className="product-card">
//                 <img src={item.img} alt={item.name} />
//                 <p className="product-name">{item.name}</p>
//                 <p className="product-offer">{item.offer}</p>
//               </div>
//             ))}
//           </div>
//           <button
//             className="explore-btn"
//             onClick={() => navigate("/category/electronics")}
//           >
//             Explore More →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotPicks;



import React from "react";
import { useNavigate } from "react-router-dom";
import ProductData from "@data/ProductData";
import "./HotPicks.css";

const HotPicks = () => {
  const navigate = useNavigate();

  const clothing = ProductData.filter(
    (item) => item.category === "clothing" && item.isFeatured
  );

  const electronics = ProductData.filter(
    (item) => item.category === "electronics" && item.isFeatured
  );

  return (
    <div className="hot-picks-container">
      <div className="categories-wrapper">

        {/* Clothing */}
        <div className="category-card">
          <h2 className="category-title">Clothing Hot Picks</h2>
          <div className="products-grid">
            {clothing.map((item) => (
              <div
                key={item.id}
                className="product-card"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.img} alt={item.name} />
                <p className="product-name">{item.name}</p>
              </div>
            ))}
          </div>
          <button
            className="explore-btn"
            onClick={() => navigate("/category/clothing")}
          >
            Explore More →
          </button>
        </div>

        {/* Electronics */}
        <div className="category-card">
          <h2 className="category-title">Electronics Hot Picks</h2>
          <div className="products-grid">
            {electronics.map((item) => (
              <div
                key={item.id}
                className="product-card"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="product-image-wrapper">
                <img src={item.img} alt={item.name} />
                <p className="product-name">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="explore-btn"
            onClick={() => navigate("/category/electronics")}
          >
            Explore More →
          </button>
        </div>

      </div>
    </div>
  );
};

export default HotPicks;
