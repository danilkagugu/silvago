import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProductToBasket,
  addProductToFavorite,
  deleteProductFromFavorite,
  getFavoriteProduct,
  getProducts,
} from "../../services/productApi";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import CatalogItem from "../CatalogItem/CatalogItem";
import css from "./CatalogList.module.css";
import transliterate from "../../helpers/transliterate";

const CatalogList = () => {
  const { item } = useParams();
  const [products, setProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const product = await getProducts();
        setProducts(product);
        const initialQuantities = {};
        product.forEach((p) => {
          initialQuantities[p._id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFavoriteProducts = async () => {
      try {
        const favoriteData = await getFavoriteProduct();
        const favoriteSet = new Set();

        // Додаємо ідентифікатори улюблених продуктів у набір
        favoriteData.forEach((fav) =>
          fav.products.forEach((item) => favoriteSet.add(item.product))
        );

        setFavoriteProducts(favoriteSet);
      } catch (error) {
        console.log("Error fetching favorite products:", error);
      }
    };

    fetchProducts();
    fetchFavoriteProducts();
  }, []);

  const handleQuantityChange = (productId, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
    }));
  };

  const handleAddToBasket = async (productId, quantity) => {
    try {
      const data = await addProductToBasket(productId, quantity);
      console.log("Product added to basket:", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleFavorite = async (productId) => {
    try {
      if (favoriteProducts.has(productId)) {
        // Видалення з улюблених
        await deleteProductFromFavorite(productId);
        setFavoriteProducts((prevFavorites) => {
          const updatedFavorites = new Set(prevFavorites);
          updatedFavorites.delete(productId);
          return updatedFavorites;
        });
      } else {
        // Додавання до улюблених
        await addProductToFavorite(productId);
        setFavoriteProducts((prevFavorites) => {
          const updatedFavorites = new Set(prevFavorites);
          updatedFavorites.add(productId);
          return updatedFavorites;
        });
      }
    } catch (error) {
      console.log("Error toggling favorite product:", error);
    }
  };
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  const handleQuantityInputChange = (productId, value) => {
    const newValue = Math.max(1, parseInt(value, 10) || 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newValue,
    }));
  };
  return (
    <div>
      <ul className={css.list}>
        {products.map((product) => {
          // Compare transliterated subcategory to URL param
          const transliteratedSubcategory = transliterate(product.subcategory);
          if (item === transliteratedSubcategory) {
            return (
              <li key={product._id} className={css.listItem} id={product._id}>
                <div className={css.cardContainer}>
                  {favoriteProducts.has(product._id) ? (
                    <FaHeart
                      className={css.iconFavorite}
                      onClick={() => {
                        handleToggleFavorite(product._id);
                      }}
                    />
                  ) : (
                    <CiHeart
                      className={css.iconFavorite}
                      onClick={() => {
                        handleToggleFavorite(product._id);
                      }}
                    />
                  )}
                  {/* <CatalogItem
                    productImg={product.image}
                    productName={product.name}
                    productPrice={product.price}
                    id={product._id}
                    // onClick={() => handleProductClick(product._id)}
                  /> */}
                  <div
                    className={css.cardBox}
                    onClick={() => handleProductClick(product._id)}
                  >
                    <div className={css.imgBox}>
                      <img
                        className={css.imgBrand}
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className={css.boxInfo}>
                      <p className={css.brandTitle}>{product.name}</p>
                      <p className={css.brandPrice}>{product.price} грн</p>
                    </div>
                  </div>
                  <div className={css.priceBox}>
                    <div className={css.quantityContainer}>
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
                          value={quantities[product._id]}
                          onChange={(e) =>
                            handleQuantityInputChange(
                              product._id,
                              e.target.value
                            )
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
                        handleAddToBasket(product._id, quantities[product._id])
                      }
                    >
                      Купити
                    </button>
                  </div>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default CatalogList;
