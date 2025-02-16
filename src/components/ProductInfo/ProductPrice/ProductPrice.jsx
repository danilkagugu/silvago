import css from "./ProductPrice.module.css";
import FavoritesService from "../FavoritesService/FavoritesService";

const ProductPrice = ({
  volume,
  product,
  handleToggleFavorite,
  isFavorite,
  loading,
}) => {
  const isDiscount = Number(volume.discount) > 0;
  console.log("isDiscount: ", isDiscount);
  return (
    <div className={css.productPriceContainer}>
      <div className={css.productPriceWrapper}>
        <div className={`${css.productBlock} ${css.productBlockI}`}>
          <div className={css.productPrice}>
            <div className={css.productPriceBox}>
              <div
                className={`${css.productPriceItem} ${
                  isDiscount ? css.productPriceItemNew : ""
                }`}
              >
                {isDiscount ? volume.discountPrice : volume.retailPrice} ₴
              </div>
              {isDiscount && (
                <div className={css.productOldPrice}>
                  {volume.retailPrice} ₴
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={css.productBlock}>
          <FavoritesService
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            product={product}
            volume={volume}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;
