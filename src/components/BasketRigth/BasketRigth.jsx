import { useEffect, useState } from "react";
import { getBasketProduct, productById } from "../../services/productApi";
import css from "./BasketRigth.module.css";

import CatalogItem from "../CatalogItem/CatalogItem";
import { updateProductQuantityBasket } from "../../redux/basket/operations";
import { useDispatch } from "react-redux";

const BasketRigth = () => {
  const [basket, setBasket] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const basketData = await getBasketProduct();
        // console.log("basketData: ", basketData);

        if (basketData && Array.isArray(basketData.products)) {
          setBasket(basketData.products);

          const details = {};
          for (const basketItem of basketData.products) {
            // console.log("basketItem: ", basketItem);
            const response = await productById(basketItem.slug);
            details[basketItem.slug] = response;
            // console.log("details: ", details);
            // console.log("basketItem: ", basketItem);
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

  const handleQuantityChange = async (productId, volume, quantity) => {
    try {
      await dispatch(
        updateProductQuantityBasket({
          productId,
          volume,
          quantity,
        })
      );
      setBasket((prevBasket) =>
        prevBasket.map((item) =>
          item.product === productId && item.volume === volume
            ? { ...item, quantity: quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Помилка оновлення кількості товару:", error);
    }
  };

  const calculateTotalAmount = () => {
    return basket.reduce((total, item) => {
      const details = productDetails[item.slug];
      if (details) {
        const volumeDetail = details?.product?.volumes?.find(
          (vol) => vol.volume === item.volume
        );
        if (volumeDetail) {
          const price = volumeDetail.price;
          const discount = volumeDetail.discount || 0;
          const discountedPrice = price * (1 - discount / 100);
          return total + item.quantity * discountedPrice;
        }
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
            // console.log("item: ", item);
            const details = productDetails[item.slug];
            console.log("details: ", details);

            const uniqueKey = `${item.product}-${item.volume}`; // Унікальний ключ
            const volumeDetail = details?.product?.volumes?.find(
              (vol) => vol.volume === item.volume
            );
            const price = volumeDetail ? volumeDetail.price : 0;
            const discount = volumeDetail ? volumeDetail.discount || 0 : 0;
            const discountedPrice = price * (1 - discount / 100);
            return (
              <tr className={css.qqqq} key={uniqueKey}>
                <td>
                  {details && (
                    <CatalogItem
                      productImg={details.volume.image}
                      productName={details.product.name}
                      productPrice={Math.ceil(discountedPrice)}
                      id={item.product}
                      slug={details.volume.slug}
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
                  {details && item.quantity * discountedPrice}
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
