import { useSelector } from "react-redux";
import css from "./ProductBuy.module.css";
import { selectBasket } from "../../../redux/basket/selectors";

const ProductBuy = ({ volume, handleAddToCart }) => {
  const basketProduct = useSelector(selectBasket);
  // console.log("volume: ", volume);
  const inBasket = basketProduct.some(
    (item) => item.idTorgsoft === volume.idTorgsoft
  );
  // console.log("inBasket: ", inBasket);
  return (
    <div className={css.productSection}>
      <div className={css.productOrder}>
        <div className={css.productOrderBlock}>
          {volume.quantity > 0 ? (
            <button
              className={`${css.btn} ${css.special} ${
                inBasket ? css.inBasket : ""
              }`}
              onClick={handleAddToCart}
            >
              <span className={css.btnText}>
                {inBasket ? "В кошику" : "Купити"}
              </span>
            </button>
          ) : (
            <p className={`${css.productBuyBtn} ${css.productMiss}`}>
              Повідомити коли з&apos;явиться в наявності
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBuy;
