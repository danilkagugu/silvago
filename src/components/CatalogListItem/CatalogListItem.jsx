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
  const getPrice = () => {
    const volume = selectedVolume[product._id];
    if (volume) {
      const volumeDetail = product.volumes.find((vol) => vol.volume === volume);
      return volumeDetail ? volumeDetail.price : product.volumes[0]?.price;
    }
    return product.volumes[0]?.price;
  };

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
        <div className={css.boxInfo}>
          <p className={css.brandTitle}>{product.name}</p>
          <p className={css.brandPrice}>{getPrice()} грн</p>
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
