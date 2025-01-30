import { IoMdCheckmark } from "react-icons/io";
import css from "./SkinFilter.module.css";

const SkinFilter = ({
  filters,
  availableFilters,
  selectedSkin,
  isSkinDisabled,
  handleSkinSelect,
  filterCountBySkin,
}) => {
  const renderFilters = () => {
    if (!filters?.length) return null;
    return filters.flatMap((filter) => {
      return filter.options
        .filter((option) => availableFilters.includes(option.name)) // Показуємо лише доступні фільтри
        .map((item) => {
          const isSelected = selectedSkin.includes(item.name);
          const itemClass = `${css.filterBrandItem} ${
            isSkinDisabled(item.name) ? css.disabledBrandItem : ""
          }`;
          const checkboxClass = `${css.checkbox} ${
            isSelected ? css.activeCheck : ""
          }`;
          return (
            <li
              className={itemClass}
              key={item._id}
              onClick={() => handleSkinSelect(item.name)}
            >
              <div className={css.filterCheck}>
                <span className={css.label}>
                  <span className={checkboxClass}>
                    {isSelected && <IoMdCheckmark className={css.iconChek} />}
                  </span>
                  <span className={css.filterBrandTitle}>{item.name}</span>
                  <sup className={css.filterCount}>
                    {filterCountBySkin(item.name)}
                  </sup>
                </span>
              </div>
            </li>
          );
        });
    });
  };

  return (
    <>
      <div className={css.filterSectionTitle}>Потреби шкіри</div>
      <div className={css.filterList}>
        <ul className={css.filterBrandList}>{renderFilters()}</ul>
      </div>
    </>
  );
};

export default SkinFilter;
