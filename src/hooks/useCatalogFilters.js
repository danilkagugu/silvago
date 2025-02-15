import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

export const useCatalogFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buildCustomUrl = (params) => {
    const validParams = Object.entries(params).filter(([key, value]) => {
      if (key === "page" && value === 1) return false;
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && value !== "";
    });

    const queryString = validParams
      .map(([key, value]) => {
        if (Array.isArray(value)) return `${key}=${value.join(",")}`;
        return `${key}=${value}`;
      })
      .join(";");

    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    const isCategoryPage = location.pathname.includes("/catalog/category/");
    const categorySlug = isCategoryPage
      ? location.pathname.split("/catalog/category/")[1]?.split("/")[0]
      : null;

    let baseUrl = "/catalog";

    if (categorySlug) {
      baseUrl +=
        validParams.length > 0
          ? `/category/${categorySlug}/filter`
          : `/category/${categorySlug}`;
    } else if (query) {
      baseUrl = `/catalog/search`;
      if (validParams.length > 0) {
        baseUrl += "/filter";
      }
    } else if (validParams.length > 0) {
      baseUrl = "/catalog/filter";
    }
    // return queryString ? `${baseUrl}/${queryString}` : baseUrl;
    return query
      ? `${baseUrl}${
          queryString ? `/${queryString}` : ""
        }?query=${encodeURIComponent(query)}`
      : queryString
      ? `${baseUrl}/${queryString}`
      : baseUrl;
  };

  const updateFilters = useCallback(
    (newFilters) => {
      const url = buildCustomUrl(newFilters);
      console.log("🔹 Оновлений URL:", url);
      navigate(url, { replace: true });
    },
    [navigate, location.pathname, location.search]
  );

  return { updateFilters };
};
