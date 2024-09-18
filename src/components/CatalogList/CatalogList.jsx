import { useDispatch, useSelector } from "react-redux";
import CatalogListItem from "../CatalogListItem/CatalogListItem";
import css from "./CatalogList.module.css";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../redux/product/operations";
import { selectProducts } from "../../redux/product/selectors";
import { Link } from "react-router-dom";
import { IoChevronBackSharp, IoChevronForward } from "react-icons/io5";
import { getBrands, getCategories } from "../../services/productApi";
import { IoMdCheckmark } from "react-icons/io";

const CatalogList = () => {
  const dispatch = useDispatch();

  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [quantities, setQuantities] = useState({});
  const [selectedVolume, setSelectedVolume] = useState({});
  //   console.log("selectedVolume: ", selectedVolume);
  const [sortType, setSortType] = useState("popularity");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [categories, setCategories] = useState();
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  //   console.log("categories: ", categories);

  const dataProducts = useSelector(selectProducts);

  const [brands, setBrands] = useState([]);
  //   console.log("brands: ", brands);

  const filterCountByBrand = (brandName) => {
    return dataProducts.filter((item) => item.brand === brandName).length;
  };
  const filterCountBySection = (subcategory) => {
    return dataProducts.filter((item) => item.subcategory === subcategory)
      .length;
  };

  useEffect(() => {
    const priceMin = getMinPrice(dataProducts);
    setMinPrice(priceMin);
  }, [dataProducts]);

  useEffect(() => {
    const priceMax = getMaxPrice(dataProducts);
    setMaxPrice(priceMax);
  }, [dataProducts]);

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
        const brands = await getBrands();
        setBrands(brands);
      } catch (error) {
        console.log("Error fetching brands:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
  }, [dataProducts]);

  const getDefaultVolume = (volumes) => {
    if (!volumes || volumes.length === 0) return 0;
    return volumes.reduce(
      (maxVol, vol) => (vol.volume > maxVol ? vol.volume : maxVol),
      0
    );
  };

  const handleVolumeSelect = (productId, volume) => {
    console.log("volume: ", volume);
    setSelectedVolume((prev) => ({
      ...prev,
      [productId]: volume,
    }));
  };

  // Сортування

  const handleSortChange = (type) => {
    setSortType(type);
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

  //   const sortedProducts = sortProducts(dataProducts);

  // Фільтр в aside
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
    setSelectedBrand([]);
    setSelectedSection([]);
  };

  const sortedFilteredProducts = sortProducts(
    filterProductsByBrandsAndSections(
      dataProducts,
      selectedBrand,
      selectedSection
    )
  );
  // Мінімальна ціна
  const getMinPrice = (products) => {
    if (products.length === 0) return null;

    let minPrice = Infinity;

    products.forEach((product) => {
      // Знаходимо найменшу ціну серед всіх об'ємів продукту
      const productMinPrice = Math.min(
        ...product.volumes.map((volume) => parseFloat(volume.price) || Infinity)
      );
      if (productMinPrice < minPrice) {
        minPrice = productMinPrice;
      }
    });

    return minPrice === Infinity ? null : minPrice;
  };

  const getMaxPrice = (products) => {
    if (products.length === 0) return null;

    let maxPrice = -Infinity;

    products.forEach((product) => {
      // Знаходимо найбільшу ціну серед всіх об'ємів продукту
      const productMaxPrice = Math.max(
        ...product.volumes.map(
          (volume) => parseFloat(volume.price) || -Infinity
        )
      );
      if (productMaxPrice > maxPrice) {
        maxPrice = productMaxPrice;
      }
    });

    return maxPrice === -Infinity ? null : maxPrice;
  };

  const handlePriceFilter = (e) => {
    e.preventDefault(); // щоб запобігти перезавантаженню сторінки при сабміті форми
    const min = parseFloat(minPrice) || 0; // конвертуйте у число
    const max = parseFloat(maxPrice) || Infinity; // конвертуйте у число

    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div>
      <nav className={css.productGroupMenu}>
        <div className={css.productGroupMenuItem}>
          <Link to="/">Головна</Link>
          <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
        </div>
        <div className={css.productGroupMenuItem}>
          <Link to="/catalog">Каталог</Link>
        </div>
      </nav>
      <div className={css.catalogTopRows}>
        <div className={css.catalogTopTitle}>
          <h1 className={css.titleText}>
            Головна Каталог{" "}
            {selectedBrand.length > 0 && `Бренд: ${selectedBrand.join(", ")}`}
            {selectedSection.length > 0 &&
              `, Розділ: ${selectedSection.join(", ")}`}
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
                      sortType === "name" ? css.catalogSortingItemActive : ""
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
          className={`${css.catalogContentMainRight} ${css.CatalogListProduct}`}
        >
          <div className={css.catalogContent}>
            <ul className={css.list}>
              {sortedFilteredProducts.map((product) => (
                <li key={product._id} className={css.listItem} id={product._id}>
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
                {(selectedBrand.length > 0 || selectedSection.length > 0) && (
                  <div className={css.filterSection}>
                    <div className={css.filterCurrent}>
                      {selectedBrand.length > 0 && (
                        <div className={css.filterCurrentGroup}>
                          <span className={css.filterCurrentTitle}>Бренд:</span>
                          <span className={css.filterCurrentBrand}>
                            {selectedBrand.join(", ")}
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
                        brands.map((item) => (
                          <li
                            className={`${css.filterBrandItem} ${
                              isBrandDisabled(item.name)
                                ? css.disabledBrandItem
                                : ""
                            }`}
                            key={item._id}
                            onClick={() => handleBrandSelect(item.name)}
                            // onChange={() => handleBrandSelect(item.name)}
                          >
                            <div className={css.filterCheck}>
                              <span className={css.label}>
                                <span
                                  className={`${css.checkbox} ${
                                    selectedBrand.includes(item.name)
                                      ? css.activeCheck
                                      : ""
                                  }`}
                                >
                                  {selectedBrand.includes(item.name) && (
                                    <IoMdCheckmark className={css.iconChek} />
                                  )}
                                </span>
                                <span className={css.filterBrandTitle}>
                                  {item.name}
                                </span>
                                <sup className={css.filterCount}>
                                  {filterCountByBrand(item.name)}
                                </sup>
                              </span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className={css.filterSection}>
                  <div className={css.filterSectionTitle}>Розділ</div>
                  <div className={css.filterList}>
                    <ul className={css.filterBrandList}>
                      {categories &&
                        categories.map((category) => {
                          return (
                            category.items &&
                            category.items.map((item) => (
                              <li
                                className={`${css.filterBrandItem} ${
                                  isSectionDisabled(item.name)
                                    ? css.disabledBrandItem
                                    : ""
                                }`}
                                key={item._id}
                                onClick={() => handleSectionSelect(item.name)}
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
                                      {selectedSection.includes(item.name) && (
                                        <IoMdCheckmark
                                          className={css.iconChek}
                                        />
                                      )}
                                    </span>
                                    <span className={css.filterBrandTitle}>
                                      {item.name}
                                    </span>
                                    <sup className={css.filterCount}>
                                      {filterCountBySection(item.name)}
                                    </sup>
                                  </span>
                                </div>
                              </li>
                            ))
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <div className={css.filterSection}>
                  <form onSubmit={handlePriceFilter}>
                    <div className={css.filterSectionTitle}>Ціна, грн</div>
                    <div className={css.filterPrice}>
                      <div className={css.filterPriceInputs}>
                        <input
                          className={`${css.field} ${css.filterPriceField}`}
                          type="number"
                          value={minPrice !== null ? minPrice : ""}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <i className={css.filterPriceSep} />
                        <input
                          className={`${css.field} ${css.filterPriceField}`}
                          type="number"
                          value={maxPrice !== null ? maxPrice : ""}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <button className={css.filterPriceBtn}>
                          <span className={css.btnContent}>ОК</span>
                        </button>
                      </div>
                      <div className={css.priceSlider}></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CatalogList;
