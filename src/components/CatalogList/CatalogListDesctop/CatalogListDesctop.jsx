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
  categories,
  handleSectionSelect,
   
  setSelectedBrand,
  setSelectedSection,
  handlePriceSubmit,
  handleBrandSelect,
  // priceFilter,
  handlePageChange,
  brandsCount,
  categoriesCount,
  selectedPriceRange
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
            filterProduct={filterProduct}
            handlePageChange={handlePageChange}
          />
        </div>
        <div className={css.catalogContentMainLeft}>
          <FilterPanel
            clearFilter={clearFilter}
            categories={categories}
            handleSectionSelect={handleSectionSelect}
             
            selectedBrand={selectedBrand}
            selectedSection={selectedSection}
             
            setSelectedBrand={setSelectedBrand}
            setSelectedSection={setSelectedSection}
            handlePriceSubmit={handlePriceSubmit}
            handleBrandSelect={handleBrandSelect}
            // priceFilter={priceFilter}
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
