import { useEffect, useState } from "react";
import { getFavoriteProduct } from "../../services/productApi";
import css from "./FavoriteList.module.css";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import { removeProductFavorite } from "../../redux/product/operations";
import { useDispatch } from "react-redux";

const FavoriteList = () => {
  const [productsFavorite, setProductsFavorite] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState({});
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getFavoriteProduct();

        const products = response;
        setProductsFavorite(products);

        const initialQuantities = {};
        const initialVolume = {};

        if (Array.isArray(products)) {
          products.forEach((item) => {
            if (Array.isArray(item.products)) {
              item.products.forEach((product) => {
                if (Array.isArray(product.volumes)) {
                  const defaultVolume = getDefaultVolume(product.volumes);

                  initialQuantities[product._id] = 1;

                  if (defaultVolume) {
                    initialVolume[product._id] = defaultVolume;
                  }
                }
              });
            }
          });
        }

        setQuantities(initialQuantities);
        setSelectedVolume(initialVolume);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const getDefaultVolume = (volumes) => {
    if (!volumes || volumes.length === 0) return 0;
    return volumes.reduce(
      (maxVol, vol) => (vol.volume > maxVol ? vol.volume : maxVol),
      0
    );
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      dispatch(removeProductFavorite(productId));

      setProductsFavorite((prevFavorites) =>
        prevFavorites.map((product) => ({
          ...product,
          products: product.products.filter(
            (item) => item.product !== productId
          ),
        }))
      );
    } catch (error) {
      console.error("Error removing favorite product: ", error);
    }
  };

  const handleVolumeSelect = (productId, volume) => {
    setSelectedVolume((prev) => ({
      ...prev,
      [productId]: volume,
    }));
  };

  const handleQuantityChange = (productId, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
    }));
  };

  const handleQuantityInputChange = (productId, value) => {
    const newValue = Math.max(1, parseInt(value, 10) || 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newValue,
    }));
  };
  const isMobile = window.innerWidth <= 1440;

  return (
    <div className={css.container}>
      {productsFavorite.length > 0 &&
      productsFavorite.some((fav) => fav.products.length > 0) ? (
        <ul className={isMobile ? `${css.goods} ${css.goodsGrid}` : css.list}>
          {productsFavorite.map((product) =>
            product.products.map((item) => (
              <li
                key={`${product._id}-${item.product}`}
                className={isMobile ? css.goodsItem : css.listItem}
                id={item.product}
              >
                <FavoriteItem
                  product={item}
                  selectedVolume={selectedVolume}
                  handleRemoveFavorite={handleRemoveFavorite}
                  handleVolumeSelect={handleVolumeSelect}
                  handleQuantityChange={handleQuantityChange}
                  quantities={quantities}
                  handleQuantityInputChange={handleQuantityInputChange}
                />
              </li>
            ))
          )}
        </ul>
      ) : (
        <p>товару ще немає</p>
      )}
    </div>
  );
};

export default FavoriteList;
