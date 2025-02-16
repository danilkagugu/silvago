import css from "./CatalogListDesctop.module.css";
import CatalogHeader from "./CatalogHeader/CatalogHeader";
import FilterPanel from "./FilterPanel/FilterPanel";
import ProductList from "./ProductList/ProductList";

const CatalogListDesctop = ({
  handleSortChange,
  selectedBrand,
  selectedSection,
  sortType,
  filterProduct,
  clearFilter,
  handleSectionSelect,
  handlePriceSubmit,
  handlePriceClear,
  handleBrandSelect,
  handlePageChange,
  brandsCount,
  categoriesCount,
  selectedPriceRange,
  categorySlug,
  categories,
  query,
}) => {
  return (
    <>
      <CatalogHeader
        handleSortChange={handleSortChange}
        selectedBrand={selectedBrand}
        selectedSection={selectedSection}
        sortType={sortType}
        selectedPriceRange={selectedPriceRange}
        categorySlug={categorySlug}
        categories={categories}
        query={query}
      />
      <div className={css.catalogContentMain}>
        <div
          className={`${css.catalogContentMainRight} ${css.catalogListProduct}`}
        >
          <ProductList
            filterProduct={filterProduct}
            handlePageChange={handlePageChange}
          />
        </div>
        <div className={css.catalogContentMainLeft}>
          <FilterPanel
            clearFilter={clearFilter}
            handleSectionSelect={handleSectionSelect}
            selectedBrand={selectedBrand}
            selectedSection={selectedSection}
            handlePriceSubmit={handlePriceSubmit}
            handlePriceClear={handlePriceClear}
            handleBrandSelect={handleBrandSelect}
            brandsCount={brandsCount}
            categoriesCount={categoriesCount}
            filterProduct={filterProduct}
            selectedPriceRange={selectedPriceRange}
          />
        </div>
      </div>
    </>
  );
};

export default CatalogListDesctop;
