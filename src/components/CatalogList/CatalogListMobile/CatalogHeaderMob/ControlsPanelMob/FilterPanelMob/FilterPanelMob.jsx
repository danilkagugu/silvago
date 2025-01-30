import { CiFilter } from "react-icons/ci";
import css from "./FilterPanelMob.module.css";

const FilterPanelMob = ({ toggleFilter, quantityFilter }) => {
  return (
    <div
      className={`${css.catalogControlsItemMob} ${css.catalogControlsItemFilter}`}
    >
      <button
        // ref={filterModalRef}
        className={css.btnFilter}
        onClick={toggleFilter}
      >
        <span className={css.btnIcon}>
          <CiFilter className={css.iconFilter} />
        </span>
        <span className={css.btnText}>Фільтр</span>
      </button>

      {quantityFilter > 0 && (
        <span className={css.filterCount}>
          <span className={css.badge}>{quantityFilter}</span>
        </span>
      )}
    </div>
  );
};

export default FilterPanelMob;
