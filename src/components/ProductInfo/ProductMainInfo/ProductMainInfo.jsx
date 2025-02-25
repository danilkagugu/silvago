import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ProductBuy from "../ProductBuy/ProductBuy";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductTitle from "../ProductTitle/ProductTitle";
import ProductVolumeTone from "../ProductVolumeTone/ProductVolumeTone";
import css from "./ProductMainInfo.module.css";

const ProductMainInfo = ({
  product,
  volume,
  handleFavoriteToggle,
  isFavorite,
  handleToneChange,
  handleVolumeChange,
  handleAddToCart,
  loading,
  breadcrumbs,
  handleQuantityChange,
  localQuantities,
  selectedVariation,
  quantityInCart,
  handleInputChange,
  isInCart,
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
          handleFavoriteToggle={handleFavoriteToggle}
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
          handleAddToCart={handleAddToCart}
          volume={volume}
          handleQuantityChange={handleQuantityChange}
          localQuantities={localQuantities}
          selectedVariation={selectedVariation}
          quantityInCart={quantityInCart}
          handleInputChange={handleInputChange}
          product={product}
          isInCart={isInCart}
        />
      </div>
    </div>
  );
};

export default ProductMainInfo;
