import { useSearchParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useCatalogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Парсимо фільтри з URL
  const filters = {
    brands: searchParams.get("brand")?.split(",") || [],
    categories: searchParams.get("category")?.split(",") || [],
    price: searchParams.get("price")
      ? searchParams.get("price").split("-").map(Number)
      : null,
    page: Number(searchParams.get("page")) || 1,
  };

  // Функція для оновлення фільтрів і синхронізації з URL
  const updateFilters = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();
      if (newFilters.price) {
        params.append("price", `${newFilters.price[0]}-${newFilters.price[1]}`);
      }

      if (newFilters.brands.length > 0) {
        params.append("brand", newFilters.brands.join(","));
      }

      if (newFilters.categories.length > 0) {
        params.append("category", newFilters.categories.join(","));
      }

      if (newFilters.page > 1) {
        params.append("page", newFilters.page);
      }

      // Оновлення URL
      setSearchParams(params);
      navigate(`/catalog/filter?${params.toString()}`, { replace: true });
    },
    [setSearchParams, navigate]
  );

  return { filters, updateFilters };
};
