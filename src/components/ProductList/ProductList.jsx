import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getBrands, getCategories, getSkins } from "../../services/productApi";
import css from "./ProductList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/product/selectors";
import { getAllProduct } from "../../redux/product/operations";
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

const ProductList = () => {
  const dispatch = useDispatch();
  const sortingModalRef = useRef(null);
  const filterModalRef = useRef(null);

  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  // console.log("selectedSection: ", selectedSection);
  const [skin, setSkin] = useState([]);
  const [selectedSkin, setSelectedSkin] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortingOpen, setSortingOpen] = useState(false);
  const [filterContentOpen, setFilterContentOpen] = useState(false);
  const [skinContentOpen, setSkinContentOpen] = useState(false);
  const [categoryContentOpen, setCategoryContentOpen] = useState(false);
  const [sortType, setSortType] = useState("popularity");
  const dataProducts = useSelector(selectProducts);

  const { categorySlug, subCategorySlug } = useParams();
  const quantityFilter =
    (selectedBrand.length > 0 ? 1 : 0) +
    (selectedSkin.length > 0 ? 1 : 0) +
    (selectedSection.length > 0 ? 1 : 0);

  const toggleFilterContent = () => {
    setFilterContentOpen((prevState) => !prevState); // Перемикання стану
  };

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
  const toggleSkinContent = () => {
    setSkinContentOpen((prevState) => !prevState); // Перемикання стану
  };

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
      if (
        filterModalRef.current &&
        !filterModalRef.current.contains(event.target) &&
        filterOpen
      ) {
        toggleFilter();
      }
    };

    // Додаємо обробник події
    document.addEventListener("mousedown", handleClickOutside);

    // Очищаємо обробник події при демонтажі компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortingOpen, filterOpen]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug, subCategorySlug]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCategories();
        const brands = await getBrands();
        const skins = await getSkins();
        setBrands(brands);
        setCategories(data);
        setSkin(skins);
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

  const handleVolumeSelect = (productId, volume) => {
    setSelectedVolume((prev) => ({
      ...prev,
      [productId]: volume,
    }));
  };

  const getDefaultVolume = (volumes) => {
    if (!volumes || volumes.length === 0) return 0;
    return volumes.reduce(
      (maxVol, vol) => (vol.volume > maxVol ? vol.volume : maxVol),
      0
    );
  };

  const filteredProducts = dataProducts.filter((product) => {
    if (!categories) return false;

    const category = categories.find((cat) => cat.slug === categorySlug);
    if (!category) return false;

    if (subCategorySlug) {
      const subCategory = category.items.find(
        (item) => item.slug === subCategorySlug
      );
      if (!subCategory) return false;

      return (
        product.category === category.name &&
        product.subcategory === subCategory.name
      );
    } else {
      return product.category === category.name;
    }
  });

  // Пагінація
  const ITEMS_PER_PAGE = 15;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const endIndex = startIndex + ITEMS_PER_PAGE;
  // const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Формування breadcrumbs
  const getCategoryName = (slug) => {
    const category = categories?.find((cat) => cat.slug === slug);
    return category ? category.name : "";
  };
  const getSubCategoryName = (category, slug) => {
    const subCategory = category?.items.find((item) => item.slug === slug);
    return subCategory ? subCategory.name : "";
  };

  const currentCategory = categories?.find((cat) => cat.slug === categorySlug);
  // console.log("currentCategory: ", currentCategory);

  const currentSubCategory = currentCategory
    ? currentCategory.items.find((item) => item.slug === subCategorySlug)
    : null;

  // Фільтри
  const handleSortChange = (type) => {
    setSortType(type);
    toggleSortingContent();
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brand)) {
        // Видаляємо бренд з масиву, якщо він вже вибраний
        return prevSelectedBrands.filter((b) => b !== brand);
      } else {
        // Додаємо бренд до масиву, якщо він ще не вибраний
        return [...prevSelectedBrands, brand];
      }
    });
  };
  const handleSkinSelect = (skin) => {
    setSelectedSkin((prevSelectedSkins) => {
      if (prevSelectedSkins.includes(skin)) {
        // Видаляємо бренд з масиву, якщо він вже вибраний
        return prevSelectedSkins.filter((b) => b !== skin);
      } else {
        // Додаємо бренд до масиву, якщо він ще не вибраний
        return [...prevSelectedSkins, skin];
      }
    });
  };

  const handleSectionSelect = (sectionName) => {
    // console.log("sectionName: ", sectionName);
    setSelectedSection((prevSelectedSections) => {
      // console.log("prevSelectedSections: ", prevSelectedSections);
      if (prevSelectedSections.includes(sectionName)) {
        return prevSelectedSections.filter((s) => s !== sectionName);
      } else {
        return [...prevSelectedSections, sectionName];
      }
    });
  };
  const handleRemoveBrand = (brandToRemove) => {
    setSelectedBrand((prev) => prev.filter((brand) => brand !== brandToRemove));
  };
  const handleRemoveSkin = (skin) => {
    setSelectedSkin((prev) => prev.filter((brand) => brand !== skin));
  };
  const handleRemoveSection = (section) => {
    setSelectedSection((prev) => prev.filter((brand) => brand !== section));
  };

  const clearFilter = () => {
    setSelectedBrand([]);
    setSelectedSkin([]);
    setSelectedSection([]);
  };
  const isBrandDisabled = (brandName) => {
    return !dataProducts.some(
      (item) =>
        item.brand === brandName &&
        (selectedSection.length === 0 ||
          selectedSection.includes(item.subcategory))
    );
  };
  const isSectionDisabled = (sectionName) => {
    return !dataProducts.some(
      (item) =>
        item.subcategory === sectionName &&
        (selectedBrand.length === 0 || selectedBrand.includes(item.brand))
    );
  };

  // console.log("dataProducts", dataProducts);
  const isSkinDisabled = (skin) => {
    return !dataProducts.some((item) =>
      item.filters.some((filter) => filter.label === skin)
    );
  };

  const filterCountByBrand = (brandName) => {
    return dataProducts.filter(
      (item) =>
        item.brand === brandName && // Фільтруємо за брендом
        item.category === currentCategory.name // Фільтруємо за поточною категорією
    ).length;
  };
  const filterCountBySkin = (skinName) => {
    return (
      dataProducts &&
      dataProducts.filter((item) =>
        item.filters.some((filter) => filter.label === skinName)
      ).length
    );
  };

  const filterCountBySection = (subcategory) => {
    return dataProducts.filter((item) => item.subcategory === subcategory)
      .length;
  };

  const filterProductsByBrandsAndSections = (
    products,
    selectedBrands,
    selectedSection,
    currentCategory,
    selectedSkins
  ) => {
    return products.filter((item) => {
      const matchesBrand =
        selectedBrands.length > 0 ? selectedBrands.includes(item.brand) : true;
      const matchesSection =
        selectedSection.length > 0
          ? selectedSection.includes(item.subcategory)
          : true;
      const matchesCategory = currentCategory
        ? currentCategory.name === item.category
        : true;
      const matchesSkins =
        selectedSkins.length > 0
          ? item.filters.some((filter) => selectedSkins.includes(filter.label))
          : true;
      return matchesBrand && matchesSection && matchesCategory && matchesSkins;
    });
  };
  // console.log("selectedBrands", selectedBrands);
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

  const sortedFilteredProducts = sortProducts(
    filterProductsByBrandsAndSections(
      dataProducts,
      selectedBrand,
      selectedSection,
      currentCategory,
      selectedSkin
    )
  );

  const isMobile = window.innerWidth <= 1440;

  const getProductLabel = (count) => {
    if (count === 1) return "товар";
    if (count >= 2 && count <= 4) return "товари";
    return "товарів";
  };
  return (
    <div>
      {/* Breadcrumbs */}
      {!isMobile ? (
        <>
          <nav className={css.breadcrumbs}>
            <div className={css.productGroupMenuItem}>
              <Link to="/">Головна</Link>
              <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
            </div>
            <div className={css.productGroupMenuItem}>
              <Link to="/catalog">Каталог</Link>
            </div>
            {currentCategory && (
              <div className={css.productGroupMenuItem}>
                <IoChevronForward
                  className={`${css.icon} ${css.iconChevron}`}
                />
                <Link className={css.navItem} to={`/catalog/${categorySlug}`}>
                  {getCategoryName(categorySlug)}
                </Link>
              </div>
            )}
            {currentSubCategory && (
              <div className={css.productGroupMenuItem}>
                <IoChevronForward
                  className={`${css.icon} ${css.iconChevron}`}
                />
                <Link to={`/catalog/${categorySlug}/${subCategorySlug}`}>
                  {getSubCategoryName(currentCategory, subCategorySlug)}
                </Link>
              </div>
            )}
          </nav>
          {/*  */}
          <div className={css.catalogTopRows}>
            <div className={css.catalogTopTitle}>
              <h1 className={css.titleText}>
                {currentCategory && currentCategory.name}{" "}
                {/* {selectedBrand.length > 0 && `Бренд: ${selectedBrand.join(", ")}`}
            {selectedSection.length > 0 &&
              `, Розділ: ${selectedSection.join(", ")}`} */}
              </h1>
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
          {/*  */}
          <div className={css.catalogContentMain}>
            <div
              className={`${css.catalogContentMainRight} ${css.CatalogListProduct}`}
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
                {totalPages > 1 && (
                  <div className={css.paginationContainer}>
                    <nav className={css.pageList}>
                      <div className={css.pageContainer}>
                        <button
                          className={css.pageItem}
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Назад
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            key={index + 1}
                            className={`${css.pageItem} ${
                              currentPage === index + 1 ? css.activePage : ""
                            }`}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          className={css.pageItem}
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Вперед
                        </button>
                      </div>
                    </nav>
                  </div>
                )}
              </div>
            </div>
            <div className={css.catalogContentMainLeft}>
              <aside className={css.catalogSideBar}>
                <div className={css.catalogGroup}>
                  <div className={css.filterContainer}>
                    {(selectedBrand.length > 0 ||
                      selectedSkin.length > 0 ||
                      selectedSection.length > 0) && (
                      <div className={css.filterSection}>
                        <div className={css.filterCurrent}>
                          {selectedBrand.length > 0 && (
                            <div className={css.filterCurrentGroup}>
                              <span className={css.filterCurrentTitle}>
                                Бренд:
                              </span>
                              <span className={css.filterCurrentBrand}>
                                {selectedBrand.join(", ")}
                              </span>
                            </div>
                          )}
                          {selectedSkin.length > 0 && (
                            <div className={css.filterCurrentGroup}>
                              <span className={css.filterCurrentTitle}>
                                Потреби шкіри:
                              </span>
                              <span className={css.filterCurrentBrand}>
                                {selectedSkin.join(", ")}
                              </span>
                            </div>
                          )}
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
                      <div className={css.filterSectionTitle}>Бренд</div>
                      <div className={css.filterList}>
                        <ul className={css.filterBrandList}>
                          {brands &&
                            brands
                              .filter(
                                (brand) =>
                                  brand.category &&
                                  brand.category.some(
                                    (cat) => cat.name === currentCategory.name // Відображаємо бренд лише якщо його категорія співпадає з вибраною
                                  )
                              )
                              .map((brand) => (
                                <li
                                  className={`${css.filterBrandItem} ${
                                    isBrandDisabled(brand.name)
                                      ? css.disabledBrandItem
                                      : ""
                                  }`}
                                  key={brand._id}
                                  onClick={() => handleBrandSelect(brand.name)}
                                >
                                  <div className={css.filterCheck}>
                                    <span className={css.label}>
                                      <span
                                        className={`${css.checkbox} ${
                                          selectedBrand.includes(brand.name)
                                            ? css.activeCheck
                                            : ""
                                        }`}
                                      >
                                        {selectedBrand.includes(brand.name) && (
                                          <IoMdCheckmark
                                            className={css.iconChek}
                                          />
                                        )}
                                      </span>
                                      <span className={css.filterBrandTitle}>
                                        {brand.name}
                                      </span>
                                      <sup className={css.filterCount}>
                                        {filterCountByBrand(brand.name)}
                                      </sup>
                                    </span>
                                  </div>
                                </li>
                              ))}
                        </ul>
                      </div>
                    </div>
                    {currentCategory &&
                      currentCategory.name === "Догляд за обличчям" && (
                        <div className={css.filterSection}>
                          <div className={css.filterSectionTitle}>
                            Потреби шкіри
                          </div>
                          <div className={css.filterList}>
                            <ul className={css.filterBrandList}>
                              {skin &&
                                skin.map((item) => (
                                  <li
                                    className={`${css.filterBrandItem} ${
                                      isSkinDisabled(item.label)
                                        ? css.disabledBrandItem
                                        : ""
                                    }`}
                                    key={item._id}
                                    onClick={() => handleSkinSelect(item.label)}
                                  >
                                    <div className={css.filterCheck}>
                                      <span className={css.label}>
                                        <span
                                          className={`${css.checkbox} ${
                                            selectedSkin.includes(item.label)
                                              ? css.activeCheck
                                              : ""
                                          }`}
                                        >
                                          {selectedSkin.includes(
                                            item.label
                                          ) && (
                                            <IoMdCheckmark
                                              className={css.iconChek}
                                            />
                                          )}
                                        </span>
                                        <span className={css.filterBrandTitle}>
                                          {item.label}
                                        </span>
                                        <sup className={css.filterCount}>
                                          {filterCountBySkin(item.label)}
                                        </sup>
                                      </span>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    {currentCategory &&
                      currentCategory.name !== "Догляд за обличчям" && (
                        <div className={css.filterSection}>
                          <div className={css.filterSectionTitle}>Розділ</div>
                          <div className={css.filterList}>
                            <ul className={css.filterBrandList}>
                              {categories &&
                                categories
                                  .filter(
                                    (category) =>
                                      category.name === currentCategory.name
                                  ) // Додано фільтрацію категорій
                                  .flatMap((category) => category.items) // Використовуйте flatMap для отримання елементів
                                  .map((item) => (
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
                                              selectedSection.includes(
                                                item.name
                                              )
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
                                          <span
                                            className={css.filterBrandTitle}
                                          >
                                            {item.name}
                                          </span>
                                          <sup className={css.filterCount}>
                                            {filterCountBySection(item.name)}
                                          </sup>
                                        </span>
                                      </div>
                                    </li>
                                  ))}
                            </ul>
                          </div>
                        </div>
                      )}
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
                  <Link className={css.breadcrumbsLink} to="/catalog">
                    Каталог
                  </Link>
                </div>
                {currentCategory && (
                  <div className={css.productGroupMenuItem}>
                    <IoChevronForward
                      className={`${css.icon} ${css.iconChevronRight}`}
                    />
                    <Link
                      className={css.breadcrumbsLink}
                      to={`/catalog/${categorySlug}`}
                    >
                      {getCategoryName(categorySlug)}
                    </Link>
                  </div>
                )}
                {currentSubCategory && (
                  <div className={css.productGroupMenuItem}>
                    <IoChevronForward
                      className={`${css.icon} ${css.iconChevronRight}`}
                    />
                    <Link
                      className={css.breadcrumbsLink}
                      to={`/catalog/${categorySlug}/${subCategorySlug}`}
                    >
                      {getSubCategoryName(currentCategory, subCategorySlug)}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <h1 className={css.titleMob}>
            {currentCategory && currentCategory.name}
          </h1>
          <div className={css.controlsPanel}>
            <div className={css.catalogControls}>
              <div
                className={`${css.catalogControlsItemMob} ${css.catalogControlsItemFilter}`}
              >
                <button
                  className={css.btnFilter}
                  // ref={filterModalRef}
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
                  className={css.btnFilter}
                  ref={sortingModalRef}
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
          {(selectedBrand.length > 0 ||
            selectedSkin.length > 0 ||
            selectedSection.length > 0) && (
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
              {selectedSkin.length > 0 && (
                <div className={css.activeFiltersList}>
                  <div className={css.activeFiltersItem}>
                    <div className={css.activeFiltersHeading}>
                      Потреби шкіри
                    </div>
                  </div>

                  {selectedSkin &&
                    selectedSkin.map((item, i) => (
                      <div className={css.activeFiltersItem} key={i}>
                        <span className={css.activeBrandItem}>
                          <span className={css.activeText}>{item}</span>
                          <span
                            className={css.iconFilterBrand}
                            onClick={() => handleRemoveSkin(item)}
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
                  <button
                    className={css.btnBack}
                    // ref={filterModalRef}
                    onClick={toggleFilter}
                  >
                    <IoChevronBackSharp />
                  </button>
                  <div className={css.titleFilter}>Фільтр</div>
                </div>
                {(selectedBrand.length > 0 ||
                  selectedSkin.length > 0 ||
                  selectedSection.length > 0) && (
                  <div className={css.filterPanelActiveFilters}>
                    <span className={css.filterPanelHeading}>Ви обрали</span>
                    {selectedBrand.length > 0 && (
                      <div className={css.activeFilters}>
                        <div className={css.activeFiltersList}>
                          <div className={css.activeFiltersItem}>
                            <div className={css.activeFiltersHeading}>
                              Бренд
                            </div>
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
                      </div>
                    )}
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
                    {selectedSkin.length > 0 && (
                      <div className={css.activeFilters}>
                        <div className={css.activeFiltersList}>
                          <div className={css.activeFiltersItem}>
                            <div className={css.activeFiltersHeading}>
                              Потреби шкіри
                            </div>
                          </div>

                          {selectedSkin &&
                            selectedSkin.map((item, i) => (
                              <div className={css.activeFiltersItem} key={i}>
                                <span className={css.activeBrandItem}>
                                  <span className={css.activeText}>{item}</span>
                                  <span
                                    className={css.iconFilterBrand}
                                    onClick={() => handleRemoveSkin(item)}
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
                              {/* <div className={css.filterGroupSearch}></div> */}
                              <div className={css.filterGroupContent}>
                                {brands &&
                                  brands
                                    .filter(
                                      (brand) =>
                                        brand.category &&
                                        brand.category.some(
                                          (cat) =>
                                            cat.name === currentCategory.name // Відображаємо бренд лише якщо його категорія співпадає з вибраною
                                        )
                                    )
                                    .map((brand) => (
                                      <div
                                        className={`${css.filterItem} ${
                                          isBrandDisabled(brand.name)
                                            ? css.disabledBrandItem
                                            : ""
                                        }`}
                                        key={brand._id}
                                      >
                                        <div className={css.filterItemDiv}>
                                          <div
                                            className={css.filterItemCheckbox}
                                            onClick={() =>
                                              handleBrandSelect(brand.name)
                                            }
                                          >
                                            <div className={css.filterCheckbox}>
                                              {selectedBrand.includes(
                                                brand.name
                                              ) && (
                                                <IoMdCheckmark
                                                  className={css.filterIconChek}
                                                />
                                              )}
                                            </div>
                                          </div>
                                          <span className={css.filterItemText}>
                                            <span
                                              className={css.filterItemTitle}
                                            >
                                              {brand.name}
                                            </span>
                                            <span
                                              className={css.filterItemQuantity}
                                            >
                                              {filterCountByBrand(brand.name)}
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                              </div>
                            </div>
                          </div>
                          {currentCategory &&
                            currentCategory.name === "Догляд за обличчям" && (
                              <div className={css.filterGroup}>
                                <div
                                  className={css.filterGroupHeader}
                                  onClick={toggleSkinContent}
                                >
                                  <div className={css.filterGroupTitle}>
                                    <span>Потреби шкіри</span>
                                    {selectedSkin.length > 0 && (
                                      <span className={css.filterGroupBadge}>
                                        {selectedSkin && selectedSkin.length}
                                      </span>
                                    )}
                                    <IoChevronDown
                                      className={`${css.iconHeader} 
                                  ${skinContentOpen ? css.iconHeaderOpen : ""}
                                  `}
                                    />
                                  </div>
                                </div>
                                <div
                                  className={`${css.toogleContent} ${
                                    skinContentOpen ? css.toogleContentOpen : ""
                                  }`}
                                >
                                  <div className={css.filterGroupContent}>
                                    {skin &&
                                      skin.map((item) => (
                                        <div
                                          className={`${css.filterItem} ${
                                            isSkinDisabled(item.label)
                                              ? css.disabledBrandItem
                                              : ""
                                          }`}
                                          key={item._id}
                                          onClick={() =>
                                            handleSkinSelect(item.label)
                                          }
                                        >
                                          <div className={css.filterItemDiv}>
                                            <div
                                              className={css.filterItemCheckbox}
                                            >
                                              <div
                                                className={css.filterCheckbox}
                                              >
                                                {selectedSkin.includes(
                                                  item.label
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
                                                {item.label}
                                              </span>
                                              <span
                                                className={
                                                  css.filterItemQuantity
                                                }
                                              >
                                                {filterCountBySkin(item.label)}
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          {currentCategory &&
                            currentCategory.name !== "Догляд за обличчям" && (
                              <div className={css.filterGroup}>
                                <div
                                  className={css.filterGroupHeader}
                                  onClick={toggleCategory}
                                >
                                  <div className={css.filterGroupTitle}>
                                    <span>Розділ</span>
                                    {selectedSection.length > 0 && (
                                      <span className={css.filterGroupBadge}>
                                        {selectedSection &&
                                          selectedSection.length}
                                      </span>
                                    )}
                                    <IoChevronDown
                                      className={`${css.iconHeader} 
                                  ${
                                    categoryContentOpen
                                      ? css.iconHeaderOpen
                                      : ""
                                  }
                                  `}
                                    />
                                  </div>
                                </div>
                                <div
                                  className={`${css.toogleContent} ${
                                    categoryContentOpen
                                      ? css.toogleContentOpen
                                      : ""
                                  }`}
                                >
                                  <div className={css.filterGroupContent}>
                                    {categories &&
                                      categories
                                        .filter(
                                          (category) =>
                                            category.name ===
                                            currentCategory.name
                                        )
                                        .flatMap((category) => category.items)
                                        .map((item) => (
                                          <div
                                            className={`${css.filterItem}  ${
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
                                                className={
                                                  css.filterItemCheckbox
                                                }
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
                                                  className={
                                                    css.filterItemTitle
                                                  }
                                                >
                                                  {item.name}
                                                </span>
                                                <span
                                                  className={
                                                    css.filterItemQuantity
                                                  }
                                                >
                                                  {filterCountBySection(
                                                    item.name
                                                  )}
                                                </span>
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                  </div>
                                </div>
                              </div>
                            )}
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
        </>
      )}
    </div>
  );
};

export default ProductList;
