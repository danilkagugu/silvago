import { IoMdCheckmark } from "react-icons/io";
import css from "./CategoryFilter.module.css";
const CategoryFilter = ({
  categories,
  selectedSection,
  filterCountBySection,
  selectedBrand,
  handleSectionSelect,
}) => {
  

  const renderCategories = (categories) => {
    // console.log('categoriesFilter: ', categories);
    const flatCategories = [];

    const flattenCategories = (categories) => {
      categories.forEach((category) => {
        flatCategories.push(category);
        if (category.children?.length > 0) {
          flattenCategories(category.children);
        }
      });
    };

    flattenCategories(categories);

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
        <ul className={css.filterBrandList}>{renderCategories(categories)}</ul>
      </div>
    </>
  );
};

export default CategoryFilter;
