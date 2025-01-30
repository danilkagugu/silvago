import css from "./SortingPanel.module.css";

const SortingPanel = ({ sortType, handleSortChange }) => {
  return (
    <div className={css.catalogTopRight}>
      <div className={css.catalogControls}>
        <div className={css.catalogControlsItem}>
          <div className={css.catalogSorting}>
            <div className={css.catalogSortingTitle}>Сортування:</div>
            <div className={css.catalogSortingList}>
              <span
                className={`${css.catalogSortingItem} ${
                  sortType === "popularity" ? css.catalogSortingItemActive : ""
                }`}
                onClick={() => handleSortChange("popularity")}
              >
                за популярністю
              </span>
              <span
                className={`${css.catalogSortingItem} ${
                  sortType === "priceAsc" ? css.catalogSortingItemActive : ""
                }`}
                onClick={() => handleSortChange("priceAsc")}
              >
                спочатку дешевше
              </span>
              <span
                className={`${css.catalogSortingItem} ${
                  sortType === "name" ? css.catalogSortingItemActive : ""
                }`}
                onClick={() => handleSortChange("name")}
              >
                За назвою
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingPanel;
