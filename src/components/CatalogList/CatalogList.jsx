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
import { useSelectedFilters } from "../../hooks/useSelectedFilters";

const CatalogList = ({ brandsCount }) => {
  const isMobile = window.innerWidth <= 1440;

  const { filters, updateFilters } = useCatalogFilters();
<<<<<<< HEAD
  const { selectedBrands, selectedSections} = useSelectedFilters(filters);
  
 
=======
>>>>>>> main
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
  const [priceFilter, setPriceFilter] = useState(null);

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
<<<<<<< HEAD
   
   
   
  
  console.log("filters.price",filters.price);
=======

  // useEffect(() => {
  //   const params = Object.fromEntries([...searchParams.entries()]);

  //   // Парсинг параметрів фільтрів
  //   const initialPriceFilter = params.price
  //     ? params.price.split("-").map(Number)
  //     : null;
  //     const initialBrands = params.brand
  //     ? params.brand.split(",").map((id) => ({

  //         numberId: id,
  //         name: brandsCount.find((brand) => String(brand.numberId) === id)?.name,
  //       }))
  //     : [];
  //     // console.log('initialBrands',initialBrands);
  //   const initialSections = params.parent
  //     ? params.parent.split(",").map(Number)
  //     : [];
  //   const page = params.page ? Number(params.page) : 1;

  //   // Оновлення стану фільтрів
  //   if (initialPriceFilter) setPriceFilter(initialPriceFilter);
  //   if (initialBrands.length > 0) setSelectedBrand(initialBrands);
  //   if (initialSections.length > 0) {
  //     setSelectedSection(
  //       initialSections
  //         .map((idTorgsoft) =>
  //           categories.find((category) => category.idTorgsoft === idTorgsoft)
  //         )
  //         .filter(Boolean)
  //     );
  //   }

  //   // Застосовуємо сторінку, якщо вона відрізняється
  //   if (page !== currentPage) {
  //     setCurrentPage(page);
  //   }

  //   // Викликаємо API для застосування фільтрів тільки після оновлення стану
  //   dispatch(
  //     fetchFilteredProducts({
  //       price: params.price,
  //       brand: params.brand?.split(",") || [],
  //       category: initialSections,
  //       page,
  //       limit: 20,
  //     })
  //   );
  // }, [searchParams, categories, currentPage, dispatch]);
>>>>>>> main

  useEffect(() => {
    dispatch(
      fetchFilteredProducts({
        price: filters.price,
        brand: filters.brands,
        category: filters.categories,
        page: filters.page,
        limit: 20,
      })
    );
  }, [JSON.stringify(filters), dispatch]);
<<<<<<< HEAD
 
=======

  // useEffect(() => {
  //   let cancel = false;

  //   dispatch(
  //     fetchFilteredProducts({
  //       price: filters.price,
  //       brand: filters.brands,
  //       category: filters.categories,
  //       page: filters.page,
  //       limit: 20,
  //     })
  //   ).finally(() => {
  //     if (cancel) return;
  //   });

  //   return () => {
  //     cancel = true;  // Скасування попереднього запиту при повторному ефекті
  //   };
  // }, [JSON.stringify(filters), dispatch]);  // JSON.stringify для порівняння фільтрів
>>>>>>> main


   

 
 
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

<<<<<<< HEAD
   

 
   
=======
  const updateURL = (page) => {
    const params = new URLSearchParams();

    if (priceFilter) {
      params.append("price", `${priceFilter[0]}-${priceFilter[1]}`);
    }

    if (selectedBrand.length > 0) {
      const brandIds = selectedBrand.map((brand) => brand.numberId).join(",");
      params.append("brand", brandIds);
    }

    if (selectedSection.length > 0) {
      const sectionIds = selectedSection
        .map((section) => section.idTorgsoft)
        .join(",");
      params.append("category", sectionIds);
    }

    if (page > 1) {
      params.append("page", page);
    }

    // Формуємо URL залежно від наявності фільтрів
    const newUrl = params.toString()
      ? `/catalog/filter?${params.toString()}`
      : "/catalog";

    // console.log("Updating URL to:", newUrl);

    // Уникаємо зайвих оновлень URL
    if (location.pathname + location.search !== newUrl) {
      navigate(newUrl, { replace: true });
    }
  };

  // const updateURL = useCallback(() => {
  //   const params = new URLSearchParams();

  //   if (priceFilter) {
  //     params.append("price", `${priceFilter[0]}-${priceFilter[1]}`);
  //   }

  //   if (selectedBrand.length > 0) {
  //     params.append("brand", selectedBrand.map((brand) => brand.numberId).join(","));
  //   }

  //   if (selectedSection.length > 0) {
  //     params.append("category", selectedSection.map((section) => section.idTorgsoft).join(","));
  //   }

  //   if (currentPage > 1) {
  //     params.append("page", currentPage);
  //   }

  //   const newUrl = params.toString() ? `/catalog/filter?${params.toString()}` : "/catalog";
  //   if (location.pathname + location.search !== newUrl) {
  //     navigate(newUrl, { replace: true });
  //   }
  // }, [ navigate, location.pathname]);

  const applyFilters = (price, brands, sections, page = 1) => {
    const priceRange = price ? `${price[0]}-${price[1]}` : null;

    dispatch(
      fetchFilteredProducts({
        category: sections.map((section) => section.idTorgsoft),
        brand: brands.map((brand) => brand.numberId),
        price: priceRange,
        page,
        limit: 20,
      })
    );
    updateURL(page);
  };
>>>>>>> main

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
    const brandId = brand.numberId; // Витягуємо тільки ідентифікатор бренду
    const updatedBrands = filters.brands.includes(brandId)
      ? filters.brands.filter((id) => id !== brandId)
      : [...filters.brands, brandId];
<<<<<<< HEAD
  
    updateFilters({ ...filters, brands: updatedBrands,page: 1 });
=======

    updateFilters({ ...filters, brands: updatedBrands });
>>>>>>> main
  };

  const handleSectionSelect = (section) => {
    const categoryId = section.idTorgsoft;
    const exists = filters.categories.includes(categoryId);
  
    const updatedCategories = exists
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];
  
    updateFilters({ ...filters, categories: updatedCategories,page: 1 });
  };
  

  const handlePriceSubmit = (values) => {
    // Перевіряємо, чи є значення ціни дійсними
    if (values[0] >= 0 && values[1] > values[0]) {
      updateFilters({ ...filters, price: values,page: 1 });
    }
  };

  const handlePageChange = (page) => {
    updateFilters({ ...filters, page });
  };

  

  const clearFilter = () => {
    updateFilters({ brands: [], categories: [], price: null, page: 1 });
  };

  const getProductLabel = (count) => {
    if (count === 1) return "товар";
    if (count >= 2 && count <= 4) return "товари";
    return "товарів";
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

   

  // Фільтр в aside

  const handleRemoveBrand = (brandToRemove) => {
    // setSelectedBrands((prev) => prev.filter((brand) => brand !== brandToRemove));
  };

  const handleRemoveSection = (section) => {
    // setSelectedSection((prev) => prev.filter((brand) => brand !== section));
  };

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
            filterCountBySection={filterCountBySection}
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
            
            onSubmit={handlePriceSubmit}
            handleBrandSelect={handleBrandSelect}
            priceFilter={priceFilter}
            handlePageChange={handlePageChange}
            brandsCount={brandsCount}
          />
        </>
      ) : (
        <>
          <CatalogListMobile
            
            sortType={sortType}
            toggleFilter={toggleFilter}
            toggleSortingContent={toggleSortingContent}
            handleRemoveBrand={handleRemoveBrand}
            handleRemoveSection={handleRemoveSection}
            defaultProductVariations={defaultProductVariations}
            filterProduct={filterProduct}
            categories={categories}
            categoryContentOpen={categoryContentOpen}
            clearFilter={clearFilter}
            filterContentOpen={filterContentOpen}
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
