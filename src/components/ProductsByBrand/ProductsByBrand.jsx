import { useDispatch, useSelector } from "react-redux";
import {
  // selectProductDetails,
  selectProducts,
} from "../../redux/product/selectors";
import { useEffect, useRef, useState } from "react";
import { getAllProduct } from "../../redux/product/operations";
import { getBrands, getCategories } from "../../services/productApi";
import { Link, useParams } from "react-router-dom";
import css from "./ProductsByBrand.module.css";
import { fetchFavoriteProducts } from "../../helpers/productActions";
import CatalogListItem from "../CatalogListItem/CatalogListItem";
import {
  IoChevronBackSharp,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";
import { IoIosClose, IoMdCheckmark } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { CiFilter } from "react-icons/ci";
import { TbArrowsSort } from "react-icons/tb";
// import { addProduct } from "../../redux/basket/operations";

const ProductsByBrand = () => {
  // const navigate = useNavigate();
  const sortingModalRef = useRef(null);
  const dispatch = useDispatch();

  const isMobile = window.innerWidth <= 1440;

  const [brands, setBrands] = useState();
  // console.log("brands: ", brands);
  const [quantities, setQuantities] = useState({});
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [selectedVolume, setSelectedVolume] = useState({});
  const [categories, setCategories] = useState();
  // console.log("categories: ", categories);

  const [sortingOpen, setSortingOpen] = useState(false);
  const [sortType, setSortType] = useState("popularity");
  console.log("sortType: ", sortType);
  const [selectedSection, setSelectedSection] = useState([]);
  // FILTER
  const [filterOpen, setFilterOpen] = useState(false);
  const [categoryContentOpen, setCategoryContentOpen] = useState(false);

  const { brandName } = useParams();

  const dataProducts = useSelector(selectProducts);

  const currentBrand =
    brands && brands.find((brand) => brand.name === brandName);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
        const initialQuantities = {};
        const initialVolume = {};
        dataProducts.forEach((p) => {
          initialQuantities[p._id] = 1;
          const defaultVolume = getDefaultVolume(p.volumes);
          if (defaultVolume) {
            initialVolume[p._id] = defaultVolume;
          }
        });
        setQuantities(initialQuantities);
        setSelectedVolume(initialVolume);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
    fetchFavoriteProducts(setFavoriteProducts);
  }, [dataProducts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Закриваємо модалку сортування
      if (
        sortingModalRef.current &&
        !sortingModalRef.current.contains(event.target) &&
        sortingOpen
      ) {
        toggleSortingContent();
      }
      // if (
      //   filterModalRef.current &&
      //   !filterModalRef.current.contains(event.target) &&
      //   filterOpen
      // ) {
      //   toggleFilter();
      // }
    };

    // Додаємо обробник події
    document.addEventListener("mousedown", handleClickOutside);

    // Очищаємо обробник події при демонтажі компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortingOpen, filterOpen]);

  const handleVolumeSelect = (productId, volume) => {
    setSelectedVolume((prev) => ({
      ...prev,
      [productId]: volume,
    }));
  };

  // const filteredProducts = dataProducts.filter((product) => {
  //   if (!brands) return false;

  //   const brand = brands.find((cat) => cat.name === brandName);
  //   if (!brand) return false;

  //   return product.brand === brand.name;
  // });

  const getDefaultVolume = (volumes) => {
    if (!volumes || volumes.length === 0) return 0;
    return volumes.reduce(
      (maxVol, vol) => (vol.volume > maxVol ? vol.volume : maxVol),
      0
    );
  };

  // FILTER

  const toggleSortingContent = () => {
    setSortingOpen((prevState) => !prevState); // Перемикання стану
    if (!sortingOpen) {
      // Блокуємо скрол на сторінці при відкритті модалки
      document.body.classList.add(css.modalOpen);
    } else {
      // Вмикаємо скрол при закритті модалки
      document.body.classList.remove(css.modalOpen);
    }
  };

  const handleSortChange = (type) => {
    setSortType(type);
    toggleSortingContent();
  };

  const handleSectionSelect = (sectionName) => {
    setSelectedSection((prevSelectedSections) => {
      if (prevSelectedSections.includes(sectionName)) {
        // Видаляємо розділ з масиву, якщо він вже вибраний
        return prevSelectedSections.filter((s) => s !== sectionName);
      } else {
        // Додаємо розділ до масиву, якщо він ще не вибраний
        return [...prevSelectedSections, sectionName];
      }
    });
  };

  const clearFilter = () => {
    setSelectedSection([]);
  };

  const isSectionDisabled = (sectionName) => {
    return !dataProducts.some(
      (item) => item.subcategory === sectionName
      // &&        (selectedBrand.length === 0 || selectedBrand.includes(item.brand))
    );
  };

  const handleRemoveSection = (section) => {
    setSelectedSection((prev) => prev.filter((brand) => brand !== section));
  };

  const sortProducts = (products) => {
    let sortedProducts = [...products];

    switch (sortType) {
      case "popularity":
        // Сортування за популярністю, якщо є поле popularity у товарі
        sortedProducts.sort((a, b) => b.salesCount - a.salesCount);
        break;
      case "priceAsc":
        // Сортування за ціною, спочатку дешевше
        sortedProducts.sort(
          (a, b) => (a.volumes[0]?.price || 0) - (b.volumes[0]?.price || 0)
        );
        break;
      case "name":
        // Сортування за назвою
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sortedProducts;
  };

  const filterProductsByBrandsAndSections = (
    products,
    selectedBrands,
    selectedSection
  ) => {
    return products.filter((item) => {
      const matchesBrand =
        selectedBrands.length > 0 ? selectedBrands.includes(item.brand) : true;
      const matchesSection =
        selectedSection.length > 0
          ? selectedSection.includes(item.subcategory)
          : true;
      //   const matchesPrice =
      //     (minPrice === null ||
      //       item.volumes.some((volume) => volume.price >= minPrice)) &&
      //     (maxPrice === null ||
      //       item.volumes.some((volume) => volume.price <= maxPrice));
      return matchesBrand && matchesSection;
    });
  };

  const sortedFilteredProducts = sortProducts(
    filterProductsByBrandsAndSections(dataProducts, brandName, selectedSection)
  );

  const filterCountBySection = (subcategory, selectedBrands) => {
    return dataProducts.filter(
      (item) =>
        item.subcategory === subcategory &&
        (selectedBrands.length === 0 || selectedBrands.includes(item.brand))
    ).length;
  };

  // MOBILE

  const toggleFilter = () => {
    setFilterOpen((prevState) => !prevState); // Перемикання стану
    if (!filterOpen) {
      // Блокуємо скрол на сторінці при відкритті модалки
      document.body.classList.add(css.modalOpen);
    } else {
      // Вмикаємо скрол при закритті модалки
      document.body.classList.remove(css.modalOpen);
    }
  };

  const toggleCategory = () => {
    setCategoryContentOpen((prevState) => !prevState); // Перемикання стану
  };

  const quantityFilter = selectedSection.length > 0 ? 1 : 0;

  const getProductLabel = (count) => {
    if (count === 1) return "товар";
    if (count >= 2 && count <= 4) return "товари";
    return "товарів";
  };

  return (
    <div>
      {!isMobile ? (
        <>
          <nav className={css.productGroupMenu}>
            <div className={css.productGroupMenuItem}>
              <Link to="/">Головна</Link>
              <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
            </div>
            <div className={css.productGroupMenuItem}>
              <p to="/catalog">{brandName}</p>
            </div>
          </nav>
          <div className={css.catalogTopRows}>
            <div className={css.catalogTopTitle}>
              <h1 className={css.titleText}>{brandName}</h1>
            </div>
            <div className={css.catalogTopRight}>
              <div className={css.catalogControls}>
                <div className={css.catalogControlsItem}>
                  <div className={css.catalogSorting}>
                    <div className={css.catalogSortingTitle}>Сортування:</div>
                    <div className={css.catalogSortingList}>
                      <span
                        className={`${css.catalogSortingItem} ${
                          sortType === "popularity"
                            ? css.catalogSortingItemActive
                            : ""
                        }`}
                        onClick={() => handleSortChange("popularity")}
                      >
                        за популярністю
                      </span>
                      <span
                        className={`${css.catalogSortingItem} ${
                          sortType === "priceAsc"
                            ? css.catalogSortingItemActive
                            : ""
                        }`}
                        onClick={() => handleSortChange("priceAsc")}
                      >
                        спочатку дешевше
                      </span>
                      <span
                        className={`${css.catalogSortingItem} ${
                          sortType === "name"
                            ? css.catalogSortingItemActive
                            : ""
                        }`}
                        onClick={() => handleSortChange("name")}
                      >
                        За назвою
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div className={css.catalogControlsItem}></div> */}
              </div>
            </div>
          </div>
          <div className={css.catalogContentMain}>
            <div
              className={`${css.catalogContentMainRight} ${css.catalogListProduct}`}
            >
              <div className={css.catalogContent}>
                <ul className={css.list}>
                  {sortedFilteredProducts.map((product) => (
                    <li
                      key={product._id}
                      className={css.listItem}
                      id={product._id}
                    >
                      <CatalogListItem
                        favoriteProducts={favoriteProducts}
                        handleVolumeSelect={handleVolumeSelect}
                        product={product}
                        quantities={quantities}
                        selectedVolume={selectedVolume}
                      />
                    </li>
                  ))}
                </ul>
                <div className={css.paginationContainer}>
                  <nav className={css.pageList}>
                    <div className={css.pageContainer}>
                      <span className={css.pageItem}>
                        <IoChevronBackSharp /> Назад
                      </span>
                      <span className={css.pageItem}>1</span>
                      <span className={css.pageItem}>2</span>
                      <span className={css.pageItem}>3</span>
                      <span className={css.pageItem}>
                        Вперед
                        <IoChevronForward />
                      </span>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className={css.catalogContentMainLeft}>
              <aside className={css.catalogSideBar}>
                <div className={css.catalogGroup}>
                  <div className={css.filterContainer}>
                    {selectedSection.length > 0 && (
                      <div className={css.filterSection}>
                        <div className={css.filterCurrent}>
                          {selectedSection.length > 0 && (
                            <div className={css.filterCurrentGroup}>
                              <span className={css.filterCurrentTitle}>
                                Розділ:
                              </span>
                              <span className={css.filterCurrentBrand}>
                                {selectedSection.join(", ")}
                              </span>
                            </div>
                          )}
                          <p className={css.filterClear} onClick={clearFilter}>
                            Очистити фільтр
                          </p>
                        </div>
                      </div>
                    )}
                    <div className={css.filterSection}>
                      <div className={css.filterSectionTitle}>Розділ</div>
                      <div className={css.filterList}>
                        <ul className={css.filterBrandList}>
                          {categories &&
                            categories
                              .filter((category) => {
                                // Перевіряємо, чи категорія з поточних категорій співпадає з категоріями бренду
                                return (
                                  currentBrand &&
                                  currentBrand.category.some(
                                    (brandCategory) =>
                                      brandCategory.name === category.name
                                  ) &&
                                  category.items // Перевіряємо наявність items в категорії
                                );
                              })
                              .map((category) =>
                                category.items.map((item) => (
                                  <li
                                    className={`${css.filterBrandItem} ${
                                      isSectionDisabled(item.name)
                                        ? css.disabledBrandItem
                                        : ""
                                    }`}
                                    key={item._id}
                                    onClick={() =>
                                      handleSectionSelect(item.name)
                                    }
                                  >
                                    <div className={css.filterCheck}>
                                      <span className={css.label}>
                                        <span
                                          className={`${css.checkbox} ${
                                            selectedSection.includes(item.name)
                                              ? css.activeCheck
                                              : ""
                                          }`}
                                        >
                                          {selectedSection.includes(
                                            item.name
                                          ) && (
                                            <IoMdCheckmark
                                              className={css.iconChek}
                                            />
                                          )}
                                        </span>
                                        <span className={css.filterBrandTitle}>
                                          {item.name}
                                        </span>
                                        <sup className={css.filterCount}>
                                          {filterCountBySection(
                                            item.name,
                                            brandName
                                          )}
                                        </sup>
                                      </span>
                                    </div>
                                  </li>
                                ))
                              )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </>
      ) : (
        <>
          <nav className={css.breadcrumbsMob}>
            <div className={css.breadcrumbsListWrap}>
              <div className={css.breadcrumbsList}>
                <div className={css.productGroupMenuItem}>
                  <Link className={css.breadcrumbsLink} to="/">
                    <GoHome />
                  </Link>
                  <IoChevronForward
                    className={`${css.icon} ${css.iconChevronRight}`}
                  />
                </div>
                <div className={css.productGroupMenuItem}>
                  <p className={css.breadcrumbsLink}>{brandName}</p>
                </div>
              </div>
            </div>
          </nav>
          <h1 className={css.titleMob}>{brandName}</h1>
          <div className={css.controlsPanel}>
            <div className={css.catalogControls}>
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
            </div>
          </div>
          {selectedSection.length > 0 && (
            <div className={css.filterPanelActiveFilters}>
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
          <ul className={css.goods}>
            {sortedFilteredProducts.map((product) => (
              <li className={css.goodsItem} key={product._id}>
                <CatalogListItem
                  favoriteProducts={favoriteProducts}
                  handleVolumeSelect={handleVolumeSelect}
                  product={product}
                  quantities={quantities}
                  selectedVolume={selectedVolume}
                />
              </li>
            ))}
          </ul>
          {/* Filter Start */}
          <div
            className={`${css.modalFilterBox} ${
              filterOpen ? css.filterOpen : ""
            }`}
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
                {selectedSection.length > 0 && (
                  <div className={css.filterPanelActiveFilters}>
                    <span className={css.filterPanelHeading}>Ви обрали</span>

                    {selectedSection.length > 0 && (
                      <div className={css.activeFilters}>
                        <div className={css.activeFiltersList}>
                          <div className={css.activeFiltersItem}>
                            <div className={css.activeFiltersHeading}>
                              Розділ
                            </div>
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
                                  categories
                                    .filter((category) => {
                                      return (
                                        currentBrand &&
                                        currentBrand.category.some(
                                          (brandCategory) =>
                                            brandCategory.name === category.name
                                        ) &&
                                        category.items
                                      );
                                    })
                                    .map((category) =>
                                      category.items.map((item) => (
                                        <div
                                          className={`${css.filterItem} ${
                                            isSectionDisabled(item.name)
                                              ? css.disabledBrandItem
                                              : ""
                                          }`}
                                          key={item._id}
                                          onClick={() =>
                                            handleSectionSelect(item.name)
                                          }
                                        >
                                          <div className={css.filterItemDiv}>
                                            <div
                                              className={css.filterItemCheckbox}
                                            >
                                              <div
                                                className={css.filterCheckbox}
                                              >
                                                {selectedSection.includes(
                                                  item.name
                                                ) && (
                                                  <IoMdCheckmark
                                                    className={
                                                      css.filterIconChek
                                                    }
                                                  />
                                                )}
                                              </div>
                                            </div>
                                            <span
                                              className={css.filterItemText}
                                            >
                                              <span
                                                className={css.filterItemTitle}
                                              >
                                                {item.name}
                                              </span>
                                              <span
                                                className={
                                                  css.filterItemQuantity
                                                }
                                              >
                                                {filterCountBySection(
                                                  item.name,
                                                  brandName
                                                )}
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      ))
                                    )}
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
          {/* Filter End */}

          {/* Sorting Start */}
          <div className={`${css.backdrop} ${sortingOpen ? css.open : ""}`}>
            <div
              className={`${css.modalSortingBox} ${
                sortingOpen ? css.open : ""
              }`}
            >
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
                      <div className={css.optionItemTitle}>
                        Спочатку дешевше
                      </div>
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
          {/* Sorting End */}
        </>
      )}
    </div>
  );
};
export default ProductsByBrand;

// {
//   categories &&
//     categories.map((category) => {
//       return (
//         category.items &&
//         category.items.map((item) => (
//           <li
//             className={`${css.filterBrandItem} ${
//               isSectionDisabled(item.name) ? css.disabledBrandItem : ""
//             }`}
//             key={item._id}
//             onClick={() => handleSectionSelect(item.name)}
//           >
//             <div className={css.filterCheck}>
//               <span className={css.label}>
//                 <span
//                   className={`${css.checkbox} ${
//                     selectedSection.includes(item.name) ? css.activeCheck : ""
//                   }`}
//                 >
//                   {selectedSection.includes(item.name) && (
//                     <IoMdCheckmark className={css.iconChek} />
//                   )}
//                 </span>
//                 <span className={css.filterBrandTitle}>{item.name}</span>
//                 <sup className={css.filterCount}>
//                   {filterCountBySection(item.name, brandName)}
//                 </sup>
//               </span>
//             </div>
//           </li>
//         ))
//       );
//     });
// }
