import BrandsList from "../../components/BrandsList/BrandsList";
import css from "./Brands.module.css";
import Header from "../../components/Header/Header";

const Brands = () => {
  return (
    <div className={css.qqq}>
      <Header />
      <h1 className={css.title}>Бренди</h1>
      <BrandsList />
    </div>
  );
};

export default Brands;
