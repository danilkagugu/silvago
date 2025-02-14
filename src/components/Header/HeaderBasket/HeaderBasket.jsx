import { BsBasket } from "react-icons/bs";
import css from "./HeaderBasket.module.css";

const HeaderBasket = ({ totalPrice, allQuantity, login }) => {
  return (
    <div className={css.basket}>
      <div className={css.basketBox}>
        <div className={css.basketIcon}>
          <BsBasket className={css.basketIconSvg} />
          {login && <div className={css.basketItemsCount}>{allQuantity}</div>}
        </div>
        <div className={css.basketContents}>
          <div className={css.basketTitle}>Мій Кошик</div>
          {totalPrice > 0 && login && (
            <div className={css.basketValue}>{totalPrice} грн</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBasket;
