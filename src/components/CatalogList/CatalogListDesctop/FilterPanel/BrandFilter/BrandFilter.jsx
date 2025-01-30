import { IoMdCheckmark } from "react-icons/io";
import css from "./BrandFilter.module.css";

const BrandFilter = ({
  brandsTorgsoft,
  selectedBrand,
  filterCountByBrand,
  selectedSection,
  setSelectedBrand,
  handleBrandSelect,
}) => {
  const handleBrandChange = (brand) => {
    // console.log("brand: ", brand);
    setSelectedBrand((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // console.log("brandsTorgsoft", brandsTorgsoft);
  const renderBrands = () => {
    if (!brandsTorgsoft?.length) return null; // Перевірка наявності даних

    return brandsTorgsoft.map((brand) => {
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
          onClick={() => {
            // console.log("Selected brand:", brand);
            handleBrandSelect(brand); // Переконайтеся, що передаєте тільки `brand.name`
          }}
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
