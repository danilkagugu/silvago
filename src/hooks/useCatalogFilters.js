import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useCatalogFilters = () => {
  const navigate = useNavigate();

  // Функція для формування URL у новому форматі
  const buildCustomUrl = (params) => {
    // Видаляємо параметри з дефолтними значеннями
    const validParams = Object.entries(params).filter(([key, value]) => {
      if (key === "page" && value === 1) return false; // Пропускаємо `page=1`
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && value !== "";
    });

    // Формуємо рядок запиту
    const queryString = validParams
      .map(([key, value]) => {
        if (Array.isArray(value)) return `${key}=${value.join(",")}`;
        return `${key}=${value}`;
      })
      .join(";");

    // Визначаємо базовий URL
    const hasFilters = validParams.length > 0;
    const baseUrl = hasFilters ? "/catalog/filter" : "/catalog";

    return queryString ? `${baseUrl}/${queryString}/` : baseUrl;
  };

  // Функція для оновлення фільтрів і синхронізації з URL
  const updateFilters = useCallback(
    (newFilters) => {
      // console.log("newFilters from useCatalogFilters.js: ", newFilters.price);
      // Формуємо новий URL
      const url = buildCustomUrl(newFilters);

      // Оновлюємо URL без перезавантаження сторінки
      navigate(url, { replace: true });
    },
    [navigate]
  );

  return { updateFilters };
};
