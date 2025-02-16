import Layout from "../../components/Layout/Layout";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import css from "./ProductDetail.module.css";

const ProductDetail = () => {
  return (
    <Layout>
      <div className={css.wrapper}>
        <ProductInfo />
      </div>
    </Layout>
  );
};

export default ProductDetail;
