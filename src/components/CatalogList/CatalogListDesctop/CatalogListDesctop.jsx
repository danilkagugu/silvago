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
  filterCountBySection,
  handleSectionSelect,
  maxPrice,
  minPrice,
  rangeValues,
  setRangeValues,
  setSelectedBrand,
  setSelectedSection,
  onSubmit,
  handleBrandSelect,
  priceFilter,
  handlePageChange,
  brandsCount
}) => {
  return (
    <>
      <CatalogHeader
        handleSortChange={handleSortChange}
        selectedBrand={selectedBrand}
        selectedSection={selectedSection}
        sortType={sortType}
        rangeValues={rangeValues}
        priceFilter={priceFilter}
      />
      <div className={css.catalogContentMain}>
        <div
          className={`${css.catalogContentMainRight} ${css.catalogListProduct}`}
        >
          <ProductList
            defaultProductVariations={defaultProductVariations}
            filterProduct={filterProduct}
            onPageChange={handlePageChange}
          />
        </div>
        <div className={css.catalogContentMainLeft}>
          <FilterPanel
            clearFilter={clearFilter}
            categories={categories}
            filterCountBySection={filterCountBySection}
            handleSectionSelect={handleSectionSelect}
            maxPrice={maxPrice}
            minPrice={minPrice}
            selectedBrand={selectedBrand}
            selectedSection={selectedSection}
            rangeValues={rangeValues}
            setRangeValues={setRangeValues}
            setSelectedBrand={setSelectedBrand}
            setSelectedSection={setSelectedSection}
            onSubmit={onSubmit}
            handleBrandSelect={handleBrandSelect}
            priceFilter={priceFilter}
            brandsCount={brandsCount}
            filterProduct={filterProduct}
          />
        </div>
      </div>
    </>
  );
};

export default CatalogListDesctop;
