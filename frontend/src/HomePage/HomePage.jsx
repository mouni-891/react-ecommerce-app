import Categories from "@/pages/Home/Categories";
import HeroCarousel from "@/pages/Home/HeroCarousel";
import "./HomePage.css";
import "@/Header/Header.css";
import "@/pages/Home/Categories.css";
import React from "react";
import HotPicks from "@/pages/Home/HotPicks";

function HomePage() {
  return (
    <>
      <Categories />
      <HeroCarousel />
      <HotPicks />
    </>
  );
}

export default HomePage;
