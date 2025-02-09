import Layout from "../../components/Layout/Layout";

import CatalogList from "../../components/CatalogList/CatalogList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
} from "../../redux/inventoryStore/operations";
import {
  fetchPriceRenge,
  getAllProductTorgsoft,
  getCountProductByFilters,
} from "../../redux/product/operations";
import {
  selectBrandsCount,
  selectCategoriesCount,
} from "../../redux/product/selectors";

const Catalog = () => {
  const dispatch = useDispatch();

  const brandsCount = useSelector(selectBrandsCount);
  const categoriesCount = useSelector(selectCategoriesCount);
   

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(getCountProductByFilters());
    dispatch(getAllProductTorgsoft());
    dispatch(fetchPriceRenge());
  }, [dispatch]);

  return (
    <Layout>
      <CatalogList brandsCount={brandsCount} categoriesCount={categoriesCount} />
    </Layout>
  );
};

export default Catalog;
