import { Link } from "react-router-dom";
import css from "./BreadcrumbsCatalog.module.css";
import { IoChevronForward } from "react-icons/io5";

const BreadcrumbsCatalog = ({
  currentCategory,
  getCategoryName,
  categorySlug,
  currentSubCategory,
  getSubCategoryName,
  subCategorySlug,
  currentChildSubCategory,
  getChildSubCategoryName,
  childCategorySlug,
}) => {
  return (
    <nav className={css.breadcrumbs}>
      <div className={css.productGroupMenuItem}>
        <Link to="/">Головна</Link>
        <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
      </div>
      <div className={css.productGroupMenuItem}>
        <Link to="/catalog">Каталог</Link>
      </div>
      {currentCategory && (
        <div className={css.productGroupMenuItem}>
          <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
          <Link className={css.navItem} to={`/catalog/${categorySlug}`}>
            {getCategoryName(categorySlug)}
          </Link>
        </div>
      )}
      {currentSubCategory && (
        <div className={css.productGroupMenuItem}>
          <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
          <Link to={`/catalog/${categorySlug}/${subCategorySlug}`}>
            {getSubCategoryName(currentCategory, subCategorySlug)}
          </Link>
        </div>
      )}
      {currentChildSubCategory && (
        <div className={css.productGroupMenuItem}>
          <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
          <Link
            to={`/catalog/${categorySlug}/${subCategorySlug}/${childCategorySlug}`}
          >
            {getChildSubCategoryName(currentSubCategory, childCategorySlug)}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default BreadcrumbsCatalog;
