import { useNavigate } from "react-router-dom";
import css from "./FavoriteItem.module.css";
import { CiTrash } from "react-icons/ci";

const FavoriteItem = ({
  product,
  selectedVolume,
  handleRemoveFavorite,
  handleVolumeSelect,
  handleQuantityChange,
  quantities,
  handleQuantityInputChange,
  handleAddToBasket,
}) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/product/${product.product}`);
  };
  const getPrice = () => {
    const volume = selectedVolume[product._id];
    const volumeDetail = product.volumes.find((vol) => vol.volume === volume);
    const defaultVolume = product.volumes[0];

    const newPrice = volumeDetail
      ? volumeDetail.price * (1 - volumeDetail.discount / 100)
      : defaultVolume
      ? defaultVolume.price * (1 - defaultVolume.discount / 100)
      : 0;
    const oldPrice = volumeDetail
      ? volumeDetail.price
      : defaultVolume
      ? defaultVolume.price
      : 0;

    return { newPrice, oldPrice };
  };

  return (
    <div className={css.cardContainer}>
      <CiTrash
        className={css.iconTrash}
        onClick={() => {
          handleRemoveFavorite(product.product);
        }}
      />
      <div className={css.cardBox} onClick={handleProductClick}>
        <div className={css.imgBox}>
          <img
            className={css.imgBrand}
            src={product.image}
            alt={product.productName}
          />
        </div>
        <div className={css.boxInfo}>
          <p className={css.brandInfo}>{product.productName}</p>

          {product.volumes.some((vol) => vol.discount > 0) && (
            <p className={css.brandPrice}>
              <span className={css.oldPrice}>{getPrice().oldPrice} грн</span>
              <span className={css.newPrice}>
                {Math.ceil(getPrice().newPrice)} грн
              </span>
            </p>
          )}
          {!product.volumes.some((vol) => vol.discount > 0) && (
            <p className={css.brandPrice}>{getPrice().oldPrice} грн</p>
          )}
        </div>
      </div>
      <div className={css.priceBox}>
        <div className={css.quantityBox}>
          <div className={css.quantityInputWrapper}>
            <button
              className={css.quantityButton}
              onClick={() => handleQuantityChange(product._id, -1)}
            >
              -
            </button>
            <input
              type="text"
              className={css.quantityInput}
              value={quantities[product._id] || 1}
              onChange={(e) =>
                handleQuantityInputChange(product._id, e.target.value)
              }
              min="1"
            />
            <button
              className={css.quantityButton}
              onClick={() => handleQuantityChange(product._id, 1)}
            >
              +
            </button>
          </div>
        </div>
        <button
          className={css.buyButton}
          onClick={() =>
            handleAddToBasket(
              product.product,
              quantities[product._id],
              selectedVolume[product._id]
            )
          }
        >
          Купити
        </button>
      </div>
      <div className={css.volumeOptions}>
        {product.volumes.map((vol) => (
          <button
            key={vol._id}
            className={`${css.volumeOption} ${
              selectedVolume[product._id] === vol.volume ? css.selected : ""
            }`}
            onClick={() => handleVolumeSelect(product._id, vol.volume)}
          >
            {vol.volume} мл
          </button>
        ))}
      </div>
    </div>
  );
};

export default FavoriteItem;
