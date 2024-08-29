import { IoMdClose } from "react-icons/io";
import css from "./ModalBasket.module.css";
import { useEffect, useState } from "react";
import { getBasketProduct, productById } from "../../services/productApi";
import { GoPlus } from "react-icons/go";
import { HiArrowNarrowLeft, HiOutlineMinus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import {
  deleteProduct,
  updateProductQuantityBasket,
} from "../../redux/basket/operations";
import { useDispatch } from "react-redux";

const ModalBasket = ({ closeModal }) => {
  const [basket, setBasket] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  const navigate = useNavigate();

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

  const handleQuantityChange = async (productId, volume, quantity) => {
    try {
      if (quantity < 1) return;
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
            ? { ...item, quantity }
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
  console.log("basket", basket);
  const dispatch = useDispatch();
  const handleRemoveProduct = async ({ productId, volume }) => {
    try {
      dispatch(deleteProduct({ productId, volume }));
      // Оновлюємо стан корзини
      setBasket((prevBasket) =>
        prevBasket.filter(
          (item) => !(item.product === productId && item.volume === volume)
        )
      );
      if (basket.length === 1) {
        closeModal(); // Закрити модальне вікно, якщо це останній товар
      }
    } catch (error) {
      console.error("Помилка видалення товару:", error);
    }
  };

  return (
    <div className={css.modalOverley}>
      <div className={css.popup}>
        <div className={css.popupBlock}>
          <IoMdClose className={css.iconClose} onClick={closeModal} />
          <h2 className={css.popupTitle}>Кошик</h2>
          <div className={css.cartBasket}>
            <table className={css.cartItems}>
              <thead>
                <tr>
                  <td></td>
                  <td></td>
                  <td className={css.cartHeader}>
                    <div className={css.cartHeaderDiv}>
                      <span>Кількість</span>
                    </div>
                  </td>
                  <td className={`${css.cartHeader} ${css.cartHeaderCost}`}>
                    <div className={css.cartHeaderDiv}>
                      <span>Вартість</span>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody className={css.cartBody}>
                {basket &&
                  basket.map((item) => {
                    const details = productDetails[item.product];

                    const uniqueKey = `${item.product}-${item.volume}`;
                    const volumeDetail = details?.volumes.find(
                      (vol) => vol.volume === item.volume
                    );
                    const price = volumeDetail ? volumeDetail.price : 0;
                    const discount = volumeDetail
                      ? volumeDetail.discount || 0
                      : 0;
                    const discountedPrice = price * (1 - discount / 100);
                    return (
                      details && (
                        <tr className={css.cartProduct} key={uniqueKey}>
                          <td className={`${css.cartSell} ${css.cartImg}`}>
                            <div className={css.iconRemove}>
                              <span
                                className={css.trashBox}
                                onClick={() =>
                                  handleRemoveProduct({
                                    productId: item.product,
                                    volume: item.volume,
                                  })
                                }
                              >
                                <CiTrash className={css.iconTrash} />
                              </span>
                            </div>
                            <div className={css.imgBox}>
                              <img
                                className={css.productImg}
                                src={details.image}
                                alt={details.name}
                              />
                            </div>
                          </td>
                          <td className={`${css.cartSell}`}>
                            <div className={css.productTitle}>
                              <p>{details.name}</p>
                            </div>
                            <div className={css.productPrice}>
                              <p className={css.priceInfo}>
                                {Math.ceil(discountedPrice)} грн
                              </p>
                            </div>
                          </td>
                          <td className={`${css.cartSell} ${css.quantity}`}>
                            <div>
                              <div className={css.counter}>
                                <div className={css.counterConteiner}>
                                  <button
                                    className={css.counterBtn}
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.product,
                                        item.volume,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    <HiOutlineMinus
                                      className={`${css.icon} ${css.iconMinus}`}
                                    />
                                  </button>
                                  <div className={css.counterInput}>
                                    <input
                                      className={css.counterField}
                                      type="text"
                                      value={item.quantity}
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          item.product,
                                          item.volume,
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  </div>
                                  <button
                                    className={css.counterBtn}
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.product,
                                        item.volume,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    <GoPlus
                                      className={`${css.icon} ${css.iconPlus}`}
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className={`${css.cartSell} ${css.cost}`}>
                            <div className={css.catrCost}>
                              <p>
                                {details && item.quantity * discountedPrice} грн
                              </p>
                            </div>
                          </td>
                        </tr>
                      )
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td className={css.cartFooter} colSpan={4}>
                    <div className={css.cartTotalAmount}>
                      <p className={css.cartText}>Всього</p>
                      <p className={css.cartCost}>
                        {calculateTotalAmount()} грн
                      </p>
                    </div>
                    <div className={css.cartBtn}>
                      <div className={css.cartBtnBack} onClick={closeModal}>
                        <button className={`${css.btn} ${css.clear}`}>
                          <HiArrowNarrowLeft className={css.arrowLeft} />
                          Повернутись до покупок
                        </button>
                      </div>
                      <div
                        className={css.cartBtnOrder}
                        onClick={() => {
                          navigate("/basket");
                        }}
                      >
                        <p className={`${css.btnq} ${css.cartBtnText}`}>
                          Оформити замовлення
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBasket;
