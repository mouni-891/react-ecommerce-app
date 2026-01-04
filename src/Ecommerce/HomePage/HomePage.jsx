
import Categories from "./components/Home/Categories";
import HeroCarousel from "./components/Home/HeroCarousel";
import "./HomePage.css";
import "./components/Header/Header.css";
import "./components/Home/Categories.css";
import "./components/Home/HeroCarousel";
import React from "react";
import HotPicks from "./components/Home/HotPicks";

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
