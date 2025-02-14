// import { useEffect, useRef, useState } from "react";
import BrandFilter from "./BrandFilter/BrandFilter";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import css from "./FilterPanel.module.css";
import PriceFilter from "./PriceFilter/PriceFilter";
import SelectedFilters from "./SelectedFilters/SelectedFilters";

const FilterPanel = ({
  clearFilter,
  selectedBrand,
  handleSectionSelect,
  selectedSection,
  handlePriceSubmit,
  handlePriceClear,
  handleBrandSelect,
  brandsCount,
  categoriesCount,
  filterProduct,
  selectedPriceRange,
}) => {
  // const sidebarRef = useRef(null);
  // const [isFixed, setIsFixed] = useState(false);
  // const [translateY, setTranslateY] = useState(0);
  // const [maxTranslateY, setMaxTranslateY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!sidebarRef.current) return;

  //     const sidebar = sidebarRef.current;
  //     const footer = document.getElementById("footer");
  //     console.log("footer: ", footer);
  //     if (!footer) return;

  //     const sidebarRect = sidebar.getBoundingClientRect();
  //     const footerRect = footer.getBoundingClientRect();
  //     const windowHeight = window.innerHeight;
  //     const scrollY = window.scrollY;
  //     const sidebarTop = sidebar.offsetTop;

  //     // Знаходимо точку, коли sidebar має почати "опускатися"
  //     const stopScrollY =
  //       document.body.scrollHeight - windowHeight - footer.offsetHeight;

  //     if (scrollY > sidebarTop && footerRect.top > windowHeight) {
  //       setIsFixed(true);
  //       setTranslateY(0);
  //     } else if (footerRect.top <= windowHeight) {
  //       setIsFixed(false);
  //       setTranslateY(Math.max(0, scrollY - stopScrollY + 20)); // Плавне опускання
  //     } else {
  //       setIsFixed(false);
  //       setTranslateY(0);
  //     }

  //     setMaxTranslateY(stopScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <aside
      // ref={sidebarRef}
      className={css.catalogSideBar}
      // style={{
      //   position: isFixed ? "fixed" : "relative",
      //   top: isFixed ? "20px" : "auto",
      //   left: isFixed ? "30px" : "auto",
      //   width: isFixed ? "220px" : "auto",
      //   transform: `translate3d(0, ${translateY}px, 0)`,
      //   transition: "transform 0.3s ease-out",
      // }}
    >
      <div className={css.catalogGroup}>
        {(selectedBrand.length > 0 ||
          selectedSection.length > 0 ||
          (selectedPriceRange?.minPrice && selectedPriceRange?.maxPrice)) && (
          <div className={css.filterSection}>
            <SelectedFilters
              clearFilter={clearFilter}
              selectedBrand={selectedBrand}
              selectedSection={selectedSection}
              selectedPriceRange={selectedPriceRange}
              handleBrandSelect={handleBrandSelect}
              handleSectionSelect={handleSectionSelect}
              handlePriceClear={handlePriceClear}
            />
          </div>
        )}
        <div className={css.filterSection}>
          <BrandFilter
            selectedBrand={selectedBrand}
            handleBrandSelect={handleBrandSelect}
            brandsCount={brandsCount}
          />
        </div>

        <div className={css.filterSection}>
          <CategoryFilter
            selectedSection={selectedSection}
            handleSectionSelect={handleSectionSelect}
            categoriesCount={categoriesCount}
          />
        </div>
        <div className={css.filterSection}>
          <PriceFilter
            handlePriceSubmit={handlePriceSubmit}
            filterProduct={filterProduct}
            selectedPriceRange={selectedPriceRange}
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
