import CatalogHeader from "./CatalogHeader/CatalogHeader";
import CatalogList from "./CatalogList/CatalogList";
import FilterPanel from "./FilterPanel/FilterPanel";
import css from "./ProductListDesctop.module.css";

const ProductListDesctop = ({
  categorySlug,
  childCategorySlug,
  currentCategory,
  currentChildSubCategory,
  currentSubCategory,
  getCategoryName,
  getChildSubCategoryName,
  getSubCategoryName,
  subCategorySlug,
  handleSortChange,
  sortType,
  sortedFilteredProducts,
  defaultProductVariations,
  totalPages,
  currentPage,
  handlePageChange,
  selectedBrand,
  selectedSkin,
  selectedSection,
  clearFilter,
  categories,
  filterCountByBrand,
  filteredBrands,
  handleBrandSelect,
  isBrandDisabled,
  availableFilters,
  filterCountBySkin,
  filters,
  handleSkinSelect,
  isSkinDisabled,
  filterCountBySection,
  handleSectionSelect,
  isSectionDisabled,
}) => {
  return (
    <>
      <CatalogHeader
        categorySlug={categorySlug}
        childCategorySlug={childCategorySlug}
        currentCategory={currentCategory}
        currentChildSubCategory={currentChildSubCategory}
        currentSubCategory={currentSubCategory}
        getCategoryName={getCategoryName}
        getChildSubCategoryName={getChildSubCategoryName}
        getSubCategoryName={getSubCategoryName}
        subCategorySlug={subCategorySlug}
        handleSortChange={handleSortChange}
        sortType={sortType}
      />
      <div className={css.catalogContentMain}>
        <div
          className={`${css.catalogContentMainRight} ${css.CatalogListProduct}`}
        >
          <CatalogList
            currentPage={currentPage}
            defaultProductVariations={defaultProductVariations}
            handlePageChange={handlePageChange}
            sortedFilteredProducts={sortedFilteredProducts}
            totalPages={totalPages}
          />
        </div>
        <div className={css.catalogContentMainLeft}>
          <FilterPanel
            availableFilters={availableFilters}
            categories={categories}
            categorySlug={categorySlug}
            clearFilter={clearFilter}
            currentCategory={currentCategory}
            filterCountByBrand={filterCountByBrand}
            filterCountBySection={filterCountBySection}
            filterCountBySkin={filterCountBySkin}
            filteredBrands={filteredBrands}
            filters={filters}
            handleBrandSelect={handleBrandSelect}
            handleSectionSelect={handleSectionSelect}
            handleSkinSelect={handleSkinSelect}
            isBrandDisabled={isBrandDisabled}
            isSectionDisabled={isSectionDisabled}
            isSkinDisabled={isSkinDisabled}
            selectedBrand={selectedBrand}
            selectedSection={selectedSection}
            selectedSkin={selectedSkin}
          />
        </div>
      </div>
    </>
  );
};

export default ProductListDesctop;
