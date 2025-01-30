import { IoIosClose } from "react-icons/io";
import css from "./ActiveFiltersMob.module.css";

const ActiveFiltersMob = ({
  selectedBrand,
  selectedSection,
  handleRemoveBrand,
  handleRemoveSection,
}) => {
  return (
    <>
      {(selectedBrand.length > 0 || selectedSection.length > 0) && (
        <div className={css.filterPanelActiveFilters}>
          {selectedBrand.length > 0 && (
            <div className={css.activeFiltersList}>
              <div className={css.activeFiltersItem}>
                <div className={css.activeFiltersHeading}>Бренд</div>
              </div>

              {selectedBrand &&
                selectedBrand.map((item, i) => (
                  <div className={css.activeFiltersItem} key={i}>
                    <span className={css.activeBrandItem}>
                      <span className={css.activeText}>{item}</span>
                      <span
                        className={css.iconFilterBrand}
                        onClick={() => handleRemoveBrand(item)}
                      >
                        <IoIosClose className={css.iconFilterDel} />
                      </span>
                    </span>
                  </div>
                ))}
            </div>
          )}
          {selectedSection.length > 0 && (
            <div className={css.activeFiltersList}>
              <div className={css.activeFiltersItem}>
                <div className={css.activeFiltersHeading}>Розділ</div>
              </div>

              {selectedSection &&
                selectedSection.map((item, i) => (
                  <div className={css.activeFiltersItem} key={i}>
                    <span className={css.activeBrandItem}>
                      <span className={css.activeText}>{item}</span>
                      <span
                        className={css.iconFilterBrand}
                        onClick={() => handleRemoveSection(item)}
                      >
                        <IoIosClose className={css.iconFilterDel} />
                      </span>
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ActiveFiltersMob;
