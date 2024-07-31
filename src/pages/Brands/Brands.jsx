import BrandsList from "../../components/BrandsList/BrandsList";
import css from "./Brands.module.css";

import Layout from "../../components/Layout/Layout";

const Brands = () => {
  return (
    <Layout>
      <div className={css.qqq}>
        <h1 className={css.title}>Бренди</h1>
        <BrandsList />
      </div>
    </Layout>
  );
};

export default Brands;
