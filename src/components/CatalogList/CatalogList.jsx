import { useDispatch, useSelector } from "react-redux";
import css from "./CatalogList.module.css";
import { useEffect, useRef, useState } from "react";
import {
  fetchFilteredProducts,
  fetchPriceRenge,
  getAllProductTorgsoft,
  getProductVariations,
} from "../../redux/product/operations";
import {
  selectDefaultVariations,
  // selectProductLoading,
  selectProductsFilter,
  selectProductsMaxPrice,
  selectProductsMinPrice,
  selectProductsTorgsoft,
} from "../../redux/product/selectors";

import {
  fetchAllBrandsTorgsoft,
  fetchAllCategories,
} from "../../redux/inventoryStore/operations";
import {
  selectAllBrandsTorgsoft,
  selectAllCategories,
} from "../../redux/inventoryStore/selectors";

import CatalogListDesctop from "./CatalogListDesctop/CatalogListDesctop";

import CatalogListMobile from "./CatalogListMobile/CatalogListMobile";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const CatalogList = () => {
  const isMobile = window.innerWidth <= 1440;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const sortingModalRef = useRef(null);
  const filterModalRef = useRef(null);

  // State
  const [rangeValues, setRangeValues] = useState([]);
  const [sortType, setSortType] = useState("popularity");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortingOpen, setSortingOpen] = useState(false);
  const [filterContentOpen, setFilterContentOpen] = useState(false);
  const [categoryContentOpen, setCategoryContentOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState(null);

  // Selectors
  const dataProductsTorgsoft = useSelector(selectProductsTorgsoft);
  // const loading = useSelector(selectProductLoading);
  const filterProduct = useSelector(selectProductsFilter);
  const minPriceProduct = useSelector(selectProductsMinPrice);
  const maxPriceProduct = useSelector(selectProductsMaxPrice);
  const defaultProductVariations = useSelector(selectDefaultVariations);
  const brandsTorgsoft = useSelector(selectAllBrandsTorgsoft);
  // console.log("brandsTorgsoft: ", brandsTorgsoft);
  const categories = useSelector(selectAllCategories);

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments[1] === "filter") {
      const filterString = pathSegments[2] || "";
      const filters = Object.fromEntries(
        filterString.split(";").map((pair) => pair.split("="))
      );

      // Парсинг фільтрів
      const initialPriceFilter = filters.price
        ? filters.price.split("-").map(Number)
        : null;
      const initialBrands = filters.brand
        ? filters.brand.split(",").map((id) => {
            const numberId = Number(id); // Перетворення в число
            return {
              numberId, // Використовуємо числовий ідентифікатор
              name: brandsTorgsoft.find((brand) => brand.numberId === numberId)
                ?.name,
            };
          })
        : [];

      const initialSections = filters.parent
        ? filters.parent
            .split(",")
            .map((idTorgsoft) => {
              // Знаходимо категорію за idTorgsoft
              return categories.find(
                (category) => category.idTorgsoft === Number(idTorgsoft)
              );
            })
            .filter(Boolean) // Виключаємо `null`, якщо категорія не знайдена
        : [];

      console.log("initialSections", initialSections);

      // Встановлення початкових фільтрів
      if (initialPriceFilter) setPriceFilter(initialPriceFilter);
      if (initialBrands.length > 0) setSelectedBrand(initialBrands);
      if (initialSections.length > 0) setSelectedSection(initialSections);

      // Викликаємо API для застосування фільтрів
      dispatch(
        fetchFilteredProducts({
          price: initialPriceFilter
            ? `${initialPriceFilter[0]}-${initialPriceFilter[1]}`
            : null,
          brand: initialBrands.map((brand) => brand.numberId),
          category: initialSections.map((section) => section.idTorgsoft),
        })
      );
    }
  }, [location, dispatch, brandsTorgsoft, categories]);

  useEffect(() => {
    dispatch(getAllProductTorgsoft());
    dispatch(fetchAllCategories());
    dispatch(fetchAllBrandsTorgsoft());
    dispatch(fetchPriceRenge());
  }, [dispatch]);

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

  useEffect(() => {
    updateURL();
  }, [priceFilter, selectedBrand, selectedSection]);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams.entries()]);

    // Парсинг фільтрів
    const initialPriceFilter = params.price
      ? params.price.split("-").map(Number)
      : null;
    const initialBrands = params.brand
      ? params.brand.split(",").map((id) => ({
          numberId: id, // Використовуємо numberId
          name: brandsTorgsoft.find((brand) => brand.numberId === id)?.name,
        }))
      : [];

    if (initialPriceFilter) setPriceFilter(initialPriceFilter);
    if (initialBrands.length > 0) setSelectedBrand(initialBrands);

    // Викликаємо API для застосування фільтрів
    const query = {
      price: initialPriceFilter
        ? `${initialPriceFilter[0]}-${initialPriceFilter[1]}`
        : null,
      brand: initialBrands.map((brand) => brand.numberId),
    };
    dispatch(fetchFilteredProducts(query));
  }, [searchParams, brandsTorgsoft]);

  const updateURL = () => {
    const params = [];

    if (priceFilter) {
      params.push(`price=${priceFilter[0]}-${priceFilter[1]}`);
    }

    if (selectedBrand.length > 0) {
      const brandIds = selectedBrand.map((brand) => brand.numberId).join(",");
      params.push(`brand=${brandIds}`);
    }

    if (selectedSection.length > 0) {
      const sectionIds = selectedSection
        .map((section) => section.idTorgsoft)
        .join(",");
      params.push(`parent=${sectionIds}`);
    }

    const newUrl =
      params.length > 0 ? `/catalog/filter/${params.join(";")}` : "/catalog";

    // Уникаємо зайвих оновлень URL
    if (location.pathname !== newUrl) {
      navigate(newUrl, { replace: true });
    }
  };

  const applyFilters = (price, brands, sections) => {
    const priceRange = price ? `${price[0]}-${price[1]}` : null;
    dispatch(
      fetchFilteredProducts({
        category: sections.map((section) => section.idTorgsoft),
        brand: brands.map((brand) => brand.numberId),
        price: priceRange,
      })
    );
    updateURL();
  };

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
    const exists = selectedBrand.some((b) => b.numberId === brand.numberId);

    // Якщо бренд вже обрано — видаляємо його, якщо ні — додаємо
    const updatedBrands = exists
      ? selectedBrand.filter((b) => b.numberId !== brand.numberId)
      : [...selectedBrand, brand];

    setSelectedBrand(updatedBrands);

    // Оновлюємо фільтри та URL
    applyFilters(rangeValues, updatedBrands, selectedSection);
    updateURL();
  };

  const handleSectionSelect = (section) => {
    const exists = selectedSection.some(
      (s) => s.idTorgsoft === section.idTorgsoft
    );

    const updatedSections = exists
      ? selectedSection.filter((s) => {
          return s.idTorgsoft !== section.idTorgsoft;
        })
      : [...selectedSection, section];

    setSelectedSection(updatedSections);

    // Оновлюємо фільтри миттєво
    applyFilters(rangeValues, selectedBrand, updatedSections);
    updateURL();
  };

  const clearFilter = () => {
    setSelectedBrand([]);
    setSelectedSection([]);
    setPriceFilter(null);
  };

  const getProductLabel = (count) => {
    if (count === 1) return "товар";
    if (count >= 2 && count <= 4) return "товари";
    return "товарів";
  };

  const filterCountByBrand = (brandName, selectedSections) => {
    // console.log("selectedSections: ", selectedSections);
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

  const quantityFilter =
    (selectedBrand.length > 0 ? 1 : 0) + (selectedSection.length > 0 ? 1 : 0);

  // Фільтр в aside

  const handleRemoveBrand = (brandToRemove) => {
    setSelectedBrand((prev) => prev.filter((brand) => brand !== brandToRemove));
  };

  const handleRemoveSection = (section) => {
    setSelectedSection((prev) => prev.filter((brand) => brand !== section));
  };

  const handlePriceSubmit = (values) => {
    setPriceFilter(values);
    applyFilters(values, selectedBrand, selectedSection);
    updateURL();
  };
  return (
    <div>
      {!isMobile ? (
        <>
          <CatalogListDesctop
            brandsTorgsoft={brandsTorgsoft}
            categories={categories}
            clearFilter={clearFilter}
            defaultProductVariations={defaultProductVariations}
            filterCountByBrand={filterCountByBrand}
            filterCountBySection={filterCountBySection}
            handleSectionSelect={handleSectionSelect}
            handleSortChange={handleSortChange}
            maxPrice={maxPriceProduct}
            minPrice={minPriceProduct}
            selectedBrand={selectedBrand}
            selectedSection={selectedSection}
            sortType={sortType}
            filterProduct={filterProduct}
            rangeValues={rangeValues}
            setRangeValues={setRangeValues}
            setSelectedBrand={setSelectedBrand}
            setSelectedSection={setSelectedSection}
            onSubmit={handlePriceSubmit}
            handleBrandSelect={handleBrandSelect}
            priceFilter={priceFilter}
          />
        </>
      ) : (
        <>
          <CatalogListMobile
            selectedBrand={selectedBrand}
            selectedSection={selectedSection}
            quantityFilter={quantityFilter}
            sortType={sortType}
            toggleFilter={toggleFilter}
            toggleSortingContent={toggleSortingContent}
            handleRemoveBrand={handleRemoveBrand}
            handleRemoveSection={handleRemoveSection}
            defaultProductVariations={defaultProductVariations}
            filterProduct={filterProduct}
            brandsTorgsoft={brandsTorgsoft}
            categories={categories}
            categoryContentOpen={categoryContentOpen}
            clearFilter={clearFilter}
            filterContentOpen={filterContentOpen}
            filterCountByBrand={filterCountByBrand}
            filterCountBySection={filterCountBySection}
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
