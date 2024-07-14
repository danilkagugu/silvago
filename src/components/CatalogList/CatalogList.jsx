import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addProductToFavorite, getProducts } from "../../services/productApi";
import { CiHeart } from "react-icons/ci";
import CatalogItem from "../CatalogItem/CatalogItem";
import css from "./CatalogList.module.css";

const CatalogList = () => {
  const { item } = useParams();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProducts();
      setProducts(product);
      const initialQuantities = {};
      product.forEach((p) => {
        initialQuantities[p._id] = 1;
      });
      setQuantities(initialQuantities);
    };
    fetchProducts();
  }, []);
  console.log(products);
  const handleQuantityChange = (productId, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
    }));
  };
  const handleBuy = (productId) => {
    const quantity = quantities[productId];
    const productToAdd = products.find((product) => product._id === productId);
    if (productToAdd) {
      addToBasket(productToAdd);
    }
  };

  const addToBasket = (product) => {
    const existingItem = basket.find((item) => item._id === product._id);
    if (existingItem) {
      // If product already exists in basket, increase its quantity
      const updatedBasket = basket.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setBasket(updatedBasket);
    } else {
      // If product is not in basket, add it with quantity 1
      setBasket([...basket, { ...product, quantity: 1 }]);
    }
  };
  return (
    <div>
      <ul className={css.list}>
        {products.map((product, index) =>
          item === product.subcategory ? (
            <li key={index} className={css.listItem} id={product._id}>
              <div className={css.cardContainer}>
                <CiHeart
                  className={css.iconFavorite}
                  onClick={() => {
                    addProductToFavorite(product._id);
                  }}
                />
                <CatalogItem
                  productImg={product.image}
                  productName={product.name}
                  productPrice={product.price}
                />
                <div className={css.quantityContainer}>
                  <button
                    className={css.quantityButton}
                    onClick={() => handleQuantityChange(product._id, -1)}
                  >
                    -
                  </button>
                  <span className={css.quantity}>
                    {quantities[product._id]}
                  </span>
                  <button
                    className={css.quantityButton}
                    onClick={() => handleQuantityChange(product._id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className={css.buyButton}
                  onClick={() => handleBuy(product._id)}
                >
                  Buy
                </button>
              </div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default CatalogList;
