import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../redux/inventoryStore/selectors";
import { useLocation } from "react-router-dom";
import { selectBrandsCount } from "../redux/product/selectors";

/**
 * Функція для парсингу фільтрів з URL у новому форматі
 * @param {string} pathname - Поточний шлях
 * @returns {Object} - Об'єкт фільтрів
 */
export const parseFiltersFromUrl = (pathname, search) => {
  let filtersPart = "";

  // Визначаємо, чи це фільтрація по категорії чи загальна
  if (pathname.includes("/catalog/category/")) {
    filtersPart = pathname.split("/filter/")[1]?.split("/")[0] || "";
  } else if (pathname.includes("/catalog/search")) {
    filtersPart = pathname.split("/filter/")[1]?.split("/")[0] || "";
  } else if (pathname.includes("/catalog/filter/")) {
    filtersPart = pathname.split("/catalog/filter/")[1]?.split("/")[0] || "";
  }
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get("query") || "";
  console.log("queryQQQ: ", query);
  if (!filtersPart)
    return { brands: [], categories: [], price: [], page: 1, query };
  console.log("filtersPart", filtersPart);
  const filters = filtersPart.split(";").reduce(
    (acc, param) => {
      const [key, value] = param.split("=");
      if (!key || !value) return acc;

      const valuesArray = value.split(",");

      switch (key) {
        case "brands":
          acc.brands = valuesArray.map(Number).filter((num) => !isNaN(num));
          break;
        case "categories":
          acc.categories = valuesArray.map(Number).filter((num) => !isNaN(num));
          break;
        case "price":
          acc.price = valuesArray.map(Number).filter((num) => !isNaN(num));
          break;
        case "page":
          acc.page = parseInt(value, 10) || 1;
          break;
        default:
          break;
      }

      return acc;
    },
    { brands: [], categories: [], price: [], page: 1, query }
  );
  return filters;
};

export const useSelectedFilters = () => {
  const location = useLocation(); // Використовуємо useLocation для відстеження змін URL
  const allCategories = useSelector(selectAllCategories);
  const allBrands = useSelector(selectBrandsCount);

  // Парсимо фільтри з актуального URL
  const filters = useMemo(
    () => parseFiltersFromUrl(location.pathname),
    [location.pathname]
  );
  // console.log("filters from useSelectedFilters.js: ", filters.price);
  // console.log('filters',filters);

  const flattenCategories = (categories) => {
    const result = [];

    const traverse = (category) => {
      result.push({
        idTorgsoft: category.idTorgsoft,
        name: category.name,
      });

      if (category.children && category.children.length > 0) {
        category.children.forEach(traverse);
      }
    };

    categories.forEach(traverse);
    return result;
  };
  const flattenedCategories = useMemo(
    () => flattenCategories(allCategories),
    [allCategories]
  );
  // console.log('flattenedCategories: ', flattenedCategories);

  // Обчислюємо обрані бренди та категорії
  const selectedBrands = useMemo(() => {
    return allBrands.filter((brand) =>
      filters.brands.includes(brand.idTorgsoft)
    );
  }, [filters.brands, allBrands]);
  const selectedSections = useMemo(() => {
    return flattenedCategories.filter((category) =>
      filters.categories.includes(category.idTorgsoft)
    );
  }, [filters.categories, flattenedCategories]);

  const selectedPriceRange = useMemo(() => {
    if (filters.price && Array.isArray(filters.price)) {
      const [minPrice, maxPrice] = filters.price.map(Number);
      return { minPrice, maxPrice };
    }
    return null;
  }, [filters.price]);

  return { selectedBrands, selectedSections, selectedPriceRange, filters };
};
