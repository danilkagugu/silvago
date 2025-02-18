import { FiMinus } from "react-icons/fi";
import css from "./FavoriteProductActions.module.css";
import { FaPlus } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

const FavoriteProductActions = ({
  volumeDetail,
  quantities,
  handleQuantityChange,

  isFavorite,
  handleFavoriteToggle,
  handleAddToCart,
  quantity,
  setQuantity,
}) => {
  return (
    <>
      {volumeDetail?.quantity > 0 && (
        <div>
          <div className={css.catalogCardFooterButtons}>
            <div className={css.catalogCardFooterOrder}>
              <div className={css.counter}>
                <div className={css.counterContainer}>
                  <button
                    className={`${css.counterBtn} ${
                      quantities[volumeDetail.idTorgsoft] === 1
                        ? css.disabled
                        : ""
                    }`}
                    // onClick={() => handleDecrement(volumeDetail.idTorgsoft)}
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                    <FiMinus className={`${css.icon} ${css.iconMinus}`} />
                  </button>
                  <div className={css.counterInput}>
                    <input
                      className={css.counterField}
                      type="number"
                      // value={quantities[volumeDetail.idTorgsoft]}
                      value={quantity}
                      min={1}
                      max={volumeDetail.quantity}
                      // onChange={(e) =>
                      //   handleQuantityChange(
                      //     volumeDetail.idTorgsoft,
                      //     parseInt(e.target.value, 10)
                      //   )
                      // }
                      onChange={handleQuantityChange}
                    />
                  </div>
                  <button
                    className={`${css.counterBtn}
                     ${
                       quantities[volumeDetail.idTorgsoft] ===
                       volumeDetail.quantity
                         ? css.disabled
                         : ""
                     }
                    `}
                    // onClick={() => handleIncrement(volumeDetail.idTorgsoft)}
                    // disabled={quantity >= volumeDetail.quantity}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <FaPlus className={`${css.icon} ${css.iconPlus}`} />
                  </button>
                </div>
              </div>
              <button
                className={`${css.btn} ${css.special}`}
                onClick={handleAddToCart}
              >
                <span className={css.btnText}>Купити</span>
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
