import css from "./SortingModal.module.css";

const SortingModal = ({ sortingOpen, sortType, handleSortChange }) => {
  return (
    <div className={`${css.backdrop} ${sortingOpen ? css.open : ""}`}>
      <div className={`${css.modalSortingBox} ${sortingOpen ? css.open : ""}`}>
        <div className={css.sortingWrapper}>
          <div className={css.sortingHeader}>
            <div className={css.sortingTitle}>Сортування</div>
          </div>
          <ul className={css.sortingList}>
            <li
              className={`${css.sortingListItem} ${
                sortType === "popularity" ? css.sortingActive : ""
              }`}
              onClick={() => handleSortChange("popularity")}
            >
              <div className={css.optionItem}>
                <div className={css.optionItemTitle}>За популярністю</div>
              </div>
            </li>
            <li
              className={`${css.sortingListItem} ${
                sortType === "priceAsc" ? css.sortingActive : ""
              }`}
              onClick={() => handleSortChange("priceAsc")}
            >
              <div className={css.optionItem}>
                <div className={css.optionItemTitle}>Спочатку дешевше</div>
              </div>
            </li>
            <li
              className={`${css.sortingListItem} ${
                sortType === "name" ? css.sortingActive : ""
              }`}
              onClick={() => handleSortChange("name")}
            >
              <div className={css.optionItem}>
                <div className={css.optionItemTitle}>За назвою</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SortingModal;
