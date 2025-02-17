import Layout from "../../components/Layout/Layout";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import ViewedProducts from "../../components/ViewedProducts/ViewedProducts";
import css from "./ProductDetail.module.css";

const ProductDetail = () => {
  return (
    <Layout>
      <div className={css.wrapper}>
        <ProductInfo />
      </div>
      <ViewedProducts />
    </Layout>
  );
};

export default ProductDetail;
