import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ProductBuy from "../ProductBuy/ProductBuy";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductTitle from "../ProductTitle/ProductTitle";
import ProductVolumeTone from "../ProductVolumeTone/ProductVolumeTone";
import css from "./ProductMainInfo.module.css";

const ProductMainInfo = ({
  categories,
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
    <>
      <div className={css.productGroupItemHeader}>
        {/* ТУТ НАДА ЗРОБИТЬ НАВІГАЦІЮ ПО МЕНЮ */}

        <Breadcrumbs
          categories={categories}
          product={product}
          volume={volume}
          breadcrumbs={breadcrumbs}
        />
        {/* ТУТ НАДА ЗРОБИТЬ НАВІГАЦІЮ ПО МЕНЮ */}
        <ProductTitle volume={volume} />
      </div>

      <ProductPrice
        handleToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
        product={product}
        volume={volume}
        loading={loading}
      />

      <ProductVolumeTone
        handleToneChange={handleToneChange}
        handleVolumeChange={handleVolumeChange}
        product={product}
        volume={volume}
      />

      <ProductBuy
        handleAddToBasket={handleAddToBasket}
        product={product}
        quantities={quantities}
        slug={slug}
        volume={volume}
      />
    </>
  );
};

export default ProductMainInfo;
