import { useEffect, useState } from "react";
import { addProductToFavorite, getProducts } from "../../services/productApi";
import css from "./FavoriteList.module.css";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import { CiTrash } from "react-icons/ci";

const FavoriteList = () => {
  const [productsFavorite, setProductsFavorite] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProducts();
      setProductsFavorite(product);
    };
    fetchProducts();
  }, []);
  const handleToggleFavorite = async (productId) => {
    await addProductToFavorite(productId);
    setProductsFavorite((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, favorite: !product.favorite }
          : product
      )
    );
  };
  return (
    <div className={css.container}>
      {productsFavorite.length > 0 ? (
        <ul className={css.list}>
          {productsFavorite.map(
            (product, index) =>
              product.favorite && (
                <li key={index} className={css.listItem} id={product._id}>
                  <div className={css.cardContainer}>
                    <div className={css.cardBox}>
                      <CiTrash
                        className={css.iconTrash}
                        onClick={() => {
                          handleToggleFavorite(product._id);
                        }}
                      />
                      <FavoriteItem
                        productImg={product.image}
                        productName={product.name}
                        productPrice={product.price}
                      />
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
      ) : (
        <p>товару ще немає</p>
      )}
    </div>
  );
};

export default FavoriteList;
