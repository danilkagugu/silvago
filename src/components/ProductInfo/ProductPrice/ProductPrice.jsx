import css from "./ProductPrice.module.css";
import FavoritesService from "../FavoritesService/FavoritesService";

const ProductPrice = ({
  volume,
  product,
  handleToggleFavorite,
  isFavorite,
  loading,
}) => {
  // console.log("isFavorite", isFavorite);
  return (
    <div className={css.productPriceContainer}>
      <div className={css.productPriceWrapper}>
        <div className={css.productPrice}>
          <div className={css.price}>
            <div
              className={
                volume && volume.discount > 0 ? css.priceItemNew : css.priceItem
              }
            >
              {volume.discountPrice} ₴
            </div>
            {volume && volume.discount ? (
              <div className={css.productOldPrice}>{volume.retailPrice} ₴</div>
            ) : null}
          </div>
        </div>
        <FavoritesService
          handleToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          product={product}
          volume={volume}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProductPrice;
