import CatalogHeaderMob from "./CatalogHeaderMob/CatalogHeaderMob";
import FilterSortingModal from "./FilterSortingModal/FilterSortingModal";
import ProductListMob from "./ProductListMob/ProductListMob";

const CatalogListMobile = ({
  selectedBrand,
  selectedSection,
  quantityFilter,
  sortType,
  toggleFilter,
  toggleSortingContent,
  handleRemoveBrand,
  handleRemoveSection,
  defaultProductVariations,
  sortedFilteredProducts,
  brandsTorgsoft,
  categories,
  categoryContentOpen,
  clearFilter,
  filterContentOpen,
  filterCountByBrand,
  filterCountBySection,
  filterOpen,
  getProductLabel,
  handleBrandSelect,
  handleSectionSelect,

  toggleCategory,
  toggleFilterContent,
  handleSortChange,
  sortingOpen,
}) => {
  return (
    <>
      <CatalogHeaderMob
        selectedBrand={selectedBrand}
        selectedSection={selectedSection}
        quantityFilter={quantityFilter}
        sortType={sortType}
        toggleFilter={toggleFilter}
        toggleSortingContent={toggleSortingContent}
        handleRemoveBrand={handleRemoveBrand}
        handleRemoveSection={handleRemoveSection}
      />
      <ProductListMob
        defaultProductVariations={defaultProductVariations}
        sortedFilteredProducts={sortedFilteredProducts}
      />

      <FilterSortingModal
        brandsTorgsoft={brandsTorgsoft}
        categories={categories}
        categoryContentOpen={categoryContentOpen}
        clearFilter={clearFilter}
        filterContentOpen={filterContentOpen}
        filterCountByBrand={filterCountByBrand}
        filterCountBySection={filterCountBySection}
        filterOpen={filterOpen}
        getProductLabel={getProductLabel}
        handleBrandSelect={handleBrandSelect}
        handleRemoveBrand={handleRemoveBrand}
        handleRemoveSection={handleRemoveSection}
        handleSectionSelect={handleSectionSelect}
        selectedBrand={selectedBrand}
        selectedSection={selectedSection}
        sortedFilteredProducts={sortedFilteredProducts}
        toggleCategory={toggleCategory}
        toggleFilter={toggleFilter}
        toggleFilterContent={toggleFilterContent}
        handleSortChange={handleSortChange}
        sortType={sortType}
        sortingOpen={sortingOpen}
      />
    </>
  );
};

export default CatalogListMobile;
