import BreadcrumbsCatalog from "./BreadcrumbsCatalog/BreadcrumbsCatalog";
import CatalogTitle from "./CatalogTitle/CatalogTitle";
import css from "./CatalogHeader.module.css";
import SortingPanel from "./SortingPanel/SortingPanel";

const CatalogHeader = ({
  selectedBrand,
  selectedSection,
  handleSortChange,
  sortType,
  selectedPriceRange,
  categorySlug,
  categories,
}) => {
  return (
    <>
      <div className={css.catalogHeader}>
        <BreadcrumbsCatalog
          categorySlug={categorySlug}
          categories={categories}
        />
      </div>
      <div className={css.catalogTopRows}>
        <CatalogTitle
          selectedBrand={selectedBrand}
          selectedSection={selectedSection}
          selectedPriceRange={selectedPriceRange}
        />
        <SortingPanel handleSortChange={handleSortChange} sortType={sortType} />
      </div>
    </>
  );
};

export default CatalogHeader;
