import css from "./SelectedFilters.module.css";

const SelectedFilters = ({
  selectedBrand,
  selectedSection,
  clearFilter,
  // priceFilter,
}) => {
  return (
    <div className={css.filterCurrent}>
      {selectedBrand.length > 0 && (
        <div className={css.filterCurrentGroup}>
          <span className={css.filterCurrentTitle}>Бренд:</span>
          {selectedBrand.map((brand) => (
            <span className={css.filterCurrentBrand} key={brand.idTorgsoft}>
              {brand.name}
            </span>
          ))}
        </div>
      )}
      {selectedSection.length > 0 && (
        <div className={css.filterCurrentGroup}>
          <span className={css.filterCurrentTitle}>Розділ:</span>
          {selectedSection.map((category) => (
            <span className={css.filterCurrentBrand} key={category.idTorgsoft}>
              {category.name}
            </span>
          ))}
        </div>
      )}
      {/* {priceFilter && (
        <div className={css.filterCurrentGroup}>
          <span className={css.filterCurrentTitle}>Ціна, грн:</span>
          <span
            className={css.filterCurrentBrand}
          >{`${priceFilter[0]} - ${priceFilter[1]}`}</span>
        </div>
      )} */}
      <p className={css.filterClear} onClick={clearFilter}>
        Очистити фільтр
      </p>
    </div>
  );
};

export default SelectedFilters;
