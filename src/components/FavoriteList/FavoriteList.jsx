import { useEffect, useState } from "react";
import css from "./FavoriteList.module.css";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import {
  getFavoriteProducts,
  removeProductFavorite,
} from "../../redux/product/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectFavoritesProducts } from "../../redux/product/selectors";
import { selectUserData } from "../../redux/auth/selectors";

const FavoriteList = () => {
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavoritesProducts);
  const { id } = useSelector(selectUserData);
  console.log("favoriteProducts: ", favoriteProducts);

  useEffect(() => {
    dispatch(getFavoriteProducts(id));
  }, [dispatch, id]);

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

  // const isMobile = window.innerWidth <= 1440;
  console.log("favoriteProducts", favoriteProducts);
  return (
    <section className={css.wishlist}>
      <header className={css.wishlistHeader}>
        <h1 className={css.wishlistTitle}>Обране</h1>
        <span className={css.btnClearList}>Очистити</span>
      </header>

      {favoriteProducts.length > 0 ? (
        <ul className={css.catalogGrid}>
          {favoriteProducts.map((item) => (
            <li
              key={`${item.volumeId}-${item.product}`}
              className={css.listItem}
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
    </section>
  );
};

export default FavoriteList;
