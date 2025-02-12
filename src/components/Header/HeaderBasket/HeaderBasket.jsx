import { BsBasket } from "react-icons/bs";
import css from "./HeaderBasket.module.css";
import {
  selectAllQuantity,
  selectTotalPrice,
} from "../../../redux/basket/selectors";
import { useSelector } from "react-redux";
const HeaderBasket = () => {
  const totalPrice = useSelector(selectTotalPrice);
  const allQuantity = useSelector(selectAllQuantity);
  return (
    <div className={css.basket}>
      <div>
        <div className={css.basketIcon}>
          <BsBasket className={css.basketIconSvg} />
          <div className={css.basketItemsCount}>{allQuantity}</div>
        </div>
        <div className={css.basketContents}>
          <div className={css.basketTitle}>Мій Кошик</div>
          {totalPrice > 0 && (
            <div className={css.basketValue}>{totalPrice} грн</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBasket;
