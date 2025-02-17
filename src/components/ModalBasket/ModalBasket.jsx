import { IoMdClose } from "react-icons/io";
import css from "./ModalBasket.module.css";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiArrowNarrowLeft, HiOutlineMinus } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import {
  deleteProduct,
  fetchProductDetails,
  getBasketInfo,
  updateProductQuantityBasket,
} from "../../redux/basket/operations";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasket,
  selectLoading,
  selectProductDetails,
} from "../../redux/basket/selectors";

import Loader from "../Loader/Loader";

const ModalBasket = ({ closeModal, open }) => {
  const dispatch = useDispatch();
  const [showOutOfStockMessage, setShowOutOfStockMessage] = useState({});

  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const tttt = useSelector(selectProductDetails);

  const basketDataA = useSelector(selectBasket);
  // console.log("basketDataA: ", basketDataA);

  useEffect(() => {
    basketDataA.forEach((item) => {
      if (!tttt[item.slug]) {
        dispatch(fetchProductDetails(item.slug));
      }
    });
  }, [basketDataA, tttt, dispatch]);

  useEffect(() => {
    dispatch(getBasketInfo());
  }, [dispatch]);

  const handleQuantityChange = async (productId, volume, quantity, tone) => {
    try {
      if (quantity < 1) return;
      dispatch(
        updateProductQuantityBasket({
          productId,
          volume,
          quantity,
          tone,
        })
      );
    } catch (error) {
      console.error("Помилка оновлення кількості товару:", error);
    }
  };

  const calculateTotalAmount = () => {
    return basketDataA.reduce((total, item) => {
      const details = tttt[item.slug];
      // console.log("details: ", details);
      if (details) {
        const volumeDetail = details?.product?.variations?.find(
          (vol) => vol.volume === item.volume && vol.tone === item.tone
        );
        if (volumeDetail) {
          const price = volumeDetail.retailPrice;

          const discount = volumeDetail.discount || 0;
          const discountedPrice = price * (1 - discount / 100);
          return total + item.quantity * discountedPrice;
        }
      }
      return total;
    }, 0);
  };
  const handleRemoveProduct = async ({ productId, volume }) => {
    try {
      const isConfirmed = window.confirm(
        "Ви впевнені, що хочете видалити цей продукт?"
      );

      if (isConfirmed) {
        await dispatch(deleteProduct({ productId, volume }));

        basketDataA.filter(
          (item) => !(item.product === productId && item.volume === volume)
        );

        // Закриваємо модальне вікно, якщо в кошику залишився лише один товар
        if (basketDataA.length === 1) {
          closeModal();
        }
      }
    } catch (error) {
      console.error("Помилка видалення товару:", error);
    }
  };

  const handleIncrement = (item, details) => {
    console.log("item: ", item);
    if (item.quantity < details.volume.quantity) {
      handleQuantityChange(item._id, item.volume, item.quantity + 1, item.tone);
    } else {
      // Оновлюємо стан для конкретного товару
      setShowOutOfStockMessage((prev) => ({
        ...prev,
        [item.idTorgsoft]: true,
      }));

      // Приховуємо повідомлення через 2 секунди для конкретного товару
      setTimeout(() => {
        setShowOutOfStockMessage((prev) => ({
          ...prev,
          [item.idTorgsoft]: false,
        }));
      }, 2000);
    }
  };
  return (
    <div
      className={`${css.modalOverley} `}
      style={{
        display: open ? "block" : "none",
      }}
    >
      <section
        className={`${css.popup} `}
        style={{
          display: open ? "block" : "none",
        }}
      >
        <div className={css.popupBlock}>
          <div className={css.popupClose}>
            <IoMdClose className={css.iconClose} onClick={closeModal} />
          </div>

          <div className={css.popupTitle}>Кошик</div>
          <div className={css.cartBasket}>
            <div className={css.cartContent}>
              <div
                className={css.loaderContainer}
                style={{ display: loading ? "block" : "none" }}
              >
                <div className={css.loaderSpinner}>
                  <Loader />
                </div>
              </div>

              <table className={css.cartItems}>
                <thead>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className={css.cartHeader}>
                      <div className={css.cartHeaderB}>
                        <span>Кількість</span>
                      </div>
                    </td>
                    <td className={`${css.cartHeader} ${css.cartHeaderCost}`}>
                      <div className={css.cartHeaderB}>
                        <span>Вартість</span>
                      </div>
                    </td>
                  </tr>
                </thead>

                {basketDataA &&
                  basketDataA.map((item) => {
                    // console.log("item: ", item);
                    const details = tttt[item.slug];
                    // console.log("details: ", details);

                    const volumeDetail = details?.product?.variations?.find(
                      (vol) =>
                        vol.volume === item.volume && vol.tone === item.tone
                    );
                    // console.log("volumeDetail", volumeDetail);
                    const price = volumeDetail ? volumeDetail.retailPrice : 0;
                    const discount = volumeDetail
                      ? volumeDetail.discount || 0
                      : 0;
                    const discountedPrice = price * (1 - discount / 100);
                    return (
                      details && (
                        <tbody
                          className={css.cartSection}
                          key={volumeDetail?.idTorgsoft}
                          id={volumeDetail?.idTorgsoft}
                        >
                          <tr className={css.cartItem}>
                            <td
                              className={`${css.cartSell} ${css.image}`}
                              // onClick={() => handleProductClick(item.slug)}
                            >
                              <div className={css.cartRemove}>
                                <span
                                  className={css.cartRemoveBtn}
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
                              <div className={css.cartImage}>
                                <Link to={`/product/${item.slug}`}>
                                  <img
                                    // className={`${css.productImg} ${
                                    //   details.volume.quantity === 0
                                    //     ? css.outOfStock
                                    //     : ""
                                    // }`}
                                    src={details?.volume?.image}
                                    alt={details?.volume?.fullName}
                                    width={78}
                                    height={78}
                                  />
                                </Link>
                              </div>
                            </td>
                            <td
                              className={`${css.cartSell} ${css.details}`}
                              // onClick={() => handleProductClick(item.slug)}
                            >
                              <div className={css.cartTitle}>
                                <Link to={`/product/${item.slug}`}>
                                  {item.productName}
                                </Link>
                              </div>
                              <div className={css.cartPrice}>
                                {Math.ceil(discountedPrice)} грн
                              </div>
                            </td>
                            {details?.volume?.quantity > 0 && (
                              <td className={`${css.cartSell} ${css.quantity}`}>
                                <div className={css.cartQuantity}>
                                  <div
                                    className={`${css.counter} ${css.counterLarge}`}
                                  >
                                    <div className={css.counterContainer}>
                                      <button
                                        className={`${css.counterBtn} `}
                                        onClick={() => {
                                          if (item.quantity === 1) {
                                            // Викликаємо функцію видалення товару
                                            handleRemoveProduct({
                                              productId: item.product,
                                              volume: item.volume,
                                            });
                                          } else {
                                            // Зменшуємо кількість
                                            handleQuantityChange(
                                              item._id,
                                              item.volume,
                                              item.quantity - 1,
                                              item.tone
                                            );
                                          }
                                        }}
                                      >
                                        <HiOutlineMinus
                                          className={`${css.iconMinus}`}
                                        />
                                      </button>
                                      <div className={css.counterInput}>
                                        <input
                                          className={css.counterField}
                                          type="text"
                                          // value={item.quantity}
                                          value={
                                            details?.volume?.quantity <
                                            item.quantity
                                              ? details?.volume?.quantity
                                              : item.quantity
                                          }
                                          min={"1"}
                                          max={details.volume.quantity}
                                          onChange={(e) =>
                                            handleQuantityChange(
                                              item._id,
                                              item.volume,
                                              Number(e.target.value),
                                              item.tone
                                            )
                                          }
                                        />
                                      </div>
                                      <button
                                        className={`${css.counterBtn} ${
                                          item.quantity ===
                                          details?.volume?.quantity
                                            ? css.disabled
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleIncrement(item, details)
                                        }
                                      >
                                        <GoPlus
                                          className={` ${css.iconPlus}`}
                                        />
                                      </button>
                                    </div>
                                    <div
                                      className={css.counterMessage}
                                      style={{
                                        display: showOutOfStockMessage[
                                          item.idTorgsoft
                                        ]
                                          ? "block"
                                          : "none",
                                      }}
                                    >
                                      Більше немає в наявності
                                    </div>
                                  </div>
                                </div>
                              </td>
                            )}
                            <td
                              className={`${css.cartSell} ${
                                details?.volume?.quantity > 0
                                  ? css.cost
                                  : css.misingContainer
                              }`}
                            >
                              <div
                                className={
                                  details?.volume?.quantity > 0
                                    ? css.cartCost
                                    : css.orderItemMissing
                                }
                              >
                                {details?.volume?.quantity > 0
                                  ? `${item.quantity * discountedPrice} грн`
                                  : "Немає в наявності"}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      )
                    );
                  })}

                <tfoot className={css.cartFoot}>
                  <tr>
                    <td className={css.cartFooter} colSpan={4}>
                      <div className={css.cartTotalAmount}>
                        <p className={css.cartText}>Всього</p>
                        <p className={`${css.cartCost} ${css.cartTextB}`}>
                          {calculateTotalAmount()} грн
                        </p>
                      </div>
                      <div className={css.cartBtn}>
                        <div className={css.cartBtnBack} onClick={closeModal}>
                          <button className={`${css.btn} ${css.clear}`}>
                            <span className={css.btnContent}>
                              <HiArrowNarrowLeft className={css.arrowLeft} />
                              Повернутись до покупок
                            </span>
                          </button>
                        </div>
                        <div
                          className={css.cartBtnOrder}
                          onClick={() => {
                            navigate("/basket");
                          }}
                        >
                          <span className={`${css.btn} ${css.orderBtn}`}>
                            <p className={`${css.btnContent}`}>
                              Оформити замовлення
                            </p>
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {/* <div className={css.cartItemsMobile}>
            <div className={css.mobileWrapper}>
              <div className={css.basketMobileContent}>
                <div>
                  {basketDataA &&
                    basketDataA.map((item) => {
                      const details = tttt[item.slug];
                      // const uniqueKey = `${item.product}-${item.volume}`;
                      const volumeDetail = details?.product?.volumes?.find(
                        (vol) => vol.volume === item.volume
                      );
                      const price = volumeDetail ? volumeDetail.retailPrice : 0;
                      const discount = volumeDetail
                        ? volumeDetail.discount || 0
                        : 0;
                      const discountedPrice = price * (1 - discount / 100);
                      return (
                        details && (
                          <div
                            className={css.cartProductMobile}
                            key={details.volume._id}
                          >
                            <div
                              className={css.imgBoxMobile}
                              onClick={() =>
                                handleProductClick(details.volume.slug)
                              }
                            >
                              <img
                                // className={css.imgMobile}
                                className={`${css.imgMobile} ${
                                  details.volume.quantity === 0
                                    ? css.outOfStock
                                    : ""
                                }`}
                                src={details.volume.images}
                                alt={details.volume.fullName}
                              />
                            </div>
                            <div className={css.productContentMobile}>
                              <div className={css.productTitleMobileBox}>
                                <p className={css.productTitleMobile}>
                                  {details.volume.fullName}
                                </p>
                              </div>

                              <div className={css.priceInfoMobileBox}>
                                <p className={css.priceInfoMobile}>
                                  {Math.ceil(discountedPrice)} грн
                                </p>
                              </div>
                              <div className={css.cartItemButtons}>
                                {details.volume.quantity > 0 ? (
                                  <div className={css.counterBtnMobileBox}>
                                    <button
                                      className={`${css.counterBtnMobile} ${css.counterBtnMinus}`}
                                      onClick={() => {
                                        if (item.quantity === 1) {
                                          // Викликаємо функцію видалення товару
                                          handleRemoveProduct({
                                            productId: item.product,
                                            volume: item.volume,
                                          });
                                        } else {
                                          // Зменшуємо кількість
                                          handleQuantityChange(
                                            item._id,
                                            item.volume,
                                            item.quantity - 1,
                                            item.tone
                                          );
                                        }
                                      }}
                                    >
                                      <HiOutlineMinus
                                        className={`${css.iconMobile} ${css.iconMinusMobile}`}
                                      />
                                    </button>
                                    <div className={css.counterInputMobile}>
                                      <input
                                        className={css.counterFieldMobile}
                                        type="text"
                                        value={item.quantity}
                                        onChange={(e) =>
                                          handleQuantityChange(
                                            item._id,
                                            item.volume,
                                            Number(e.target.value),
                                            item.tone
                                          )
                                        }
                                      />
                                    </div>
                                    <button
                                      className={`${css.counterBtnMobile} ${css.counterBtnPlus}`}
                                      onClick={() =>
                                        handleQuantityChange(
                                          item._id,
                                          item.volume,
                                          item.quantity + 1,
                                          item.tone
                                        )
                                      }
                                    >
                                      <GoPlus
                                        className={`${css.iconMobile} ${css.iconPlusMobile}`}
                                      />
                                    </button>
                                  </div>
                                ) : (
                                  <div className={css.itemMissing}>
                                    Немає в наявності
                                  </div>
                                )}
                                <button
                                  className={css.buttonTrash}
                                  onClick={() =>
                                    handleRemoveProduct({
                                      productId: item.product,
                                      volume: item.volume,
                                    })
                                  }
                                >
                                  <CiTrash className={css.iconTrashMobile} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })}
                  <div className={css.cartItemsFooterMobile}>
                    <div className={css.cartSummaryMobile}>
                      <p className={css.cartCost}>
                        {calculateTotalAmount()} грн
                      </p>
                    </div>
                    <div
                      className={css.cartOrderMobile}
                      onClick={() => {
                        navigate("/basket");
                      }}
                    >
                      <button className={css.orderBtnMobile}>
                        Оформити замовлення
                      </button>
                    </div>

                    <div
                      className={css.cartcontiniusShoping}
                      onClick={closeModal}
                    >
                      <IoChevronBackOutline />
                      <button className={css.continiusBtnMobile}>
                        Продовжити покупки
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default ModalBasket;
