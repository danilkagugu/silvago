import BasketRigth from "../../components/Basket/BasketRigth";
import BasketContactData from "../../components/BasketContactData/BasketContactData";

import Layout from "../../components/Layout/Layout";

import css from "./Basket.module.css";

const Basket = () => {
  return (
    <Layout>
      <div className={css.containerBasket}>
        <BasketContactData />
        <BasketRigth />
      </div>
    </Layout>
  );
};

export default Basket;
