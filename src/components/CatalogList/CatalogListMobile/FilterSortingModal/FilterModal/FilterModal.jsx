import { IoChevronBackSharp, IoChevronDown } from "react-icons/io5";
import css from "./FilterModal.module.css";
import { IoIosClose, IoMdCheckmark } from "react-icons/io";

const FilterModal = ({
  filterOpen,
  toggleFilter,
  selectedBrand,
  selectedSection,
  // handleRemoveBrand,
  // handleRemoveSection,
  clearFilter,
  toggleFilterContent,
  filterContentOpen,
  brandsTorgsoft,

  handleBrandSelect,
  filterCountByBrand,
  toggleCategory,
  categoryContentOpen,
  categories,

  handleSectionSelect,
  filterCountBySection,
  getProductLabel,
  sortedFilteredProducts,
}) => {
  return (
    <div
      className={`${css.modalFilterBox} ${filterOpen ? css.filterOpen : ""}`}
    >
      <div
        className={`${css.modalFilterBoxWrapper} ${
          filterOpen ? css.filterOpen : ""
        }`}
      >
        <div className={css.filterPanelContainer}>
          <div className={css.filterPanelHeader}>
            <button className={css.btnBack} onClick={toggleFilter}>
              <IoChevronBackSharp />
            </button>
            <div className={css.titleFilter}>Фільтр</div>
          </div>
          {(selectedBrand.length > 0 || selectedSection.length > 0) && (
            <div className={css.filterPanelActiveFilters}>
              <span className={css.filterPanelHeading}>Ви обрали</span>
              {selectedBrand.length > 0 && (
                <div className={css.activeFilters}>
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
                              // onClick={() => handleRemoveBrand(item)}
                            >
                              <IoIosClose className={css.iconFilterDel} />
                            </span>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {selectedSection.length > 0 && (
                <div className={css.activeFilters}>
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
                              // onClick={() => handleRemoveSection(item)}
                            >
                              <IoIosClose className={css.iconFilterDel} />
                            </span>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <div className={css.resetBtn}>
                <button className={css.btnClear} onClick={clearFilter}>
                  Очистити всі фільтри
                </button>
              </div>
            </div>
          )}
          <div className={css.filterPanelMain}>
            <div className={css.mainViewport}>
              <div className={css.mainWrapper}>
                <div className={css.filterPanelContent}>
                  <div className={css.filter}>
                    {/* Бренди */}
                    <div className={`${css.filterGroup}`}>
                      <div
                        className={css.filterGroupHeader}
                        onClick={toggleFilterContent}
                      >
                        <div className={css.filterGroupTitle}>
                          <span>Бренд</span>
                          {selectedBrand.length > 0 && (
                            <span className={css.filterGroupBadge}>
                              {selectedBrand.length}
                            </span>
                          )}
                        </div>
                        <IoChevronDown
                          className={`${css.iconHeader} ${
                            filterContentOpen ? css.iconHeaderOpen : ""
                          }`}
                        />
                      </div>
                      <div
                        className={`${css.toogleContent} ${
                          filterContentOpen ? css.toogleContentOpen : ""
                        }`}
                      >
                        <div className={css.filterGroupContent}>
                          {brandsTorgsoft &&
                            brandsTorgsoft.map((brand) => (
                              <div
                                className={`${css.filterItem}
                                 
                                `}
                                key={brand._id}
                                onClick={() => handleBrandSelect(brand.name)}
                              >
                                <div className={css.filterItemDiv}>
                                  <div className={css.filterItemCheckbox}>
                                    <div className={css.filterCheckbox}>
                                      {selectedBrand.includes(brand.name) && (
                                        <IoMdCheckmark
                                          className={css.filterIconChek}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <span className={css.filterItemText}>
                                    <span className={css.filterItemTitle}>
                                      {brand.name}
                                    </span>
                                    <span className={css.filterItemQuantity}>
                                      {filterCountByBrand(brand.name)}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    {/* Розідли */}
                    <div className={`${css.filterGroup}`}>
                      <div
                        className={css.filterGroupHeader}
                        onClick={toggleCategory}
                      >
                        <div className={css.filterGroupTitle}>
                          <span>Розділ</span>
                          {selectedSection.length > 0 && (
                            <span className={css.filterGroupBadge}>
                              {selectedSection && selectedSection.length}
                            </span>
                          )}
                        </div>
                        <IoChevronDown
                          className={`${css.iconHeader} ${
                            categoryContentOpen ? css.iconHeaderOpen : ""
                          }`}
                        />
                      </div>
                      <div
                        className={`${css.toogleContent} ${
                          categoryContentOpen ? css.toogleContentOpen : ""
                        }`}
                      >
                        <div className={css.filterGroupContent}>
                          {categories &&
                            categories.map((category) => {
                              return (
                                category.items &&
                                category.items.map((item) => (
                                  <div
                                    className={`${css.filterItem}  `}
                                    key={item._id}
                                    onClick={() =>
                                      handleSectionSelect(item.name)
                                    }
                                  >
                                    <div className={css.filterItemDiv}>
                                      <div className={css.filterItemCheckbox}>
                                        <div className={css.filterCheckbox}>
                                          {selectedSection.includes(
                                            item.name
                                          ) && (
                                            <IoMdCheckmark
                                              className={css.filterIconChek}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <span className={css.filterItemText}>
                                        <span className={css.filterItemTitle}>
                                          {item.name}
                                        </span>
                                        <span
                                          className={css.filterItemQuantity}
                                        >
                                          {filterCountBySection(
                                            item.name,
                                            selectedBrand
                                          )}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                ))
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={css.filterPanelFooter}>
            <div className={css.btnFooter}>
              <button className={css.btnShow} onClick={toggleFilter}>
                Показати {sortedFilteredProducts.length}{" "}
                {getProductLabel(sortedFilteredProducts.length)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
