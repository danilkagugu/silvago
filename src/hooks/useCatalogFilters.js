import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

export const useCatalogFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Функція для формування URL у новому форматі
  const buildCustomUrl = (params) => {
    // Видаляємо параметри з дефолтними значеннями
    const validParams = Object.entries(params).filter(([key, value]) => {
      if (key === "page" && value === 1) return false; // Пропускаємо `page=1`
      if (Array.isArray(value)) return value.length > 0; // Пропускаємо порожні масиви
      return value !== null && value !== undefined && value !== ""; // Пропускаємо пусті значення
    });

    // Формуємо рядок запиту
    const queryString = validParams
      .map(([key, value]) => {
        if (Array.isArray(value)) return `${key}=${value.join(",")}`;
        return `${key}=${value}`;
      })
      .join(";");

    // Визначаємо, чи є в URL категорія
    const isCategoryPage = location.pathname.includes("/catalog/category/");
    const categorySlug = isCategoryPage
      ? location.pathname.split("/catalog/category/")[1]?.split("/")[0]
      : null;

    // Формуємо базовий URL залежно від наявності категорії
    const baseUrl = categorySlug
      ? `/catalog/category/${categorySlug}${
          validParams.length > 0 ? "/filter" : ""
        }`
      : validParams.length > 0
      ? "/catalog/filter"
      : "/catalog";

    // Повертаємо фінальний URL
    return queryString ? `${baseUrl}/${queryString}` : baseUrl;
  };

  // Функція для оновлення фільтрів і синхронізації з URL
  const updateFilters = useCallback(
    (newFilters) => {
      // Формуємо новий URL
      const url = buildCustomUrl(newFilters);

      // Оновлюємо URL без перезавантаження сторінки
      navigate(url, { replace: true });
    },
    [navigate, location.pathname]
  );

  return { updateFilters };
};
