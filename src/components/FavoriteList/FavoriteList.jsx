import css from "./FavoriteList.module.css";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import { removeProductFavorite } from "../../redux/product/operations";
import { useDispatch } from "react-redux";

const FavoriteList = ({ favoriteProducts, id }) => {
  const dispatch = useDispatch();

  const handleRemoveFavorite = async (productId, volumeId) => {
    try {
      dispatch(removeProductFavorite({ productId, volumeId }));
    } catch (error) {
      console.error("Error removing favorite product: ", error);
    }
  };

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
              key={`${item?.selectedVariation?.idTorgsoft}`}
              className={css.listItem}
              id={item.volumeId}
            >
              <FavoriteItem
                product={item}
                handleRemoveFavorite={handleRemoveFavorite}
                favoriteProducts={favoriteProducts}
                id={id}
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
