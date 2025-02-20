import { FiMinus } from "react-icons/fi";
import css from "./FavoriteProductActions.module.css";
import { FaPlus } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

const FavoriteProductActions = ({
  selectedVariation,
  handleQuantityChangee,
  handleInputChange,
  localQuantities,
  product,
  isFavorite,
  handleFavoriteToggle,
  handleAddToCart,
  quantityInCart,
  itemsCart,
}) => {
  // console.log("product", product);
  const isInCart = !!itemsCart.find(
    (item) =>
      item.productId === product.productId &&
      item.selectedVariation.idTorgsoft === selectedVariation.idTorgsoft
  );

  return (
    <>
      {selectedVariation?.quantity > 0 && (
        <div>
          <div className={css.catalogCardFooterButtons}>
            <div className={css.catalogCardFooterOrder}>
              <div className={css.counter}>
                <div className={css.counterContainer}>
                  <button
                    className={`${css.counterBtn} `}
                    onClick={() =>
                      handleQuantityChangee(
                        (localQuantities[selectedVariation.idTorgsoft] ??
                          quantityInCart) - 1
                      )
                    }
                  >
                    <FiMinus className={`${css.icon} ${css.iconMinus}`} />
                  </button>
                  <div className={css.counterInput}>
                    <input
                      className={css.counterField}
                      type="text"
                      // value={quantities[selectedVariation.idTorgsoft]}
                      value={localQuantities[selectedVariation.idTorgsoft] ?? 1}
                      min={"1"}
                      max={product.selectedVariation.quantity}
                      onChange={(e) => handleInputChange(e, product)}
                      onBlur={() =>
                        handleQuantityChangee(
                          localQuantities[selectedVariation.idTorgsoft] ??
                            quantityInCart
                        )
                      }
                    />
                  </div>
                  <button
                    className={`${css.counterBtn}
                    
                    ${
                      (localQuantities[selectedVariation.idTorgsoft] ??
                        quantityInCart) >= selectedVariation.quantity
                        ? css.disabled
                        : ""
                    }
                    `}
                    // disabled={quantity >= selectedVariation.quantity}
                    onClick={() =>
                      handleQuantityChangee(
                        (localQuantities[selectedVariation.idTorgsoft] ??
                          quantityInCart) + 1
                      )
                    }
                    disabled={
                      (localQuantities[selectedVariation.idTorgsoft] ||
                        quantityInCart) >= selectedVariation.quantity
                    }
                  >
                    <FaPlus className={`${css.icon} ${css.iconPlus}`} />
                  </button>
                </div>
              </div>
              <button
                className={`${css.btn} ${css.special} ${
                  isInCart ? css.inBasket : ""
                }`}
                onClick={handleAddToCart}
              >
                <span className={`${css.btnText}`}>
                  {isInCart ? "В кошику" : "Купити"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={css.catalogCardToolbar}>
        <div className={css.catalogCardToolbarItem}>
          <button
            className={css.favoritesButton}
            onClick={handleFavoriteToggle}
          >
            <span className={css.favoritesButtonIcon}>
              <CiHeart
                className={`${css.icon} ${css.iconHeart} ${
                  isFavorite ? css.isFavorite : ""
                }`}
              />
            </span>
            <div className={css.favoritesButtonText}>
              {isFavorite ? "В бажаннях" : "В бажання"}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default FavoriteProductActions;
