import { useEffect, useState } from "react";
import css from "./FavoriteList.module.css";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import {
  getFavoriteProducts,
  removeProductFavorite,
} from "../../redux/product/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectFavoritesProducts } from "../../redux/product/selectors";

const FavoriteList = () => {
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavoritesProducts);

  useEffect(() => {
    dispatch(getFavoriteProducts());
  }, [dispatch]);

  useEffect(() => {
    const initialQuantities = {};
    favoriteProducts.map((item) => {
      initialQuantities[item.volumeId] = 1;
    });

    setQuantities(initialQuantities);
  }, [favoriteProducts]);

  const handleRemoveFavorite = async (productId, volumeId) => {
    try {
      dispatch(removeProductFavorite({ productId, volumeId }));
    } catch (error) {
      console.error("Error removing favorite product: ", error);
    }
  };

  const isMobile = window.innerWidth <= 1440;

  return (
    <div className={css.container}>
      {favoriteProducts.length > 0 ? (
        <ul className={isMobile ? `${css.goods} ${css.goodsGrid}` : css.list}>
          {favoriteProducts.map((item) => (
            <li
              key={`${item.volumeId}-${item.product}`}
              className={isMobile ? css.goodsItem : css.listItem}
              id={item.volumeId}
            >
              <FavoriteItem
                product={item}
                handleRemoveFavorite={handleRemoveFavorite}
                quantities={quantities}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>товару ще немає</p>
      )}
    </div>
  );
};

export default FavoriteList;
