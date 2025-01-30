export const buildFilterUrl = ({ brands, categories, price }) => {
  const filters = [];

  if (brands.length > 0) {
    filters.push(`brand=${brands.join(",")}`);
  }
  if (categories.length > 0) {
    filters.push(`category=${categories.join(",")}`);
  }
  if (price?.min !== null && price?.max !== null) {
    filters.push(`price=${price.min}-${price.max}`);
  }

  const filterString = filters.join("&");

  return `/catalog/filter/${filterString}`;
};
