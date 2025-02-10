import Layout from "../../components/Layout/Layout";

import CatalogList from "../../components/CatalogList/CatalogList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../redux/inventoryStore/operations";
import {
  fetchPriceRenge,
  getAllProductTorgsoft,
  getCountProductByFilters,
} from "../../redux/product/operations";
import {
  selectBrandsCount,
  selectCategoriesCount,
} from "../../redux/product/selectors";
import { useSelectedFilters } from "../../hooks/useSelectedFilters";

const Catalog = () => {
  const dispatch = useDispatch();
  const { selectedBrands, selectedSections, selectedPriceRange, filters } =
    useSelectedFilters();

  const brandsCount = useSelector(selectBrandsCount);
  const categoriesCount = useSelector(selectCategoriesCount);
  // console.log('categoriesCount: ', categoriesCount);

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(getAllProductTorgsoft());
    dispatch(fetchPriceRenge());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCountProductByFilters(filters));
  }, [filters, dispatch]);

  return (
    <Layout>
      <CatalogList
        brandsCount={brandsCount}
        categoriesCount={categoriesCount}
        selectedBrands={selectedBrands}
        selectedSections={selectedSections}
        selectedPriceRange={selectedPriceRange}
        filters={filters}
      />
    </Layout>
  );
};

export default Catalog;
