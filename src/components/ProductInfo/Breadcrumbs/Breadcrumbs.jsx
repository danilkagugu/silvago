import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import css from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ volume, product, categories, breadcrumbs }) => {
  // console.log("categories: ", categories);
  const currentCategory = categories?.find((cat) =>
    product.categories.includes(cat.name)
  );

  const currentSubCategory = currentCategory
    ? currentCategory.children.find((item) =>
        product.categories.includes(item.name)
      )
    : null;

  const currentChildSubCategory = currentSubCategory
    ? currentSubCategory.children.find((item) =>
        product.categories.includes(item.name)
      )
    : null;

  const getCategoryName = () => {
    const category = categories?.find((cat) =>
      product?.categories.includes(cat.name)
    );
    return category ? category.name : "";
  };

  const getSubCategoryName = () => {
    const subCategory = currentCategory?.children.find((item) =>
      product.categories.includes(item.name)
    );

    return subCategory ? subCategory.name : "";
  };

  const getChildSubCategoryName = () => {
    const childCategory = currentSubCategory?.children.find((item) =>
      product.categories.includes(item.name)
    );
    return childCategory ? childCategory.name : "";
  };

  return (
    <nav className={css.productGroupMenu}>
      {breadcrumbs.map((crumb, index) => (
        <div className={css.productGroupMenuItem} key={index}>
          {crumb.slug ? (
            <Link className={css.navItem} to={crumb.slug}>
              {crumb.name}
            </Link>
          ) : (
            <p className={css.itemText}>{crumb.name}</p>
          )}
          {index < breadcrumbs.length - 1 && (
            <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
