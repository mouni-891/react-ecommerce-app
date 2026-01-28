import React, { useEffect, useState } from "react";

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Big Festive Sale",
      subtitle: "Up to 50% off on top brands",
      button: "Shop Now",
    },
    {
      title: "Trending Fashion Picks",
      subtitle: "Men & Women styles you'll love",
      button: "Explore Fashion",
    },
    {
      title: "New Arrivals Are Here",
      subtitle: "Fresh styles added daily",
      button: "Discover Now",
    },
    {
      title: "Shop With Confidence",
      subtitle: "Free delivery • Easy returns • Secure payments",
      button: "Start Shopping",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="hero" aria-label="Featured promotions">
      <div
        className="hero-slider"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="hero-slide" key={index}>
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <button className="cta-button">{slide.button}</button>
          </div>
        ))}
      </div>

      <div className="hero-dots" role="tablist">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="hero-nav prev-btn"
        onClick={handlePrevSlide}
        aria-label="Previous slide"
        title="Next slide"
      >
        ❮
      </button>

      <button
        className="hero-nav next-btn"
        onClick={handleNextSlide}
        aria-label="Next slide"
        title="Previous slide"
      >
        ❯
      </button>
    </section>
  );
}

export default HeroCarousel;
