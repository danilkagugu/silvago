import BasketRigth from "../../components/Basket/BasketRigth";
import BasketContactData from "../../components/BasketContactData/BasketContactData";
import Header from "../../components/Header/Header";

import css from "./Basket.module.css";

const Basket = () => {
  return (
    <div>
      <Header />
      <div className={css.containerBasket}>
        <BasketContactData />
        <BasketRigth />
      </div>
    </div>
  );
};

export default Basket;
