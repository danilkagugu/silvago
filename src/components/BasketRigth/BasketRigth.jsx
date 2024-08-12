import { useEffect, useState } from "react";
import {
  getBasketProduct,
  productById,
  updateProductQuantity,
} from "../../services/productApi";
import css from "./BasketRigth.module.css";

import CatalogItem from "../CatalogItem/CatalogItem";

const BasketRigth = () => {
  const [basket, setBasket] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const basketData = await getBasketProduct();

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

  const handleQuantityChange = async (productId, volume, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      await updateProductQuantity(productId, volume, newQuantity);
      setBasket((prevBasket) =>
        prevBasket.map((item) =>
          item.product === productId && item.volume === volume
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Помилка оновлення кількості товару:", error);
    }
  };

  const calculateTotalAmount = () => {
    return basket.reduce((total, item) => {
      const details = productDetails[item.product];
      if (details) {
        const volumeDetail = details.volumes.find(
          (vol) => vol.volume === item.volume
        );
        const price = volumeDetail ? volumeDetail.price : details.price;
        return total + item.quantity * price;
      }
      return total;
    }, 0);
  };

  return (
    <div className={css.containerBasket}>
      <h2 className={css.titleBasket}>Кошик</h2>
      <table className={css.basketTable}>
        <thead>
          <tr>
            <th></th>
            <th className={css.www}>Кількість</th>
            <th className={css.www}>Вартість</th>
          </tr>
        </thead>
        <tbody>
          {basket.map((item) => {
            const details = productDetails[item.product];
            const uniqueKey = `${item.product}-${item.volume}`; // Унікальний ключ
            return (
              <tr className={css.qqqq} key={uniqueKey}>
                <td>
                  {details && (
                    <CatalogItem
                      productImg={details.image}
                      productName={details.name}
                      productPrice={
                        details.volumes.find(
                          (vol) => vol.volume === item.volume
                        )?.price || details.price
                      }
                      id={item.product}
                    />
                  )}
                </td>

                <td>
                  <div className={css.quantityContainer}>
                    <button
                      className={css.quantityButton}
                      onClick={() =>
                        handleQuantityChange(
                          item.product,
                          item.volume,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <span className={css.quantity}>{item.quantity}</span>
                    <button
                      className={css.quantityButton}
                      onClick={() =>
                        handleQuantityChange(
                          item.product,
                          item.volume,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className={css.sumProduct}>
                  {details &&
                    item.quantity *
                      (details.volumes.find((vol) => vol.volume === item.volume)
                        ?.price || details.price)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={css.totalAmount}>
        <h3 className={css.totalAmountTitle}>
          Загальна сума: {calculateTotalAmount()} грн
        </h3>
      </div>
    </div>
  );
};

export default BasketRigth;
