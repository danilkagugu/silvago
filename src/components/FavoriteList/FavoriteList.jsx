import css from "./FavoriteList.module.css";
import FavoriteItem from "../FavoriteItem/FavoriteItem";

const FavoriteList = ({ favoriteProducts, id }) => {
  return (
    <section className={css.wishlist}>
      <header className={css.wishlistHeader}>
        <h1 className={css.wishlistTitle}>Обране</h1>
        <span className={css.btnClearList}>Очистити</span>
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
