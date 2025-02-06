import { Link } from "react-router-dom";
import classNames from "classnames";
import sale from "../../../assets/img/sale.png";
import topProduct from "../../../assets/img/top-product.png";
import css from "./ProductImage.module.css";

const ProductImage = ({ volumeDetail, isTopProduct }) => {
  return (
    <div className={css.catalogCardTop}>
      <Link
        className={classNames(css.catalogCardImageLink, {
          [css.disabledImg]: volumeDetail.quantity === 0,
        })}
        to={`/product/${volumeDetail.slug}`}
      >
        <div className={css.catalogCardImage}>
          <img
            className={classNames(css.productImg)}
            src={volumeDetail.image}
            alt={volumeDetail.fullName}
            height={310}
            width={310}
            loading="lazy"
          />
        </div>
      </Link>
      <div className={css.productSticker}>
        {isTopProduct && (
          <div className={css.productStickerImage}>
            <span className={css.productStickerImageWrap}>
              <img
                className={css.productStickerImg}
                src={topProduct}
                alt="Топ"
              />
            </span>
          </div>
        )}
        {volumeDetail && volumeDetail.discount > 0 && (
          <div className={css.productStickerImage}>
            <span className={css.productStickerImageWrap}>
              <img className={css.productStickerImg} src={sale} alt="Знижка" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
