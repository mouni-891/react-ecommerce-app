import React, { useRef } from "react";
import styles from "./BestSellerCarousel.module.css";

const categoryData = {
  Clothing: [
    {
      id: "c1",
      name: "Men Slim Fit Casual Shirt",
      image: "/hotPicks-images/clothing/menShirt.png",
      category: "clothing",
    },
    {
      id: "c2",
      name: "Women Floral Kurta Set",
      image: "/hotPicks-images/clothing/womenDress.png",
      category: "clothing",
    },
    {
      id: "c3",
      name: "Men Slim Fit Denim Jeans",
      image: "/hotPicks-images/clothing/menJeans.png",
      category: "clothing",
    },
    {
      id: "c4",
      name: "Baby Girl Festive Dress",
      image: "/hotPicks-images/clothing/babyDress.png",
      category: "clothing",
    },
    {
      id: "c5",
      name: "Women Casual Sneakers",
      image: "/hotPicks-images/women/sneakers.png",
      category: "clothing",
    },
    {
      id: "c6",
      name: "Men Ethnic Kurta",
      image: "/Categories/men/Kurta.png",
      category: "clothing",
    },
    {
      id: "c7",
      name: "Girls Printed Leggings",
      image: "/Categories/kids/girlsLeggings.png",
      category: "clothing",
    },
    {
      id: "c8",
      name: "Women Anarkali Suit",
      image: "/Categories/women/anarkali.png",
      category: "clothing",
    },
  ],
  Electronics: [
    {
      id: "e1",
      name: "Wireless Headphones",
      image: "/hotPicks-images/electronics/headPhones.png",
    },
    {
      id: "e2",
      name: "True Wireless Earbuds",
      image: "/hotPicks-images/electronics/earbuds.png",
    },
    {
      id: "e3",
      name: "Smart LED TV 43-inch",
      image: "/hotPicks-images/electronics/smartTV.png",
    },
    {
      id: "e4",
      name: "Bluetooth Speaker",
      image: "/hotPicks-images/electronics/speaker.png",
    },
    {
      id: "e5",
      name: "NovaBook Air 14 Laptop",
      image: "/hotPicks-images/electronics/laptop.png",
    },
    {
      id: "e6",
      name: "Split AC 1.5 Ton",
      image: "/hotPicks-images/electronics/ac.png",
    },
    {
      id: "e7",
      name: "Smart Watch Series 5",
      image: "/hotPicks-images/electronics/smartwatch.png",
    },
    {
      id: "e8",
      name: "4K Action Camera",
      image: "/hotPicks-images/electronics/camera.png",
    },
  ],
  Beauty: [
    {
      id: "b1",
      name: "Vitamin C Face Serum",
      image: "/Categories/beauty/faceSerum.png",
    },
    {
      id: "b2",
      name: "Matte Lipstick Set",
      image: "/Categories/beauty/lipstick.png",
    },
    {
      id: "b3",
      name: "Hair Growth Serum",
      image: "/Categories/beauty/hairSerum.png",
    },
    {
      id: "b4",
      name: "SPF 50 Sunscreen",
      image: "/Categories/beauty/sunscreen.png",
    },
    {
      id: "b5",
      name: "Perfume EDP 100ml",
      image: "/Categories/beauty/perfume.png",
    },
    {
      id: "b6",
      name: "Kajal Pencil Pack",
      image: "/Categories/beauty/kajal.png",
    },
    {
      id: "b7",
      name: "Aloe Vera Gel 300g",
      image: "/Categories/beauty/aloeGel.png",
    },
    {
      id: "b8",
      name: "Neem Face Wash 100ml",
      image: "/Categories/beauty/faceWash.png",
    },
  ],
  Kitchen: [
    {
      id: "k1",
      name: "Non-Stick Cookware Set",
      image: "/Categories/kitchen/cookwareSet.png",
    },
    {
      id: "k2",
      name: "Stainless Steel Tiffin",
      image: "/Categories/kitchen/tiffin.png",
    },
    {
      id: "k3",
      name: "750W Mixer Grinder",
      image: "/Categories/kitchen/mixerGrinder.png",
    },
    {
      id: "k4",
      name: "Glass Containers Set",
      image: "/Categories/kitchen/glassContainers.png",
    },
    {
      id: "k5",
      name: "Electric Kettle 1.5L",
      image: "/Categories/kitchen/kettle.png",
    },
    {
      id: "k6",
      name: "Knife Block Set 6pc",
      image: "/Categories/kitchen/knifeSet.png",
    },
    {
      id: "k7",
      name: "Oil Dispenser 2-in-1",
      image: "/Categories/kitchen/oilDispenser.png",
    },
    {
      id: "k8",
      name: "Idli Maker 3-Tier",
      image: "/Categories/kitchen/idliMaker.png",
    },
  ],
};

function BestSellerCarousel({ category = "Clothing", title, products }) {
  const items = products || categoryData[category] || [];
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 600, behavior: "smooth" });
    }
  };

  const displayTitle = title || `Up to 70% off | Best Sellers in ${category}`;

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{displayTitle}</h3>
        <a href="#" className={styles.seeMore}>
          See more
        </a>
      </div>

      {/* Carousel */}
      <div className={styles.carouselRow}>
        {/* Left Arrow */}
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => scroll(-1)}
        >
          &#8249;
        </button>

        {/* Image Track */}
        <div className={styles.track} ref={scrollRef}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.imageBox}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />
              </div>
              <p className={styles.itemName}>{item.name}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => scroll(1)}
        >
          &#8250;
        </button>
      </div>

      {/* Scroll progress bar — like Amazon */}
      <div className={styles.progressBar}>
        <div className={styles.progressThumb} />
      </div>
    </div>
  );
}

export default BestSellerCarousel;
