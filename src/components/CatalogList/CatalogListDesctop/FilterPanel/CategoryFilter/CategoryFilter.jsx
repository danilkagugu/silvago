import { IoMdCheckmark } from "react-icons/io";
import css from "./CategoryFilter.module.css";
const CategoryFilter = ({
  selectedSection,
  handleSectionSelect,
  categoriesCount
}) => {
  

  const renderCategories = () => {
    // console.log('categoriesFilter: ', categories);
// console.log('selectedSection,selectedSection',selectedSection);
    if (!categoriesCount?.length) return null;
    // console.log('categoriesCount: ', categoriesCount);
     

    // flattenCategories(categories);

    return categoriesCount.map((category) => {
      const isSelected = selectedSection.some(
        (selected) => selected.idTorgsoft === category.idTorgsoft
      );
      const isDisabled =
      category.count === 0;

      const itemClass = `${css.filterBrandItem} ${
        isDisabled ? css.disabledBrandItem : ""
      }`;
      const checkboxClass = `${css.checkbox} ${
        isSelected ? css.activeCheck : ""
      }`;
      return (
        <li
          key={category.idTorgsoft}
          id={category.idTorgsoft}
          className={itemClass}
          onClick={() => !isDisabled && handleSectionSelect(category)}
        >
          <div className={css.filterCheck}>
            <span className={css.label}>
              <span className={checkboxClass}>
                {isSelected && <IoMdCheckmark className={css.iconChek} />}
              </span>
              <span className={css.filterBrandTitle}>{category?.name}</span>
              <sup className={css.filterCount}>
                {category.count}
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
        <ul className={css.filterBrandList}>{renderCategories()}</ul>
      </div>
    </>
  );
};

export default CategoryFilter;
