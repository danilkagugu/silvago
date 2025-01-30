import BrandFilter from "./BrandFilter/BrandFilter";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import css from "./FilterPanel.module.css";
import SelectedFilters from "./SelectedFilters/SelectedFilters";
import SkinFilter from "./SkinFilter/SkinFilter";

const FilterPanel = ({
  selectedBrand,
  selectedSkin,
  selectedSection,
  clearFilter,
  currentCategory,
  categories,
  categorySlug,
  filterCountByBrand,
  filteredBrands,
  handleBrandSelect,
  availableFilters,
  filterCountBySkin,
  filters,
  handleSkinSelect,
  isSkinDisabled,
  filterCountBySection,
  handleSectionSelect,
}) => {
  return (
    <aside className={css.catalogSideBar}>
      <div className={css.catalogGroup}>
        <div className={css.filterContainer}>
          {(selectedBrand.length > 0 ||
            selectedSkin.length > 0 ||
            selectedSection.length > 0) && (
            <div className={css.filterSection}>
              <SelectedFilters
                clearFilter={clearFilter}
                selectedBrand={selectedBrand}
                selectedSection={selectedSection}
                selectedSkin={selectedSkin}
              />
            </div>
          )}
          <div className={css.filterSection}>
            <BrandFilter
              filterCountByBrand={filterCountByBrand}
              filteredBrands={filteredBrands}
              handleBrandSelect={handleBrandSelect}
              selectedBrand={selectedBrand}
              selectedSection={selectedSection}
            />
          </div>
          {currentCategory && currentCategory.name === "Обличчя" && (
            <div className={css.filterSection}>
              <SkinFilter
                availableFilters={availableFilters}
                filterCountBySkin={filterCountBySkin}
                filters={filters}
                handleSkinSelect={handleSkinSelect}
                isSkinDisabled={isSkinDisabled}
                selectedSkin={selectedSkin}
              />
            </div>
          )}
          {currentCategory && currentCategory.name !== "Догляд за обличчям" && (
            <div className={css.filterSection}>
              <CategoryFilter
                categories={categories}
                categorySlug={categorySlug}
                filterCountBySection={filterCountBySection}
                handleSectionSelect={handleSectionSelect}
                selectedSection={selectedSection}
                selectedBrand={selectedBrand}
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
