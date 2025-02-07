import {  useMemo } from "react";
import { useSelector } from "react-redux";
import { selectBrandsCount } from "../redux/product/selectors";
import { selectAllCategories } from "../redux/inventoryStore/selectors";
 

export const useSelectedFilters = (filters) => {
    const allCategories = useSelector(selectAllCategories);
    const allBrands = useSelector(selectBrandsCount);
  
    // Використання `useMemo` для уникнення зайвих рендерів
    const selectedBrands = useMemo(() => {
      return allBrands.filter((brand) => filters.brands.includes(String(brand.numberId)));
    }, [filters.brands, allBrands]);
    const selectedSections = useMemo(() => {
      return allCategories.filter((category) =>
        filters.categories.includes(String(category.idTorgsoft))
      );
    }, [filters.categories, allCategories]);
  
    return { selectedBrands, selectedSections };
  };