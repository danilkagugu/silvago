import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import css from "./CatalogListItem.module.css";

const CatalogListItem = ({
  product,
  favoriteProducts,
  setFavoriteProducts,
  quantities,
  selectedVolume,
  handleQuantityChange,
  handleQuantityInputChange,
  handleVolumeSelect,
  handleAddToBasket,
  handleToggleFavorite,
}) => {
  const navigate = useNavigate();

  // Отримати ціну для обраного обсягу
  // const getPrice = () => {
  //   const volume = selectedVolume[product._id];
  //   if (volume) {
  //     const volumeDetail = product.volumes.find((vol) => vol.volume === volume);
  //     return volumeDetail ? volumeDetail.price : product.volumes[0]?.price;
  //   }
  //   return product.volumes[0]?.price;
  // };
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
  // const getPrice = () => {
  //   const volume = selectedVolume[product._id];
  //   if (volume) {
  //     const volumeDetail = product.volumes.find((vol) => vol.volume === volume);
  //     if (volumeDetail) {
  //       // Обчислюємо ціну зі знижкою
  //       return volumeDetail.price * (1 - volumeDetail.discount / 100);
  //     }
  //   }
  //   const defaultVolume = product.volumes[0];
  //   return defaultVolume
  //     ? defaultVolume.price * (1 - defaultVolume.discount / 100)
  //     : 0;
  // };

  // Обробка кліку на товар
  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className={css.cardContainer}>
      {/* Кнопка обраного товару */}
      {favoriteProducts.has(product._id) ? (
        <FaHeart
          className={css.iconFavorite}
          onClick={() =>
            handleToggleFavorite(
              product._id,
              favoriteProducts,
              setFavoriteProducts
            )
          }
        />
      ) : (
        <CiHeart
          className={css.iconFavorite}
          onClick={() =>
            handleToggleFavorite(
              product._id,
              favoriteProducts,
              setFavoriteProducts
            )
          }
        />
      )}

      {/* Інформація про товар */}
      <div className={css.cardBox} onClick={handleProductClick}>
        <div className={css.imgBox}>
          <img
            className={css.imgBrand}
            src={product.image}
            alt={product.name}
          />
        </div>
        {/* <div className={css.boxInfo}>
          <p className={css.brandTitle}>{product.name}</p>
          <p className={css.brandPrice}>{getPrice()} грн</p>
        </div> */}

        {/* Це якщо буде писатись з перечеркнутой ціною */}
        <div className={css.boxInfo}>
          <p className={css.brandTitle}>{product.name}</p>
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

      {/* Контейнери для кількості і кнопки */}
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
              product._id,
              quantities[product._id],
              selectedVolume[product._id]
            )
          }
        >
          Купити
        </button>
      </div>

      {/* Обсяги товару */}
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

export default CatalogListItem;
