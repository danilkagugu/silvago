import css from "./SelectedFilters.module.css";

const SelectedFilters = ({
  selectedBrand,
  selectedSkin,
  selectedSection,
  clearFilter,
}) => {
  return (
    <div className={css.filterCurrent}>
      {selectedBrand.length > 0 && (
        <div className={css.filterCurrentGroup}>
          <span className={css.filterCurrentTitle}>Бренд:</span>
          {selectedBrand.map((brand) => (
            <span className={css.filterCurrentBrand} key={brand.numberId}>
              {brand.name}
            </span>
          ))}
        </div>
      )}
      {selectedSkin.length > 0 && (
        <div className={css.filterCurrentGroup}>
          <span className={css.filterCurrentTitle}>Потреби шкіри:</span>
          <span className={css.filterCurrentBrand}>
            {selectedSkin.join(", ")}
          </span>
        </div>
      )}
      {selectedSection.length > 0 && (
        <div className={css.filterCurrentGroup}>
          <span className={css.filterCurrentTitle}>Розділ:</span>
          {selectedSection.map((category) => (
            <span className={css.filterCurrentBrand} key={category._id}>
              {category.name}
            </span>
          ))}
        </div>
      )}
      <p className={css.filterClear} onClick={clearFilter}>
        Очистити фільтр
      </p>
    </div>
  );
};

export default SelectedFilters;
