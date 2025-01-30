import css from "./CatalogHeader.module.css";

import BreadcrumbsCatalog from "./BreadcrumbsCatalog/BreadcrumbsCatalog";
import CatalogTitle from "./CatalogTitle/CatalogTitle";
import SortingPanel from "./SortingPanel/SortingPanel";

const CatalogHeader = ({
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
}) => {
  return (
    <>
      <BreadcrumbsCatalog
        categorySlug={categorySlug}
        childCategorySlug={childCategorySlug}
        currentCategory={currentCategory}
        currentChildSubCategory={currentChildSubCategory}
        currentSubCategory={currentSubCategory}
        getCategoryName={getCategoryName}
        getChildSubCategoryName={getChildSubCategoryName}
        getSubCategoryName={getSubCategoryName}
        subCategorySlug={subCategorySlug}
      />
      <div className={css.catalogTopRows}>
        <CatalogTitle currentCategory={currentCategory} />
        <SortingPanel handleSortChange={handleSortChange} sortType={sortType} />
      </div>
    </>
  );
};

export default CatalogHeader;
