import css from "./CatalogListDesctop.module.css";
import CatalogHeader from "./CatalogHeader/CatalogHeader";
import FilterPanel from "./FilterPanel/FilterPanel";
import ProductList from "./ProductList/ProductList";

const CatalogListDesctop = ({
  handleSortChange,
  selectedBrand,
  selectedSection,
  sortType,
  defaultProductVariations,
  filterProduct,
  clearFilter,
  categories,
  handleSectionSelect,
  maxPrice,
  minPrice,
  rangeValues,
  setRangeValues,
  setSelectedBrand,
  setSelectedSection,
  handlePriceSubmit,
  handleBrandSelect,
  // priceFilter,
  handlePageChange,
  brandsCount,
  categoriesCount
}) => {
  return (
    <>
      <CatalogHeader
        handleSortChange={handleSortChange}
        selectedBrand={selectedBrand}
        selectedSection={selectedSection}
        sortType={sortType}
        // rangeValues={rangeValues}
        // priceFilter={priceFilter}
      />
      <div className={css.catalogContentMain}>
        <div
          className={`${css.catalogContentMainRight} ${css.catalogListProduct}`}
        >
          <ProductList
            defaultProductVariations={defaultProductVariations}
            filterProduct={filterProduct}
            handlePageChange={handlePageChange}
          />
        </div>
        <div className={css.catalogContentMainLeft}>
          <FilterPanel
            clearFilter={clearFilter}
            categories={categories}
            handleSectionSelect={handleSectionSelect}
            maxPrice={maxPrice}
            minPrice={minPrice}
            selectedBrand={selectedBrand}
            selectedSection={selectedSection}
            rangeValues={rangeValues}
            setRangeValues={setRangeValues}
            setSelectedBrand={setSelectedBrand}
            setSelectedSection={setSelectedSection}
            handlePriceSubmit={handlePriceSubmit}
            handleBrandSelect={handleBrandSelect}
            // priceFilter={priceFilter}
            brandsCount={brandsCount}
            categoriesCount={categoriesCount}
            filterProduct={filterProduct}
          />
        </div>
      </div>
    </>
  );
};

export default CatalogListDesctop;
