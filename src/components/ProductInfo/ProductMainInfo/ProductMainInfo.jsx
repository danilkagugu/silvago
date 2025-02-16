import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ProductBuy from "../ProductBuy/ProductBuy";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductTitle from "../ProductTitle/ProductTitle";
import ProductVolumeTone from "../ProductVolumeTone/ProductVolumeTone";
import css from "./ProductMainInfo.module.css";

const ProductMainInfo = ({
  product,
  volume,
  handleToggleFavorite,
  isFavorite,
  handleToneChange,
  handleVolumeChange,
  handleAddToBasket,
  quantities,
  slug,
  loading,
  breadcrumbs,
}) => {
  return (
    <div className={css.productGroup}>
      <div className={css.productGroupItem}>
        <div className={css.productGroupItemHeader}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <ProductTitle volume={volume} />
        </div>
      </div>

      <div className={css.productGroupItem}>
        <ProductPrice
          handleToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          product={product}
          volume={volume}
          loading={loading}
        />
      </div>

      <div className={css.productGroupItem}>
        <ProductVolumeTone
          handleToneChange={handleToneChange}
          handleVolumeChange={handleVolumeChange}
          product={product}
          volume={volume}
        />
      </div>
      <div className={css.productGroupItem}>
        <ProductBuy
          handleAddToBasket={handleAddToBasket}
          product={product}
          quantities={quantities}
          slug={slug}
          volume={volume}
        />
      </div>
    </div>
  );
};

export default ProductMainInfo;
