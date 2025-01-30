import { Link } from "react-router-dom";
import css from "./ProductInfo.module.css";
const ProductInfo = ({ product, volumeDetail }) => {
  return (
    <div className={css.catalogCardInfo}>
      <div className={css.catalogCardBrand}>{product.brand}</div>
      <div className={css.catalogCardTitle}>
        <Link
          className={css.catalogCardTitle}
          to={`/product/${volumeDetail.slug}`}
        >
          {volumeDetail.fullName}
        </Link>
      </div>
      <div className={css.catalogCardPriceBox}>
        <div
          className={`${css.catalogCardPrice} ${
            volumeDetail.quantity === 0 ? css.lightPrice : ""
          }`}
        >
          {volumeDetail.retailPrice} грн
        </div>
        {volumeDetail.discount > 0 && (
          <div className={css.catalogCardOldPrice}>
            {volumeDetail.discountPrice} грн
          </div>
        )}
      </div>
      <div
        className={`${css.catalogCardAvailable} ${
          volumeDetail.quantity === 0 ? css.notAvailable : ""
        }`}
      >
        {volumeDetail.quantity > 0 ? "В наявності" : "Немає в наявності"}
      </div>
    </div>
  );
};

export default ProductInfo;
