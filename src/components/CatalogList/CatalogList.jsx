import { useDispatch, useSelector } from "react-redux";
import css from "./CatalogList.module.css";
import { useEffect, useRef, useState } from "react";
import {
  fetchFilteredProducts,
  getProductVariations,
} from "../../redux/product/operations";
import {
  selectDefaultVariations,
  selectProductsFilter,
  selectProductsMaxPrice,
  selectProductsMinPrice,
  selectProductsTorgsoft,
} from "../../redux/product/selectors";

import { selectAllCategories } from "../../redux/inventoryStore/selectors";

import CatalogListDesctop from "./CatalogListDesctop/CatalogListDesctop";

import CatalogListMobile from "./CatalogListMobile/CatalogListMobile";
import { useCatalogFilters } from "../../hooks/useCatalogFilters";
import {
  parseFiltersFromUrl,
  useSelectedFilters,
} from "../../hooks/useSelectedFilters";

const CatalogList = ({ brandsCount,categoriesCount }) => {
  const isMobile = window.innerWidth <= 1440;

  const { updateFilters } = useCatalogFilters();
  const { selectedBrands, selectedSections, filters } = useSelectedFilters();
  // console.log("filters: ", filters);
  // console.log('selectedBrands: ', selectedBrands);

  const dispatch = useDispatch();

  const sortingModalRef = useRef(null);
  const filterModalRef = useRef(null);

  // State
  const [rangeValues, setRangeValues] = useState([]);
  const [sortType, setSortType] = useState("popularity");

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortingOpen, setSortingOpen] = useState(false);
  const [filterContentOpen, setFilterContentOpen] = useState(false);
  const [categoryContentOpen, setCategoryContentOpen] = useState(false);
  // const [priceFilter, setPriceFilter] = useState(null);

  // Selectors
  const dataProductsTorgsoft = useSelector(selectProductsTorgsoft);
  // const loading = useSelector(selectProductLoading);
  const filterProduct = useSelector(selectProductsFilter);
  // console.log('filterProduct: ', filterProduct);
  const minPriceProduct = useSelector(selectProductsMinPrice);
  // console.log('minPriceProduct: ', minPriceProduct);
  const maxPriceProduct = useSelector(selectProductsMaxPrice);
  const defaultProductVariations = useSelector(selectDefaultVariations);
  const categories = useSelector(selectAllCategories);

  useEffect(() => {
    dispatch(
      fetchFilteredProducts({
        price: filters.price,
        brand: filters.brands,
        category: filters.categories,
        page: filters.page || 1,
        limit: 20,
      })
    );
  }, [rangeValues, filters, dispatch]);

  useEffect(() => {
    if (minPriceProduct !== null && maxPriceProduct !== null) {
      setRangeValues([minPriceProduct, maxPriceProduct]);
    }
  }, [minPriceProduct, maxPriceProduct]);

  useEffect(() => {
    dispatch(
      getProductVariations({
        minPrice: rangeValues[0],
        maxPrice: rangeValues[1],
      })
    );
  }, [rangeValues, dispatch]);

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

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
    document.body.classList.toggle(css.modalOpen, !filterOpen);
  };

  const toggleSortingContent = () => {
    setSortingOpen((prev) => !prev);
    document.body.classList.toggle(css.modalOpen, !sortingOpen);
  };

  const toggleCategory = () => {
    setCategoryContentOpen((prevState) => !prevState); // Перемикання стану
  };

  const toggleFilterContent = () => {
    setFilterContentOpen((prevState) => !prevState); // Перемикання стану
  };

  const handleSortChange = (type) => {
    setSortType(type);
    toggleSortingContent();
  };

  const handleBrandSelect = (brand) => {
    const brandId = brand.numberId;
    const currentFilters = parseFiltersFromUrl(location.pathname); // Отримуємо актуальні фільтри з URL

    // Додаємо або видаляємо бренд із фільтрів
    const updatedBrands = currentFilters.brands.includes(brandId)
      ? currentFilters.brands.filter((id) => id !== brandId)
      : [...currentFilters.brands, brandId];

    updateFilters({
      brands: updatedBrands,
      categories: currentFilters.categories || [],
      price: currentFilters.price || null,
      page: 1,
    });
  };

  const handleSectionSelect = (section) => {
    const categoryId = section.idTorgsoft;

    // Отримуємо актуальні фільтри з URL
    const currentFilters = parseFiltersFromUrl(location.pathname);

    // Додаємо або видаляємо категорію із фільтрів
    const updatedCategories = currentFilters.categories.includes(categoryId)
      ? currentFilters.categories.filter((id) => id !== categoryId)
      : [...currentFilters.categories, categoryId];

    updateFilters({
      brands: currentFilters.brands || [],
      categories: updatedCategories,
      price: currentFilters.price || null,
      page: 1,
    });
  };

  const handlePriceSubmit = (values) => {
    // console.log("values: ", values);
    if (values[0] >= 0 && values[1] > values[0]) {
      const currentFilters = parseFiltersFromUrl(location.pathname);
      // console.log("currentFilters: ", currentFilters);

      // Оновлюємо ціновий фільтр
      updateFilters({
        brands: currentFilters.brands || [],
        categories: currentFilters.categories || [],
        price: values || null,
        page: 1,
      });
    }
  };

  const handlePageChange = (page) => {
    const currentFilters = parseFiltersFromUrl(location.pathname);
    // console.log("currentFilters: ", currentFilters);

    // Оновлюємо сторінку в параметрах
    updateFilters({ ...currentFilters, page });
  };

  const clearFilter = () => {
    // Створюємо об'єкт дефолтних значень фільтрів
    const defaultFilters = {
      brands: [],
      categories: [],
      price: null,
      page: 1,
    };

    // Оновлюємо фільтри до дефолтних значень
    updateFilters(defaultFilters);
  };

  const getProductLabel = (count) => {
    if (count === 1) return "товар";
    if (count >= 2 && count <= 4) return "товари";
    return "товарів";
  };

 

  // Фільтр в aside

  // const handleRemoveBrand = (brandToRemove) => {
  //   // setSelectedBrands((prev) => prev.filter((brand) => brand !== brandToRemove));
  // };

  // const handleRemoveSection = (section) => {
  //   // setSelectedSection((prev) => prev.filter((brand) => brand !== section));
  // };

  if (!brandsCount.length) {
    return <div>Завантаження...</div>;
  }

  return (
    <div>
      {!isMobile ? (
        <>
          <CatalogListDesctop
            categories={categories}
            clearFilter={clearFilter}
            defaultProductVariations={defaultProductVariations}
            handleSectionSelect={handleSectionSelect}
            handleSortChange={handleSortChange}
            maxPrice={maxPriceProduct}
            minPrice={minPriceProduct}
            selectedBrand={selectedBrands}
            selectedSection={selectedSections}
            sortType={sortType}
            filterProduct={filterProduct}
            rangeValues={rangeValues}
            setRangeValues={setRangeValues}
            handlePriceSubmit={handlePriceSubmit}
            handleBrandSelect={handleBrandSelect}
            // priceFilter={priceFilter}
            handlePageChange={handlePageChange}
            brandsCount={brandsCount}
            categoriesCount={categoriesCount}
          />
        </>
      ) : (
        <>
          <CatalogListMobile
            sortType={sortType}
            toggleFilter={toggleFilter}
            toggleSortingContent={toggleSortingContent}
            // handleRemoveBrand={handleRemoveBrand}
            // handleRemoveSection={handleRemoveSection}
            defaultProductVariations={defaultProductVariations}
            filterProduct={filterProduct}
            categories={categories}
            categoryContentOpen={categoryContentOpen}
            clearFilter={clearFilter}
            filterContentOpen={filterContentOpen}
            filterOpen={filterOpen}
            getProductLabel={getProductLabel}
            handleBrandSelect={handleBrandSelect}
            handleSectionSelect={handleSectionSelect}
            toggleCategory={toggleCategory}
            toggleFilterContent={toggleFilterContent}
            handleSortChange={handleSortChange}
            sortingOpen={sortingOpen}
          />
        </>
      )}
    </div>
  );
};

export default CatalogList;
