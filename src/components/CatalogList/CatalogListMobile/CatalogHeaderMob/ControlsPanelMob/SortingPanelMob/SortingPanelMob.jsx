import { TbArrowsSort } from "react-icons/tb";
import css from "./SortingPanelMob.module.css";

const SortingPanelMob = ({ toggleSortingContent, sortType }) => {
  return (
    <div className={`${css.catalogControlsItemMob}`}>
      <button
        // ref={sortingModalRef}
        className={css.btnFilter}
        onClick={toggleSortingContent}
      >
        <span className={css.btnIconSort}>
          <TbArrowsSort className={css.iconFilter} />
        </span>
        <span className={css.btnText}>
          {sortType === "popularity"
            ? "За популярністю"
            : sortType === "priceAsc"
            ? "Спочатку дешевше"
            : "За назвою"}
        </span>
      </button>
    </div>
  );
};

export default SortingPanelMob;
