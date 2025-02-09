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
  maxPrice,
  minPrice,
  rangeValues,
  setRangeValues,
  // setSelectedBrand,
  // setSelectedSection,
  handlePriceSubmit,
  handleBrandSelect,
  // priceFilter,
  brandsCount,
  categoriesCount,
  filterProduct,
}) => {
  return (
    <aside className={css.catalogSideBar}>
      <div className={css.catalogGroup}>
        {(selectedBrand.length > 0 || selectedSection.length > 0) && (
          <div className={css.filterSection}>
            <SelectedFilters
              clearFilter={clearFilter}
              selectedBrand={selectedBrand}
              selectedSection={selectedSection}
              // priceFilter={priceFilter}
              rangeValues={rangeValues}
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
            maxPrice={maxPrice}
            minPrice={minPrice}
            rangeValues={rangeValues}
            setRangeValues={setRangeValues}
            handlePriceSubmit={handlePriceSubmit}
            filterProduct={filterProduct}
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
