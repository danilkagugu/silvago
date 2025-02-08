import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectBrandsCount } from "../redux/product/selectors";
import { selectAllCategories } from "../redux/inventoryStore/selectors";
import { useLocation } from "react-router-dom";

/**
 * Функція для парсингу фільтрів з URL у новому форматі
 * @param {string} pathname - Поточний шлях
 * @returns {Object} - Об'єкт фільтрів
 */
export const parseFiltersFromUrl = (pathname) => {
  // console.log('pathname: ', pathname);
  const filterPart = pathname.split("/catalog/filter/")[1]?.split("/")[0];

  if (!filterPart) return { brands: [], categories: [], price: [], page: 1 };

  const filters = filterPart.split(";").reduce(
    (acc, param) => {
      const [key, value] = param.split("=");
      if (!key || !value) return acc;

      const valuesArray = value.split(",");
      // console.log("valuesArray: ", valuesArray);
      // console.log('value: ', value);

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
    { brands: [], categories: [], price: [], page: 1 }
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

  // Обчислюємо обрані бренди та категорії
  const selectedBrands = useMemo(() => {
    return allBrands.filter((brand) => filters.brands.includes(brand.numberId));
  }, [filters.brands, allBrands]);
  const selectedSections = useMemo(() => {
    return allCategories.filter((category) =>
      filters.categories.includes(category.idTorgsoft)
    );
  }, [filters.categories, allCategories]);

  return { selectedBrands, selectedSections, filters };
};
