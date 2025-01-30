import FilterModal from "./FilterModal/FilterModal";
import SortingModal from "./SortingModal/SortingModal";

const FilterSortingModal = ({
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
  handleRemoveBrand,
  handleRemoveSection,
  handleSectionSelect,

  selectedBrand,
  selectedSection,
  sortedFilteredProducts,
  toggleCategory,
  toggleFilter,
  toggleFilterContent,
  handleSortChange,
  sortType,
  sortingOpen,
}) => {
  return (
    <>
      <FilterModal
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
      />
      <SortingModal
        handleSortChange={handleSortChange}
        sortType={sortType}
        sortingOpen={sortingOpen}
      />
    </>
  );
};

export default FilterSortingModal;
