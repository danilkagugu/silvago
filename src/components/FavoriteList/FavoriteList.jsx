import css from "./FavoriteList.module.css";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import { clearFavorites } from "../../redux/product/operations";
import { useDispatch } from "react-redux";

const FavoriteList = ({ favoriteProducts, id, itemsCart }) => {
  const dispatch = useDispatch();

  const handleClearFavorites = () => {
    if (window.confirm("Ви впевнені, що хочете очистити список улюблених?")) {
      dispatch(clearFavorites({ userId: id.id }));
    }
  };
  return (
    <section className={css.wishlist}>
      <header className={css.wishlistHeader}>
        <h1 className={css.wishlistTitle}>Обране</h1>
        {favoriteProducts.length > 0 && (
          <span className={css.btnClearList} onClick={handleClearFavorites}>
            Очистити
          </span>
        )}
      </header>

      {favoriteProducts.length > 0 ? (
        <ul className={css.catalogGrid}>
          {favoriteProducts.map((item, index) => (
            <li
              key={`${item?.selectedVariation?.idTorgsoft}-${index}`}
              className={css.listItem}
              id={item.volumeId}
            >
              <FavoriteItem
                product={item}
                favoriteProducts={favoriteProducts}
                id={id}
                itemsCart={itemsCart}
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
