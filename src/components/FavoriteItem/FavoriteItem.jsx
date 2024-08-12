import css from "./FavoriteItem.module.css";

const FavoriteItem = ({
  productImg,
  productName,
  productPrice,
  handleProductClick,
  item,
}) => {
  return (
    <div
      className={css.cardBox}
      onClick={() => handleProductClick(item.product)}
    >
      <div className={css.imgBox}>
        <img
          className={css.imgBrand}
          src={productImg}
          alt={productName}
          width={120}
          height={120}
        />
      </div>
      <div className={css.boxInfo}>
        <p className={css.brandInfo}>{productName}</p>
        <p className={css.brandInfo}>{productPrice} грн</p>
      </div>
    </div>
  );
};

export default FavoriteItem;
