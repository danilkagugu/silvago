import { useEffect, useState } from "react";
import {
  deleteProductFromFavorite,
  getFavoriteProduct,
} from "../../services/productApi";
import css from "./FavoriteList.module.css";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import { CiTrash } from "react-icons/ci";

const FavoriteList = () => {
  const [productsFavorite, setProductsFavorite] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getFavoriteProduct();
      setProductsFavorite(product);
    };
    fetchProducts();
  }, []);

  // Функція для видалення продукту з обраних
  const handleRemoveFavorite = async (productId) => {
    try {
      // Видаляємо продукт із обраних через API
      await deleteProductFromFavorite(productId);

      // Оновлюємо стан, видаляючи продукт з масиву
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

  return (
    <div className={css.container}>
      {productsFavorite.length > 0 &&
      productsFavorite.some((fav) => fav.products.length > 0) ? (
        <ul className={css.list}>
          {productsFavorite.map((product) =>
            product.products.map((item) => (
              <li
                key={`${product._id}-${item.product}`}
                className={css.listItem}
                id={item.product}
              >
                <div className={css.cardContainer}>
                  <div className={css.cardBox}>
                    <CiTrash
                      className={css.iconTrash}
                      onClick={() => {
                        handleRemoveFavorite(item.product);
                      }}
                    />
                    <FavoriteItem
                      productImg={item.image}
                      productName={item.productName}
                      productPrice={item.productPrice}
                    />
                  </div>
                </div>
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
