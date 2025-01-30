import css from "./ControlsPanelMob.module.css";
import FilterPanelMob from "./FilterPanelMob/FilterPanelMob";
import SortingPanelMob from "./SortingPanelMob/SortingPanelMob";

const ControlsPanelMob = ({
  quantityFilter,
  toggleFilter,
  sortType,
  toggleSortingContent,
}) => {
  return (
    <div className={css.controlsPanel}>
      <div className={css.catalogControls}>
        <FilterPanelMob
          quantityFilter={quantityFilter}
          toggleFilter={toggleFilter}
        />
        <SortingPanelMob
          sortType={sortType}
          toggleSortingContent={toggleSortingContent}
        />
      </div>
    </div>
  );
};

export default ControlsPanelMob;
