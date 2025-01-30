import { IoMdCheckmark } from "react-icons/io";
import css from "./CategoryFilter.module.css";

const CategoryFilter = ({
  isSectionDisabled,
  handleSectionSelect,
  selectedSection,
  filterCountBySection,
  categories,
  categorySlug,
  selectedBrand,
}) => {
  const renderCategories = (categories, currentCategorySlug) => {
    const currentCategory = categories.find(
      (category) => category.slug === currentCategorySlug
    );

    if (!currentCategory || !currentCategory.children?.length) {
      return null;
    }

    const flatCategories = [];

    const flattenCategories = (children) => {
      children.forEach((child) => {
        flatCategories.push(child);
        if (child.children?.length > 0) {
          flattenCategories(child.children);
        }
      });
    };

    flattenCategories(currentCategory.children);
    // console.log("flatCategories: ", flatCategories);
    return flatCategories.map((category) => {
      const isSelected = selectedSection.some(
        (selected) => selected.name === category.name
      );
      const isDisabled =
        filterCountBySection(category?.name, selectedBrand) === 0;

      const itemClass = `${css.filterBrandItem} ${
        isDisabled ? css.disabledBrandItem : ""
      }`;
      const checkboxClass = `${css.checkbox} ${
        isSelected ? css.activeCheck : ""
      }`;
      return (
        <li
          key={category._id}
          id={category._id}
          className={itemClass}
          onClick={() => handleSectionSelect(category)}
        >
          <div className={css.filterCheck}>
            <span className={css.label}>
              <span className={checkboxClass}>
                {isSelected && <IoMdCheckmark className={css.iconChek} />}
              </span>
              <span className={css.filterBrandTitle}>{category?.name}</span>
              <sup className={css.filterCount}>
                {filterCountBySection(category?.name, selectedBrand)}
              </sup>
            </span>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <div className={css.filterSectionTitle}>Розділ</div>
      <div className={css.filterList}>
        <ul className={css.filterBrandList}>
          {renderCategories(categories, categorySlug)}
        </ul>
      </div>
    </>
  );
};

export default CategoryFilter;
