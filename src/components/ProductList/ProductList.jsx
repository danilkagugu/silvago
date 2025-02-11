import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import css from "./ProductList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDefaultVariations,
  selectProductsTorgsoft,
} from "../../redux/product/selectors";
import {
  getAllProductTorgsoft,
  getProductVariations,
} from "../../redux/product/operations";

import {
  selectAllBrandsTorgsoft,
  selectAllCategories,
  selectAllFilters,
} from "../../redux/inventoryStore/selectors";
import {
  fetchAllBrands,
  fetchAllBrandsTorgsoft,
  fetchAllCategories,
  fetchAllFilters,
  fetchAllSkins,
} from "../../redux/inventoryStore/operations";

import ProductListDesctop from "./ProductListDesctop/ProductListDesctop";

const ProductList = () => {
  const dispatch = useDispatch();
  const sortingModalRef = useRef(null);
  const filterModalRef = useRef(null);
  // console.log("selectedVolume: ", selectedVolume);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBrand, setSelectedBrand] = useState([]);
  // console.log("selectedBrand: ", selectedBrand);
  const [selectedSection, setSelectedSection] = useState([]);
  // console.log("selectedSection: ", selectedSection);
  const [filteredBrands, setFilteredBrands] = useState([]);

  const [selectedSkin, setSelectedSkin] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortingOpen, setSortingOpen] = useState(false);

  const [sortType, setSortType] = useState("popularity");

  // const favorite = useSelector(selectFavoritesProducts);
  // const skin = useSelector(selectAllSkins);
  const filters = useSelector(selectAllFilters);
  // console.log("filters: ", filters);

  const dataProductsTorgsoft = useSelector(selectProductsTorgsoft);

  const defaultProductVariations = useSelector(selectDefaultVariations);

  useEffect(() => {
    dispatch(getProductVariations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProductTorgsoft());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllBrandsTorgsoft());
  }, [dispatch]);

  const brands = useSelector(selectAllBrandsTorgsoft);
  // console.log("brands: ", brands);
  useEffect(() => {
    dispatch(fetchAllSkins());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllFilters());
  }, [dispatch]);

  const categories = useSelector(selectAllCategories);

  // const brands = useSelector(selectAllBrands);
  // console.log("favorite: ", favorite);

  const { categorySlug, subCategorySlug, childCategorySlug } = useParams();

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
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);

  const filteredProducts = dataProductsTorgsoft.filter((product) => {
    if (!categories) return false;

    // Знайти головну категорію за slug
    const category = categories.find((cat) => cat.slug === categorySlug);
    if (!category) return false;

    // Якщо є subCategorySlug
    if (subCategorySlug) {
      const subCategory = category.children.find(
        (item) => item.slug === subCategorySlug
      );
      if (!subCategory) return false;

      // Якщо є childCategorySlug
      if (childCategorySlug) {
        const childCategory = subCategory.children.find(
          (item) => item.slug === childCategorySlug
        );
        if (!childCategory) return false;

        // Перевірити, чи продукт належить дочірній категорії
        return product.categories.some(
          (cat) => cat.slug === childCategory.slug
        );
      }

      // Перевірити, чи продукт належить підкатегорії
      return product.categories.some((cat) => cat.slug === subCategory.slug);
    }

    // Перевірити, чи продукт належить головній категорії
    return product.categories.some((cat) => cat.slug === category.slug);
  });

  // Пагінація
  const ITEMS_PER_PAGE = 15;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

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
    const subCategory = category?.children.find((item) => item.slug === slug);
    return subCategory ? subCategory.name : "";
  };
  const getChildSubCategoryName = (category, slug) => {
    const childSubCategory = category?.children.find(
      (item) => item.slug === slug
    );
    return childSubCategory ? childSubCategory.name : "";
  };

  const currentCategory = categories?.find((cat) => cat.slug === categorySlug);

  const currentSubCategory = currentCategory
    ? currentCategory.children.find((item) => item.slug === subCategorySlug)
    : null;
  const currentChildSubCategory = currentSubCategory
    ? currentSubCategory.children.find(
        (item) => item.slug === childCategorySlug
      )
    : null;

  // Фільтри
  const handleSortChange = (type) => {
    setSortType(type);
    toggleSortingContent();
  };

  const handleBrandSelect = (brand) => {
    console.log("brand: ", brand);
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

  const clearFilter = () => {
    setSelectedBrand([]);
    setSelectedSkin([]);
    setSelectedSection([]);
  };

  // console.log("dataProductsTorgsoft", dataProductsTorgsoft);
  const isSkinDisabled = (skin) => {
    // console.log("skin: ", skin);
    return !dataProductsTorgsoft.some((item) => {
      // console.log("item", item);
      return item.skinNeeds && item.skinNeeds.includes(skin);
    });
  };
  const filterCountByBrand = (brandName, selectedSections) => {
    return dataProductsTorgsoft.filter((item) => {
      const matchesBrand = item.brand === brandName; // Перевіряємо, чи бренд збігається
      const matchesSection =
        selectedSections.length === 0 || // Якщо категорії не обрані, враховуємо всі товари
        selectedSections.some((section) =>
          item.categories.some((category) => category.name === section.name)
        ); // Перевіряємо, чи категорія збігається
      return matchesBrand && matchesSection;
    }).length;
  };
  const filterCountBySkin = (skinName) => {
    if (!dataProductsTorgsoft || !skinName) return 0;

    return dataProductsTorgsoft.filter((item) => {
      // Перевіряємо, чи є skinNeeds у товарі, та чи включає він конкретне значення
      if (!item.skinNeeds) return false;

      // Розділяємо skinNeeds на масив значень
      const skinNeedsArray = item.skinNeeds
        .split(",")
        .map((need) => need.trim());
      // Перевіряємо, чи масив потреб шкіри включає потрібне значення
      return skinNeedsArray.includes(skinName);
    }).length;
  };

  const filterCountBySection = (subcategory, selectedBrands) => {
    return dataProductsTorgsoft.filter((item) => {
      const matchesCategory =
        Array.isArray(item.categories) &&
        item.categories.some((category) => category.name === subcategory);

      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.some((brand) => brand.name === item.brand);

      return matchesCategory && matchesBrand;
    }).length;
  };

  const filterProductsByBrandsAndSections = (
    products,
    selectedBrands,
    selectedSection,
    currentCategory,
    selectedSkins
  ) => {
    return products.filter((item) => {
      const productSkinNeeds = item.skinNeeds
        ? item.skinNeeds.split(",").map((need) => need.trim())
        : [];

      const matchesBrand =
        selectedBrands.length > 0
          ? selectedBrands.some((brand) => brand.name === item.brand)
          : true;

      const matchesSection =
        selectedSection.length > 0
          ? Array.isArray(item.categories) &&
            item.categories.some((category) =>
              selectedSection.some((section) => section.name === category.name)
            )
          : true;

      const matchesCategory = currentCategory
        ? Array.isArray(item.categories) &&
          item.categories.some(
            (category) => category.name === currentCategory.name
          )
        : true;
      const matchesSkins =
        selectedSkins.length > 0
          ? productSkinNeeds.some((need) => selectedSkins.includes(need))
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
      filteredProducts,
      selectedBrand,
      selectedSection,
      currentCategory,
      selectedSkin
    )
  );

  const isMobile = window.innerWidth <= 1440;
  // console.log("categories", categories);
  // console.log("currentCategory", currentCategory);

  //

  // console.log("brands", brands);

  useEffect(() => {
    const brandSet = new Set();

    filteredProducts.forEach((item) => {
      const matchingBrand = brands.find((brand) => brand.name === item.brand);
      if (matchingBrand) {
        brandSet.add(matchingBrand);
      }
    });

    const filterBrandArray = Array.from(brandSet);

    if (
      filteredBrands.length !== filterBrandArray.length ||
      !filteredBrands.every(
        (brand, index) => brand._id === filterBrandArray[index]._id
      )
    ) {
      setFilteredBrands(filterBrandArray);
    }
  }, [filteredProducts, brands, filteredBrands]);

  const availableFilters = useMemo(() => {
    // Отримуємо всі skinNeeds з продуктів для поточної категорії
    const skinNeedsFromProducts = dataProductsTorgsoft
      .filter(
        (product) =>
          product.categories.includes(currentCategory?.name) &&
          (!currentSubCategory ||
            product.categories.includes(currentSubCategory?.name))
      )
      .flatMap((product) =>
        product.skinNeeds
          ? product.skinNeeds.split(",").map((need) => need.trim())
          : []
      );

    // Залишаємо лише унікальні значення
    const uniqueSkinNeeds = Array.from(new Set(skinNeedsFromProducts));

    return uniqueSkinNeeds;
  }, [dataProductsTorgsoft, currentCategory, currentSubCategory]);
  // console.log("availableFilters", availableFilters);

  // console.log("category", currentCategory);

  return (
    <div>
      {/* Breadcrumbs */}
      {!isMobile ? (
        <>
          <ProductListDesctop
            categorySlug={categorySlug}
            childCategorySlug={childCategorySlug}
            currentCategory={currentCategory}
            currentChildSubCategory={currentChildSubCategory}
            currentSubCategory={currentSubCategory}
            getCategoryName={getCategoryName}
            getChildSubCategoryName={getChildSubCategoryName}
            getSubCategoryName={getSubCategoryName}
            subCategorySlug={subCategorySlug}
            handleSortChange={handleSortChange}
            sortType={sortType}
            currentPage={currentPage}
            defaultProductVariations={defaultProductVariations}
            handlePageChange={handlePageChange}
            sortedFilteredProducts={sortedFilteredProducts}
            totalPages={totalPages}
            availableFilters={availableFilters}
            categories={categories}
            clearFilter={clearFilter}
            filterCountByBrand={filterCountByBrand}
            filterCountBySection={filterCountBySection}
            filterCountBySkin={filterCountBySkin}
            filteredBrands={filteredBrands}
            filters={filters}
            handleBrandSelect={handleBrandSelect}
            handleSectionSelect={handleSectionSelect}
            handleSkinSelect={handleSkinSelect}
            isSkinDisabled={isSkinDisabled}
            selectedBrand={selectedBrand}
            selectedSection={selectedSection}
            selectedSkin={selectedSkin}
          />
        </>
      ) : (
        <>
          {/*   
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
                  // ref={sortingModalRef}
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
                  product={product}
                  defaultProductVariations={defaultProductVariations}
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
                              
                              <div className={css.filterGroupContent}>
                                {brands &&
                                  brands
                                    .filter(
                                      (brand) =>
                                        brand.category &&
                                        brand.category.some(
                                          (cat) =>
                                            cat.name === currentCategory.name  
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
                                            isSkinDisabled(item.name)
                                              ? css.disabledBrandItem
                                              : ""
                                          }`}
                                          key={item._id}
                                          onClick={() =>
                                            handleSkinSelect(item.name)
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
                                                {filterCountBySkin(item.name)}
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
                                        .flatMap(
                                          (category) => category.children
                                        )
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
          */}
        </>
      )}
    </div>
  );
};

export default ProductList;
