import { IoMdClose } from "react-icons/io";
import css from "./ModalBasket.module.css";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiArrowNarrowLeft, HiOutlineMinus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import {
  deleteProduct,
  fetchProductDetails,
  getBasketInfo,
  updateProductQuantityBasket,
} from "../../redux/basket/operations";
import { useDispatch, useSelector } from "react-redux";
import { IoChevronBackOutline } from "react-icons/io5";
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
  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
    closeModal();
  };

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
        [item.product]: true,
      }));

      // Приховуємо повідомлення через 2 секунди для конкретного товару
      setTimeout(() => {
        setShowOutOfStockMessage((prev) => ({
          ...prev,
          [item.product]: false,
        }));
      }, 2000);
    }
  };
  return (
    <div className={`${css.modalOverley} ${open ? css.modalOverleyOpen : ""}`}>
      <div className={`${css.popup} ${open ? css.popupShow : ""}`}>
        <div className={css.popupBlock}>
          {loading && (
            <div className={css.loaderOverlay}>
              <div className={css.loader}>
                <Loader />
              </div>
            </div>
          )}
          <IoMdClose className={css.iconClose} onClick={closeModal} />
          <IoChevronBackOutline
            className={css.iconCloseChevron}
            onClick={closeModal}
          />

          <h2 className={css.popupTitle}>Кошик</h2>
          <div className={css.cartBasket}>
            <table className={css.cartItemsDesctop}>
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
                {basketDataA &&
                  basketDataA.map((item) => {
                    // console.log("item: ", item);
                    // console.log("basketDataA: ", basketDataA);
                    const details = tttt[item.slug];
                    // console.log("details: ", details);
                    // console.log("item: ", item);

                    // const uniqueKey = `${item.product}-${item.volume}`;
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
                        <tr
                          className={css.cartProduct}
                          key={details.volume._id}
                          id={details.volume._id}
                        >
                          <td
                            className={`${css.cartSell} ${css.cartImg}`}
                            onClick={() => handleProductClick(item.slug)}
                          >
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
                                className={`${css.productImg} ${
                                  details.volume.quantity === 0
                                    ? css.outOfStock
                                    : ""
                                }`}
                                src={details?.volume?.image}
                                alt={details?.volume?.fullName}
                              />
                            </div>
                          </td>
                          <td
                            className={`${css.cartSell}`}
                            onClick={() => handleProductClick(item.slug)}
                          >
                            <div className={css.productTitle}>
                              <p>{details?.volume?.fullName}</p>
                            </div>
                            <div className={css.productPrice}>
                              <p className={css.priceInfo}>
                                {Math.ceil(discountedPrice)} грн
                              </p>
                            </div>
                          </td>
                          {details?.volume?.quantity > 0 && (
                            <td className={`${css.cartSell} ${css.quantity}`}>
                              <div className={css.counter}>
                                <div className={css.counterConteiner}>
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
                                      className={`${css.icon} ${css.iconMinus}`}
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
                                      className={`${css.icon} ${css.iconPlus}`}
                                    />
                                  </button>
                                </div>
                                <p
                                  className={css.outOfStockMessage}
                                  // style={{
                                  //   display: showOutOfStockMessage
                                  //     ? "block"
                                  //     : "none",
                                  // }}
                                  style={{
                                    display: showOutOfStockMessage[item.product]
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  Більше немає в наявності
                                </p>
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
                                  ? css.orderItemCost
                                  : css.orderItemMissing
                              }
                            >
                              {details?.volume?.quantity > 0
                                ? `${item.quantity * discountedPrice} грн`
                                : "Немає в наявності"}
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
          <div className={css.cartItemsMobile}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBasket;
