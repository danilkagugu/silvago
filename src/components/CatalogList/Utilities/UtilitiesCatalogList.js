export const filterProductsByBrandsAndSections = (
  products,
  selectedBrands,
  selectedSection
) => {
  return products.filter((item) => {
    const matchesBrand =
      selectedBrands.length > 0 ? selectedBrands.includes(item.brand) : true;
    const matchesSection =
      selectedSection.length > 0
        ? selectedSection.includes(item.subcategory)
        : true;

    return matchesBrand && matchesSection;
  });
};
