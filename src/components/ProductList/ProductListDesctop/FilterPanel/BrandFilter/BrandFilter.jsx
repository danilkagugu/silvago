import { IoMdCheckmark } from "react-icons/io";
import css from "./BrandFilter.module.css";

const BrandFilter = ({
  filteredBrands,
  selectedBrand,
  handleBrandSelect,
  filterCountByBrand,
  selectedSection,
}) => {
  const renderBrands = () => {
    if (!filteredBrands?.length) return null; // Перевірка наявності даних

    return filteredBrands.map((brand) => {
      const isSelected = selectedBrand.some(
        (selected) => selected.name === brand.name
      );
      const isDisabled = filterCountByBrand(brand.name, selectedSection) === 0;

      const itemClass = `${css.filterBrandItem} ${
        isDisabled ? css.disabledBrandItem : ""
      }`;
      const checkboxClass = `${css.checkbox} ${
        isSelected ? css.activeCheck : ""
      }`;

      return (
        <li
          className={itemClass}
          key={brand._id}
          onClick={() => handleBrandSelect(brand)}
        >
          <div className={css.filterCheck}>
            <span className={css.label}>
              <span className={checkboxClass}>
                {isSelected && <IoMdCheckmark className={css.iconChek} />}
              </span>
              <span className={css.filterBrandTitle}>{brand.name}</span>
              <sup className={css.filterCount}>
                {filterCountByBrand(brand.name, selectedSection)}
              </sup>
            </span>
          </div>
        </li>
      );
    });
  };
  return (
    <>
      <div className={css.filterSectionTitle}>Бренд</div>
      <div className={css.filterList}>
        <ul className={css.filterBrandList}>{renderBrands()}</ul>
      </div>
    </>
  );
};

export default BrandFilter;
