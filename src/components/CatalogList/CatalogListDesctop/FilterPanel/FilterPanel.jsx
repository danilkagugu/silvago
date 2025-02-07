import BrandFilter from "./BrandFilter/BrandFilter";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import css from "./FilterPanel.module.css";
import PriceFilter from "./PriceFilter/PriceFilter";
import SelectedFilters from "./SelectedFilters/SelectedFilters";

const FilterPanel = ({
  clearFilter,
  selectedBrand,
  categories,
  filterCountBySection,
  handleSectionSelect,
  selectedSection,
  maxPrice,
  minPrice,
  rangeValues,
  setRangeValues,
  setSelectedBrand,
  setSelectedSection,
  onSubmit,
  handleBrandSelect,
  priceFilter,
  brandsCount,filterProduct
}) => {
  return (
    <aside className={css.catalogSideBar}>
      <div className={css.catalogGroup}>
        {(selectedBrand.length > 0 ||
          selectedSection.length > 0 ||
          priceFilter !== null) && (
          <div className={css.filterSection}>
            <SelectedFilters
              clearFilter={clearFilter}
              selectedBrand={selectedBrand}
              selectedSection={selectedSection}
              priceFilter={priceFilter}
              rangeValues={rangeValues}
            />
          </div>
        )}
        <div className={css.filterSection}>
          <BrandFilter
            selectedBrand={selectedBrand}
            selectedSection={selectedSection}
            setSelectedBrand={setSelectedBrand}
            handleBrandSelect={handleBrandSelect}
            brandsCount={brandsCount}
          />
        </div>

        <div className={css.filterSection}>
          <CategoryFilter
            categories={categories}
            filterCountBySection={filterCountBySection}
            handleSectionSelect={handleSectionSelect}
            selectedBrand={selectedBrand}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        </div>
        <div className={css.filterSection}>
          <PriceFilter
            maxPrice={maxPrice}
            minPrice={minPrice}
            rangeValues={rangeValues}
            setRangeValues={setRangeValues}
            onSubmit={onSubmit}
            filterProduct={filterProduct}
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
