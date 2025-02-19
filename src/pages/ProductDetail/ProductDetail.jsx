import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import ViewedProducts from "../../components/ViewedProducts/ViewedProducts";
import css from "./ProductDetail.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getFavoriteProducts,
  getProductById,
} from "../../redux/product/operations";
import {
  fetchAllBrandsTorgsoft,
  fetchAllCategories,
} from "../../redux/inventoryStore/operations";
import { getUserInfo } from "../../redux/auth/operations";
import { selectUserData } from "../../redux/auth/selectors";
import {
  selectFavoritesProducts,
  selectProductDetails,
  selectProductLoading,
} from "../../redux/product/selectors";
import {
  selectAllBrandsTorgsoft,
  selectAllCategories,
} from "../../redux/inventoryStore/selectors";
import Skeleton from "react-loading-skeleton";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const userData = useSelector(selectUserData) || {};
  // console.log("userData: ", userData);
  // console.log("id: ", id);
  const productDetails = useSelector(selectProductDetails);
  const brandsTorgsoft = useSelector(selectAllBrandsTorgsoft);
  const favorites = useSelector(selectFavoritesProducts);
  const categories = useSelector(selectAllCategories);
  const loading = useSelector(selectProductLoading);

  useEffect(() => {
    // dispatch(getFavoriteProducts(userData.id));
    dispatch(getProductById(slug));
    dispatch(fetchAllCategories());
    dispatch(fetchAllBrandsTorgsoft());
    dispatch(getUserInfo());
  }, [dispatch, slug, userData.id]);

  // useEffect(() => {
  //   dispatch(getFavoriteProducts(userData.id));
  // }, [dispatch, favorites.length, userData.id]);

  if (!productDetails) {
    return (
      <Layout>
        <div className={css.wrapper}>
          <Skeleton height={30} width={300} />
          <Skeleton height={400} />
          <Skeleton height={20} width="80%" />
          <Skeleton height={20} width="60%" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={css.wrapper}>
        <ProductInfo
          id={userData.id}
          productDetails={productDetails}
          brandsTorgsoft={brandsTorgsoft}
          favorites={favorites}
          categories={categories}
        />
      </div>
      <ViewedProducts />
    </Layout>
  );
};

export default ProductDetail;
