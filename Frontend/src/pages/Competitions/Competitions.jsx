import "./Competitions.css";
import VerticalMarquee from "/src/components/VerticalMarquee/VerticalMarquee.jsx";
import { useEffect, useRef, useState } from "react";
import { cultural_competitions } from "/src/data/competition_cultural.js";
import { tech_competitions } from "/src/data/competition_tech.js";
import { Helmet } from "react-helmet";

function Competitions() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCompetitionIndex, setActiveCompetitionIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const carouselRef = useRef(null);
  const mobileCarouselRef = useRef(null);
  const cardRefs = useRef([]);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter competitions by category
  const categories = {
    all: [...tech_competitions, ...cultural_competitions],
    tech: tech_competitions,
    cultural: cultural_competitions,
  };

  const currentCompetitions = categories[activeCategory] || [
    ...tech_competitions,
    ...cultural_competitions,
  ];
  const activeCompetition = currentCompetitions[activeCompetitionIndex];

  // Create infinite loop by tripling the array
  const infiniteCompetitions = [
    ...currentCompetitions,
    ...currentCompetitions,
    ...currentCompetitions,
  ];

  // Handle infinite scroll loop
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let indexUpdateTimeout = null;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollTop = carousel.scrollTop;
      const cardHeight = cardRefs.current[0]?.offsetHeight || 0;
      if (cardHeight === 0) return;

      const gap = 24; // 1.5rem = 24px
      const totalCardHeight = cardHeight + gap;
      const containerHeight = carousel.clientHeight;
      const offset = (containerHeight - cardHeight) / 2;

      const sectionHeight = currentCompetitions.length * totalCardHeight;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (indexUpdateTimeout) {
        clearTimeout(indexUpdateTimeout);
      }

      // Snap to nearest card after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        const adjustedScrollTop = scrollTop - offset;
        const targetIndex = Math.round(adjustedScrollTop / totalCardHeight);
        const snapPosition = targetIndex * totalCardHeight + offset;

        if (Math.abs(scrollTop - snapPosition) > 5) {
          carousel.scrollTo({
            top: snapPosition,
            behavior: "smooth",
          });
        }

        // Update active index after snap completes
        indexUpdateTimeout = setTimeout(() => {
          const finalScrollTop = carousel.scrollTop;
          const finalAdjustedScrollTop = finalScrollTop - offset;
          const newIndex =
            Math.round(finalAdjustedScrollTop / totalCardHeight) %
            currentCompetitions.length;
          const normalizedIndex =
            ((newIndex % currentCompetitions.length) +
              currentCompetitions.length) %
            currentCompetitions.length;

          if (normalizedIndex !== activeCompetitionIndex) {
            setActiveCompetitionIndex(normalizedIndex);
          }
        }, 100);
      }, 150);

      // Loop to middle section when reaching top or bottom
      if (scrollTop < sectionHeight * 0.5) {
        // Near top - jump to middle section
        isScrollingRef.current = true;
        carousel.scrollTop = scrollTop + sectionHeight;
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
      } else if (scrollTop > sectionHeight * 2.5) {
        // Near bottom - jump to middle section
        isScrollingRef.current = true;
        carousel.scrollTop = scrollTop - sectionHeight;
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
      }
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (indexUpdateTimeout) {
        clearTimeout(indexUpdateTimeout);
      }
    };
  }, [activeCompetitionIndex, currentCompetitions.length]);

  // Initialize scroll position to middle section (without animation)
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || currentCompetitions.length === 0) return;

    // Use setTimeout to ensure cards are rendered first
    const timer = setTimeout(() => {
      const cardHeight = cardRefs.current[0]?.offsetHeight || 0;
      if (cardHeight === 0) return;

      const gap = 24; // 1.5rem = 24px
      const totalCardHeight = cardHeight + gap;
      const sectionHeight = currentCompetitions.length * totalCardHeight;

      // Temporarily disable smooth scrolling
      const originalBehavior = carousel.style.scrollBehavior;
      carousel.style.scrollBehavior = "auto";

      // Calculate offset to center the first card with half cards visible above/below
      const containerHeight = carousel.clientHeight;
      const offset = (containerHeight - cardHeight) / 2;

      // Start at the middle section with centered first card
      carousel.scrollTop = sectionHeight + offset;

      // Restore smooth scrolling after a brief delay
      setTimeout(() => {
        carousel.style.scrollBehavior = originalBehavior;
      }, 50);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeCategory, currentCompetitions.length]);

  // Scroll to specific card
  const scrollToCard = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardHeight = cardRefs.current[0]?.offsetHeight || 0;
    const gap = 24; // 1.5rem = 24px
    const totalCardHeight = cardHeight + gap;
    const containerHeight = carousel.clientHeight;
    const offset = (containerHeight - cardHeight) / 2;
    const sectionHeight = currentCompetitions.length * totalCardHeight;

    // Always scroll to the middle section + the target index with centering offset
    const targetScroll = sectionHeight + index * totalCardHeight + offset;

    carousel.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });

    setActiveCompetitionIndex(index);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveCompetitionIndex(0);
  };

  // Handle arrow navigation with infinite loop
  const handleArrowClick = (direction) => {
    const newIndex =
      direction === "up"
        ? (activeCompetitionIndex - 1 + currentCompetitions.length) %
          currentCompetitions.length
        : (activeCompetitionIndex + 1) % currentCompetitions.length;

    if (isMobile) {
      // Mobile: scroll horizontally to the new card
      const mobileCarousel = mobileCarouselRef.current;
      if (mobileCarousel) {
        const cardWidth = mobileCarousel.offsetWidth;
        mobileCarousel.scrollTo({
          left: newIndex * cardWidth,
          behavior: "smooth",
        });
      }
      setActiveCompetitionIndex(newIndex);
    } else {
      // Desktop: use existing scrollToCard
      scrollToCard(newIndex);
    }
  };

  // Mobile version - simple card navigation
  if (isMobile) {
    return (
      <>
        <Helmet>
          <title>Elan&nVision | Competitions</title>
        </Helmet>
        <VerticalMarquee />
        <div className="competitions mobile">
          {/* Header Section */}
          <div className="competitions-header">
            <div className="competitions-title">Competitions</div>

            {/* Category Pills */}
            <div className="category-pills">
              <button
                className={activeCategory === "all" ? "pill active" : "pill"}
                onClick={() => handleCategoryChange("all")}
              >
                ALL
              </button>
              <button
                className={activeCategory === "tech" ? "pill active" : "pill"}
                onClick={() => handleCategoryChange("tech")}
              >
                TECH
              </button>
              <button
                className={
                  activeCategory === "cultural" ? "pill active" : "pill"
                }
                onClick={() => handleCategoryChange("cultural")}
              >
                CULTURAL
              </button>
            </div>
          </div>

          {/* Mobile Competition Cards - Scrollable */}
          <div className="mobile-competition-container">
            <div className="mobile-cards-wrapper" ref={mobileCarouselRef}>
              {currentCompetitions.map((competition, index) => (
                <div
                  key={index}
                  className={`mobile-competition-card ${
                    index === activeCompetitionIndex ? "active" : ""
                  }`}
                  onClick={() => setActiveCompetitionIndex(index)}
                >
                  {/* Competition Title First */}
                  <h1 className="competition-title">{competition?.name}</h1>

                  {/* Competition Image */}
                  <div className="mobile-card-image">
                    <img src={competition?.image} alt={competition?.name} />
                  </div>

                  {/* Competition Details */}
                  <div className="mobile-card-details">
                    <div className="competition-info-grid">
                      <div className="info-item">
                        <div className="info-label">CONTACT / POC</div>
                        <div className="info-value">
                          {competition?.contact || "TBA"}
                        </div>
                      </div>

                      <div className="info-item">
                        <div className="info-label">PRIZE POOL</div>
                        <div className="info-value">
                          {competition?.prizePool || "TBA"}
                        </div>
                      </div>

                      <div className="info-item">
                        <div className="info-label">REGISTRATION DEADLINE</div>
                        <div className="info-value">
                          {competition?.deadline || "TBA"}
                        </div>
                      </div>

                      <div className="info-item">
                        <div className="info-label">DATES / ROUNDS</div>
                        <div className="info-value">
                          {competition?.dates || "TBA"}
                        </div>
                      </div>
                    </div>

                    <div className="competition-description-section">
                      <div className="info-label">DESCRIPTION</div>
                      <p className="competition-description">
                        {competition?.description ||
                          "Choose a competition from the list to view details."}
                      </p>
                    </div>

                    {competition?.link && (
                      <a
                        href={competition.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="register-link"
                      >
                        <span className="register-text">Register Here</span>{" "}
                        <span className="arrow-icon">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="mobile-navigation">
              <button
                className="mobile-nav-btn prev"
                onClick={() => handleArrowClick("up")}
              >
                ←
              </button>
              <span className="mobile-counter">
                {activeCompetitionIndex + 1} / {currentCompetitions.length}
              </span>
              <button
                className="mobile-nav-btn next"
                onClick={() => handleArrowClick("down")}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop version (original code)

  return (
    <>
      <Helmet>
        <title>Elan&nVision | Competitions</title>
      </Helmet>
      <VerticalMarquee />
      <div className="competitions">
        {/* Header Section */}
        <div className="competitions-header">
          <div className="competitions-title">Competitions</div>

          {/* Category Pills */}
          <div className="category-pills">
            <button
              className={activeCategory === "all" ? "pill active" : "pill"}
              onClick={() => handleCategoryChange("all")}
            >
              ALL
            </button>
            <button
              className={activeCategory === "tech" ? "pill active" : "pill"}
              onClick={() => handleCategoryChange("tech")}
            >
              TECH
            </button>
            <button
              className={activeCategory === "cultural" ? "pill active" : "pill"}
              onClick={() => handleCategoryChange("cultural")}
            >
              CULTURAL
            </button>
          </div>
        </div>

        <div className="competitions-layout">
          {/* Left Side - Scrollable Card Carousel */}
          <div className="carousel-section">
            <div className="carousel-container" ref={carouselRef}>
              {infiniteCompetitions.map((competition, index) => {
                const actualIndex = index % currentCompetitions.length;
                const isActive =
                  actualIndex === activeCompetitionIndex &&
                  index >= currentCompetitions.length &&
                  index < currentCompetitions.length * 2;

                return (
                  <div
                    key={index}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className={`carousel-card ${isActive ? "active" : ""}`}
                    onClick={() => scrollToCard(actualIndex)}
                  >
                    <img
                      src={competition.image}
                      alt={competition.name}
                      draggable="false"
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                );
              })}
            </div>

            {/* Scroll indicators */}
            <div className="scroll-arrows">
              <button
                className="scroll-arrow-btn up"
                onClick={() => handleArrowClick("up")}
              >
                ↑
              </button>
              <button
                className="scroll-arrow-btn down"
                onClick={() => handleArrowClick("down")}
              >
                ↓
              </button>
            </div>
          </div>

          {/* Right Side - Competition Details */}
          <div className="details-section">
            <div
              className="competition-details-content"
              key={activeCompetition?.name}
            >
              <h1 className="competition-title">
                {activeCompetition?.name || "Select Competition"}
              </h1>

              <div className="competition-info-grid">
                <div className="info-item">
                  <div className="info-label">CONTACT / POC</div>
                  <div className="info-value">
                    {activeCompetition?.contact || "TBA"}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">PRIZE POOL</div>
                  <div className="info-value">
                    {activeCompetition?.prizePool || "TBA"}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">REGISTRATION DEADLINE</div>
                  <div className="info-value">
                    {activeCompetition?.deadline || "TBA"}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">DATES / ROUNDS</div>
                  <div className="info-value">
                    {activeCompetition?.dates || "TBA"}
                  </div>
                </div>
              </div>

              <div className="competition-description-section">
                <div className="info-label">DESCRIPTION</div>
                <p className="competition-description">
                  {activeCompetition?.description ||
                    "Choose a competition from the list to view details."}
                </p>
              </div>

              {activeCompetition?.link && (
                <a
                  href={activeCompetition.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="register-link"
                >
                  <span className="register-text">Register Here</span>{" "}
                  <span className="arrow-icon">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Competitions;
