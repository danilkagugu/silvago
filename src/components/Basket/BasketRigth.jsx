import { useEffect, useState } from "react";
import {
  getBasketProduct,
  productById,
  updateProductQuantity,
} from "../../services/productApi";
import css from "./BasketRigth.module.css";
// import FavoriteItem from "../FavoriteItem/FavoriteItem";
// import { useNavigate } from "react-router-dom";
import CatalogItem from "../CatalogItem/CatalogItem";
// import { useSelector } from "react-redux";
// import { selectBasket } from "../../redux/basket/selectors";

const BasketRigth = () => {
  const [basket, setBasket] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const basketData = await getBasketProduct();
        console.log("basketData: ", basketData);
        console.log("Отримані дані кошика:", basketData);
        if (basketData && Array.isArray(basketData.products)) {
          setBasket(basketData.products);

          const details = {};
          for (const basketItem of basketData.products) {
            const response = await productById(basketItem.product);
            details[basketItem.product] = response;
          }
          setProductDetails(details);
        } else {
          console.error("Недійсний формат даних кошика:", basketData);
        }
      } catch (error) {
        console.error("Помилка отримання продуктів у кошику:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      await updateProductQuantity(productId, newQuantity);
      setBasket((prevBasket) =>
        prevBasket.map((product) =>
          product.product === productId
            ? { ...product, quantity: newQuantity }
            : product
        )
      );
    } catch (error) {
      console.error("Помилка оновлення кількості товару:", error);
    }
  };
  const calculateTotalAmount = () => {
    return basket.reduce((total, product) => {
      const details = productDetails[product.product];
      if (details) {
        return total + product.quantity * details.price;
      }
      return total;
    }, 0);
  };
  console.log("basket:", basket);
  // const handleProductClick = (productId) => {
  //   navigate(`/product/${productId}`);
  // };
  return (
    <div className={css.container}>
      <h2>Кошик</h2>
      <ul className={css.basketList}>
        {basket.map((product) => {
          const details = productDetails[product.product];
          return (
            <li
              key={product.product}
              // onClick={() => handleProductClick(product.product)}
            >
              {/* <p>Ідентифікатор ПОЗИЦІЇ КОШИКА: {product._id}</p> */}
              <div>
                {details && (
                  <>
                    <CatalogItem
                      productImg={details.image}
                      productName={details.name}
                      productPrice={details.price}
                      id={product.product}
                    />
                    <p>Кількість: {product.quantity}</p>
                    <p>Сума: {product.quantity * details.price}</p>
                  </>
                )}

                <div className={css.quantityContainer}>
                  <button
                    className={css.quantityButton}
                    onClick={() =>
                      handleQuantityChange(
                        product.product,
                        product.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <span className={css.quantity}>{product.quantity}</span>
                  <button
                    className={css.quantityButton}
                    onClick={() =>
                      handleQuantityChange(
                        product.product,
                        product.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => console.log("Product details:", details)}
                >
                  Переглянути деталі
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={css.totalAmount}>
        <h3>Загальна сума: {calculateTotalAmount()} грн</h3>
      </div>
    </div>
  );
};

export default BasketRigth;
