import { IoCloseSharp } from "react-icons/io5";
import css from "./SelectedFilters.module.css";

const SelectedFilters = ({
  selectedBrand,
  selectedSection,
  clearFilter,
  // priceFilter,
  selectedPriceRange,
  handleBrandSelect,
  handleSectionSelect,
  handlePriceClear,
}) => {
  // console.log("selectedSection", selectedSection);
  return (
    <div className={css.filterCurrent}>
      {selectedBrand.length > 0 && (
        <div className={css.filterCurrentGroup}>
          <span className={css.filterCurrentTitle}>Бренд:</span>
          {selectedBrand.map((brand) => (
            <span
              className={css.filterCurrentBrand}
              key={brand.idTorgsoft}
              onClick={() => {
                console.log("Selected brand:", brand);
                handleBrandSelect(brand); // Переконайтеся, що передаєте тільки `brand.name`
              }}
            >
              <div className={css.filterCurrentBrandContent}>
                {brand.name}
                <IoCloseSharp className={css.filterCurrentBrandDelIcon} />
              </div>
            </span>
          ))}
        </div>
      )}
      {selectedSection.length > 0 && (
        <div className={css.filterCurrentGroup}>
          <span className={css.filterCurrentTitle}>Розділ:</span>
          {selectedSection.map((category) => (
            <span
              className={css.filterCurrentBrand}
              key={category.idTorgsoft}
              onClick={() => {
                // console.log("Selected brand:", category);
                handleSectionSelect(category);
              }}
            >
              <div className={css.filterCurrentBrandContent}>
                {category.name}
                <IoCloseSharp className={css.filterCurrentBrandDelIcon} />
              </div>
            </span>
          ))}
        </div>
      )}
      {selectedPriceRange?.minPrice !== undefined &&
        selectedPriceRange?.maxPrice !== undefined && (
          <div className={css.filterCurrentGroup}>
            <span className={css.filterCurrentTitle}>Ціна, грн:</span>
            <span className={css.filterCurrentBrand} onClick={handlePriceClear}>
              <div className={css.filterCurrentBrandContent}>
                {`${selectedPriceRange.minPrice} - ${selectedPriceRange.maxPrice}`}
                <IoCloseSharp className={css.filterCurrentBrandDelIcon} />
              </div>
            </span>

            {/* <span className={css.filterCurrentBrand}>
              {`${selectedPriceRange.minPrice} - ${selectedPriceRange.maxPrice}`}
            </span> */}
          </div>
        )}

      <p className={css.filterClear} onClick={clearFilter}>
        Очистити фільтр
      </p>
    </div>
  );
};

export default SelectedFilters;
