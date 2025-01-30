// import css from "./CatalogHeaderMob.module.css";

import BreadcrumbsMob from "./BreadcrumbsMob/BreadcrumbsMob";
import CatalogTitleMob from "./CatalogTitleMob/CatalogTitleMob";
import ActiveFiltersMob from "./ControlsPanelMob/ActiveFiltersMob/ActiveFiltersMob";
import ControlsPanelMob from "./ControlsPanelMob/ControlsPanelMob";

const CatalogHeaderMob = ({
  selectedBrand,
  selectedSection,
  quantityFilter,
  sortType,
  toggleFilter,
  toggleSortingContent,
  handleRemoveBrand,
  handleRemoveSection,
}) => {
  return (
    <>
      <BreadcrumbsMob />
      <CatalogTitleMob
        selectedBrand={selectedBrand}
        selectedSection={selectedSection}
      />
      <ControlsPanelMob
        quantityFilter={quantityFilter}
        sortType={sortType}
        toggleFilter={toggleFilter}
        toggleSortingContent={toggleSortingContent}
      />
      <ActiveFiltersMob
        handleRemoveBrand={handleRemoveBrand}
        handleRemoveSection={handleRemoveSection}
        selectedBrand={selectedBrand}
        selectedSection={selectedSection}
      />
    </>
  );
};

export default CatalogHeaderMob;
