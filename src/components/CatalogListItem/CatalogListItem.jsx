import { useNavigate } from "react-router-dom";

import css from "./CatalogListItem.module.css";
import { useEffect, useState } from "react";
import { getTopSellingProduct } from "../../services/productApi";

import { LuHeart } from "react-icons/lu";
import {
  addProductFavorite,
  getFavoriteProducts,
  removeProductFavorite,
} from "../../redux/product/operations";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/basket/operations";
import { selectFavoritesProducts } from "../../redux/product/selectors";

const CatalogListItem = ({ product, quantities, selectedVolume }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(selectFavoritesProducts);
  const [topProducts, setTopProducts] = useState([]);
  const [localFavorites, setLocalFavorites] = useState([]);
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await dispatch(getFavoriteProducts()).unwrap();
        setLocalFavorites(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavorites();
  }, [dispatch]);

  useEffect(() => {
    setLocalFavorites(favorites);
  }, [favorites]);

  const handleToggleFavorite = async (product) => {
    if (!product || !product._id) {
      console.warn("Product is invalid.");
      return;
    }

    const isFavorite = localFavorites.some((item) => item._id === product._id);

    if (isFavorite) {
      dispatch(removeProductFavorite(product._id));
    } else {
      dispatch(addProductFavorite(product._id));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTopSellingProduct();
        setTopProducts(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const isTopProduct = topProducts.some(
    (topProduct) => topProduct._id === product._id
  );

  const getPrice = () => {
    const volumeDetail =
      product.volumes.find(
        (vol) => vol.volume === selectedVolume[product._id]
      ) || product.volumes[0];
    const discount = volumeDetail.discount || 0;
    const oldPrice = volumeDetail.price;
    const newPrice = oldPrice * (1 - discount / 100);
    return { newPrice, oldPrice };
  };

  // Обробка кліку на товар
  const handleProductClick = () => {
    const volumeDetail = product.volumes.find(
      (vol) => vol.volume === selectedVolume[product._id]
    );

    if (volumeDetail) {
      navigate(`/product/${volumeDetail.slug}`);
    }
  };

  const volumeDetail = product.volumes.find(
    (vol) => vol.volume === selectedVolume[product._id]
  );
  // console.log("volumeDetail", volumeDetail);
  const handleAddToBasket = () => {
    dispatch(
      addProduct({
        slug: volumeDetail.slug,
        quantity: quantities[product._id],
        volume: selectedVolume[product._id],
        price: volumeDetail.price,
      })
    );
  };
  const isFavorite = localFavorites.some((item) => item._id === product._id);
  return (
    <div className={css.cardContainer} id={product._id}>
      <LuHeart
        className={isFavorite ? css.isFavoriteProduct : css.iconFavorite}
        onClick={() => handleToggleFavorite(product)}
      />

      {/* Інформація про товар */}
      <div className={css.cardBox} onClick={handleProductClick}>
        <div className={css.imgBox}>
          {volumeDetail && (
            <img
              className={css.imgBrand}
              src={volumeDetail.image}
              alt={product.name}
            />
          )}
        </div>

        {/* Це якщо буде писатись з перечеркнутой ціною */}
        <div className={css.boxInfo}>
          <p className={css.brandTitle}>{product.name}</p>
          {product.volumes.some((vol) => vol.discount > 0) && (
            <p className={css.brandPrice}>
              <span className={css.oldPrice}>{getPrice().oldPrice} ₴</span>
              <span className={css.newPrice}>
                {Math.ceil(getPrice().newPrice)} ₴
              </span>
            </p>
          )}
          {!product.volumes.some((vol) => vol.discount > 0) && (
            <p className={css.brandPrice}>{getPrice().oldPrice} ₴</p>
          )}
          <div className={css.productAction}>
            {product.volumes.some((vol) => vol.discount > 0) && (
              <div className={`${css.sell} `}>Sell</div>
            )}
            {isTopProduct && <div className={css.top}>Top</div>}
          </div>
        </div>
      </div>

      {/* Контейнери для кількості і кнопки */}
      <div className={css.priceBox}>
        <button className={css.buyButton} onClick={handleAddToBasket}>
          Купити
        </button>
      </div>

      {/* Обсяги товару */}
      {/* <div className={css.volumeOptions}>
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
      </div> */}
    </div>
  );
};

export default CatalogListItem;
