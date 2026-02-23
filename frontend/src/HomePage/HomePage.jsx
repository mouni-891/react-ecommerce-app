import Categories from "@/pages/Home/Categories";
import HeroCarousel from "@/pages/Home/HeroCarousel";
import "./HomePage.css";
import "@/Header/Header.css";
import "@/pages/Home/Categories.css";
import "@/pages/Home/HotPicks.css";
import React from "react";
import HotPicks from "@/pages/Home/HotPicks";
import DealsOfTheDay from "@/pages/Home/DealsOfTheDay";
import BestSellerCarousel from "@/pages/Home/BestSellerCarousel";


function HomePage() {
  return (
    <>
      <Categories />
      <HeroCarousel />
      <HotPicks />
      <DealsOfTheDay />
      <BestSellerCarousel />
       
    </>
  );
}

export default HomePage;
