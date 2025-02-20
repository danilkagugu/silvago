import css from "./ProductBuy.module.css";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

const ProductBuy = ({
  volume,
  handleAddToCart,
  handleQuantityChange,
  localQuantities,
  selectedVariation,
  quantityInCart,
  handleInputChange,
  product,
  isInCart,
}) => {
  // console.log("inBasket: ", inBasket);
  return (
    <div className={css.productSection}>
      <div className={css.productOrder}>
        <div className={css.productOrderBlock}>
          <div className={css.counter}>
            <div className={css.counterContainer}>
              <button
                className={css.counterBtn}
                onClick={() =>
                  handleQuantityChange(
                    (localQuantities[selectedVariation.idTorgsoft] ??
                      quantityInCart) - 1
                  )
                }
              >
                <FiMinus className={css.iconMinus} />
              </button>
              <div className={css.counterInput}>
                <input
                  className={css.counterField}
                  type="text"
                  value={localQuantities[selectedVariation.idTorgsoft] ?? 1}
                  min={"1"}
                  max={product.selectedVariation.quantity}
                  onChange={(e) => handleInputChange(e, product)}
                  onBlur={() =>
                    handleQuantityChange(
                      localQuantities[selectedVariation.idTorgsoft] ??
                        quantityInCart
                    )
                  }
                />
              </div>
              <button
                className={css.counterBtn}
                onClick={() =>
                  handleQuantityChange(
                    (localQuantities[selectedVariation.idTorgsoft] ??
                      quantityInCart) + 1
                  )
                }
                disabled={
                  (localQuantities[selectedVariation.idTorgsoft] ||
                    quantityInCart) >= selectedVariation.quantity
                }
              >
                <FaPlus className={css.iconPlus} />
              </button>
            </div>
          </div>
        </div>
        <div className={css.productOrderBlock}>
          {volume.quantity > 0 ? (
            <button
              className={`${css.btn} ${css.special} ${
                isInCart ? css.inBasket : ""
              }`}
              onClick={handleAddToCart}
            >
              <span className={css.btnText}>
                {isInCart ? "В кошику" : "Купити"}
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
