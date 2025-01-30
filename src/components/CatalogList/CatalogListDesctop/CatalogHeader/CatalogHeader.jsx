import BreadcrumbsCatalog from "./BreadcrumbsCatalog/BreadcrumbsCatalog";
import CatalogTitle from "./CatalogTitle/CatalogTitle";
import css from "./CatalogHeader.module.css";
import SortingPanel from "./SortingPanel/SortingPanel";

const CatalogHeader = ({
  selectedBrand,
  selectedSection,
  handleSortChange,
  sortType,
  rangeValues,
  priceFilter,
}) => {
  return (
    <>
      <BreadcrumbsCatalog />
      <div className={css.catalogTopRows}>
        <CatalogTitle
          selectedBrand={selectedBrand}
          selectedSection={selectedSection}
          rangeValues={rangeValues}
          priceFilter={priceFilter}
        />
        <SortingPanel handleSortChange={handleSortChange} sortType={sortType} />
      </div>
    </>
  );
};

export default CatalogHeader;
