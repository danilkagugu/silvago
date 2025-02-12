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
  return (
    <aside className={css.catalogSideBar}>
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
