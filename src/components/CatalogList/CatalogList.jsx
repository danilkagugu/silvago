import { useDispatch, useSelector } from "react-redux";
import css from "./CatalogList.module.css";
import {   useEffect, useRef, useState } from "react";
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

import {
  selectAllCategories,
} from "../../redux/inventoryStore/selectors";

import CatalogListDesctop from "./CatalogListDesctop/CatalogListDesctop";

import CatalogListMobile from "./CatalogListMobile/CatalogListMobile";
import { useCatalogFilters } from "../../hooks/useCatalogFilters";
import { useSelectedFilters } from "../../hooks/useSelectedFilters";

const CatalogList = ({brandsCount}) => {
  const isMobile = window.innerWidth <= 1440;

  const { filters, updateFilters } = useCatalogFilters();
  const { selectedBrands, selectedSections} = useSelectedFilters(filters);
  
 
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
   
   
   
  
  console.log("filters.price",filters.price);

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
    const brandId = brand.numberId;  // Витягуємо тільки ідентифікатор бренду
    const updatedBrands = filters.brands.includes(brandId)
      ? filters.brands.filter((id) => id !== brandId)
      : [...filters.brands, brandId];
  
    updateFilters({ ...filters, brands: updatedBrands,page: 1 });
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
