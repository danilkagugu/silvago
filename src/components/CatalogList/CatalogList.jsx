import { useDispatch, useSelector } from "react-redux";
import css from "./CatalogList.module.css";
import { useEffect, useRef, useState } from "react";
import { fetchFilteredProducts } from "../../redux/product/operations";
import { selectProductsFilter } from "../../redux/product/selectors";

import CatalogListDesctop from "./CatalogListDesctop/CatalogListDesctop";

import CatalogListMobile from "./CatalogListMobile/CatalogListMobile";
import { useCatalogFilters } from "../../hooks/useCatalogFilters";
import { parseFiltersFromUrl } from "../../hooks/useSelectedFilters";
import { selectAllCategories } from "../../redux/inventoryStore/selectors";

const CatalogList = ({
  brandsCount,
  categoriesCount,
  selectedBrands,
  selectedSections,
  selectedPriceRange,
  filters,
  categorySlug,
}) => {
  const isMobile = window.innerWidth <= 1440;

  const { updateFilters } = useCatalogFilters();

  const dispatch = useDispatch();

  const sortingModalRef = useRef(null);
  const filterModalRef = useRef(null);

  // State

  const [sortType, setSortType] = useState("popularity");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortingOpen, setSortingOpen] = useState(false);
  const [filterContentOpen, setFilterContentOpen] = useState(false);
  const [categoryContentOpen, setCategoryContentOpen] = useState(false);

  // Selectors
  const categories = useSelector(selectAllCategories);
  const filterProduct = useSelector(selectProductsFilter);

  //useEffect

  useEffect(() => {
    dispatch(
      fetchFilteredProducts({
        price: filters.price,
        brand: filters.brands,
        category: filters.categories,
        page: filters.page || 1,
        limit: 20,
        categorySlug,
      })
    );
  }, [categorySlug, filters, dispatch]);

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
    const brandId = brand.idTorgsoft;
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
    // console.log("section: ", section);
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

  const handlePriceClear = () => {
    const currentFilters = parseFiltersFromUrl(location.pathname);

    updateFilters({
      brands: currentFilters.brands || [],
      categories: currentFilters.categories || [],
      price: null, // Видаляємо ціновий фільтр
      page: 1,
    });
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

  if (!brandsCount.length) {
    return <div>Завантаження...</div>;
  }

  return (
    <div>
      {!isMobile ? (
        <>
          <CatalogListDesctop
            clearFilter={clearFilter}
            handleSectionSelect={handleSectionSelect}
            handleSortChange={handleSortChange}
            selectedBrand={selectedBrands}
            selectedSection={selectedSections}
            selectedPriceRange={selectedPriceRange}
            sortType={sortType}
            filterProduct={filterProduct}
            handlePriceSubmit={handlePriceSubmit}
            handlePriceClear={handlePriceClear}
            handleBrandSelect={handleBrandSelect}
            handlePageChange={handlePageChange}
            brandsCount={brandsCount}
            categoriesCount={categoriesCount}
            categorySlug={categorySlug}
            categories={categories}
          />
        </>
      ) : (
        <>
          <CatalogListMobile
            sortType={sortType}
            toggleFilter={toggleFilter}
            toggleSortingContent={toggleSortingContent}
            filterProduct={filterProduct}
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
