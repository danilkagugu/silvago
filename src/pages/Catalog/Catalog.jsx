import Layout from "../../components/Layout/Layout";

import CatalogList from "../../components/CatalogList/CatalogList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrandsTorgsoft, fetchAllCategories } from "../../redux/inventoryStore/operations";
import { fetchPriceRenge, getAllProductTorgsoft, getCountProductByFilters } from "../../redux/product/operations";
import { selectBrandsCount, selectCategoriesCount, selectProductLoading } from "../../redux/product/selectors";
import LoaderSilvago from "../../components/LoaderSilvago/LoaderSilvago";

const Catalog = () => {
const dispatch = useDispatch()

const brandsCount = useSelector(selectBrandsCount);
const categoriesCount = useSelector(selectCategoriesCount);
// console.log('categoriesCount: ', categoriesCount);
const loading = useSelector(selectProductLoading);
// console.log('loading: ', loading);

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(getCountProductByFilters());
    dispatch(getAllProductTorgsoft());
    dispatch(fetchPriceRenge());
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await Promise.all([
  //       dispatch(fetchAllCategories()),
  //       dispatch(getCountProductByFilters()),
  //       dispatch(getAllProductTorgsoft()),
  //       dispatch(fetchPriceRenge()),
  //     ]);
  //   };
  //   fetchData();
  // }, [dispatch]);

 
  return (
    <Layout>
      {loading && <LoaderSilvago/>}
      <CatalogList brandsCount={brandsCount}/>
    </Layout>
  );
};

export default Catalog;
