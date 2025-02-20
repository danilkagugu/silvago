import { Link } from "react-router-dom";
import css from "./FavoriteProductInfo.module.css";
const FavoriteProductInfo = ({ product, volumeDetail }) => {
  const isOutOfStock = volumeDetail?.quantity === 0;

  const hasDiscount = Number(volumeDetail?.discount) > 0;
  return (
    <div className={css.catalogCardInfo}>
      <div className={css.catalogCardBrand}>{product.brand}</div>
      <div className={css.catalogCardTitle}>
        <Link to={`/product/${volumeDetail?.slug}`}>
          {volumeDetail?.fullName}
        </Link>
      </div>
      <div className={css.catalogCardPriceBox}>
        {hasDiscount ? (
          <>
            <div
              className={`${css.catalogCardPrice} ${
                isOutOfStock ? css.lightPrice : ""
              } ${hasDiscount ? css.discountPrice : ""}`}
            >
              {volumeDetail?.discountPrice} грн
            </div>
            <div className={css.catalogCardOldPrice}>
              {volumeDetail?.retailPrice} грн
            </div>
          </>
        ) : (
          <div
            className={`${css.catalogCardPrice} ${
              volumeDetail?.quantity === 0 ? css.lightPrice : ""
            }`}
          >
            {volumeDetail?.retailPrice} грн
          </div>
        )}
      </div>
      <div
        className={`${css.catalogCardAvailable} ${
          isOutOfStock ? css.notAvailable : ""
        }`}
      >
        {isOutOfStock ? "Немає в наявності" : "В наявності"}
      </div>
    </div>
  );
};

export default FavoriteProductInfo;
