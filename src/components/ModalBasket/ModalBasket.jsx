import { IoMdClose } from "react-icons/io";
import css from "./ModalBasket.module.css";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiArrowNarrowLeft, HiOutlineMinus } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import {
  deleteProduct,
  getBasketInfo,
  getCart,
  removeFromCart,
  updateProductQuantityBasket,
} from "../../redux/basket/operations";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasket,
  selectItemsCart,
  selectLoading,
  selectProductDetails,
} from "../../redux/basket/selectors";

import Loader from "../Loader/Loader";
import { getProductById } from "../../redux/product/operations";
import { selectUserData } from "../../redux/auth/selectors";

const ModalBasket = ({ closeModal, open }) => {
  const dispatch = useDispatch();
  const [showOutOfStockMessage, setShowOutOfStockMessage] = useState({});
  const userData = useSelector(selectUserData);
  // console.log("userData: ", userData);
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const tttt = useSelector(selectProductDetails);
  const itemsCart = useSelector(selectItemsCart);
  // console.log("itemsCart: ", itemsCart);

  const basketDataA = useSelector(selectBasket);
  // console.log("basketDataA: ", basketDataA);

  useEffect(() => {
    basketDataA.forEach((item) => {
      if (!tttt[item.slug]) {
        dispatch(getProductById(item.slug));
      }
    });
  }, [basketDataA, tttt, dispatch]);

  useEffect(() => {
    dispatch(getBasketInfo());
    dispatch(getCart());
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
    return itemsCart.reduce((total, item) => {
      const selectedVariation = item.selectedVariation;
      if (!selectedVariation) return total;
      const price =
        Number(selectedVariation.discount) > 0
          ? selectedVariation.discountPrice
          : selectedVariation.retailPrice;

      return total + item.quantity * price;
    }, 0);
  };

  const handleRemove = (product) => {
    console.log("product: ", product);
    const isConfirmed = window.confirm(
      "Ви впевнені, що хочете видалити цей продукт?"
    );

    if (isConfirmed) {
      dispatch(
        removeFromCart({
          userId: userData.id,
          productId: product.productId,
          idTorgsoft: product.selectedVariation.idTorgsoft,
        })
      );
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

                {itemsCart &&
                  itemsCart.map((item) => {
                    // console.log("item: ", item);
                    return (
                      itemsCart && (
                        <tbody
                          className={css.cartSection}
                          key={item?.selectedVariation?.idTorgsoft}
                          id={item?.selectedVariation?.idTorgsoft}
                        >
                          <tr className={css.cartItem}>
                            <td
                              className={`${css.cartSell} ${css.image}`}
                              // onClick={() => handleProductClick(item.slug)}
                            >
                              <div className={css.cartRemove}>
                                <span
                                  className={css.cartRemoveBtn}
                                  onClick={() => handleRemove(item)}
                                >
                                  <CiTrash className={css.iconTrash} />
                                </span>
                              </div>
                              <div className={css.cartImage}>
                                <Link
                                  to={`/product/${item.selectedVariation.slug}`}
                                >
                                  <img
                                    // className={`${css.productImg} ${
                                    //   details.volume.quantity === 0
                                    //     ? css.outOfStock
                                    //     : ""
                                    // }`}
                                    src={item.selectedVariation.image}
                                    alt={item.selectedVariation.fullName}
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
                                  {item.selectedVariation.fullName}
                                </Link>
                              </div>
                              {Number(item.selectedVariation.discount) > 0 ? (
                                <>
                                  <div
                                    className={`${css.cartPrice} ${css.old}`}
                                  >
                                    {item.selectedVariation.discountPrice} грн
                                  </div>
                                  <div className={css.cartPrice}>
                                    {item.selectedVariation.retailPrice} грн
                                  </div>
                                </>
                              ) : (
                                <div className={css.cartPrice}>
                                  {item.selectedVariation.retailPrice} грн
                                </div>
                              )}
                            </td>
                            {item.selectedVariation.quantity > 0 && (
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
                                            handleRemove(item);
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
                                            item.selectedVariation.quantity <
                                            item.quantity
                                              ? item.selectedVariation.quantity
                                              : item.quantity
                                          }
                                          min={"1"}
                                          max={item.selectedVariation.quantity}
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
                                          item.selectedVariation.quantity
                                            ? css.disabled
                                            : ""
                                        }`}
                                        // onClick={() =>
                                        //   handleIncrement(item, details)
                                        // }
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
                                item.selectedVariation.quantity > 0
                                  ? css.cost
                                  : css.misingContainer
                              }`}
                            >
                              <div
                                className={
                                  item.selectedVariation.quantity > 0
                                    ? css.cartCost
                                    : css.orderItemMissing
                                }
                              >
                                {item.selectedVariation.quantity > 0 ? (
                                  <>
                                    {item.quantity *
                                      (Number(item.selectedVariation.discount) >
                                      0
                                        ? item.selectedVariation.discountPrice
                                        : item.selectedVariation
                                            .retailPrice)}{" "}
                                    грн
                                  </>
                                ) : (
                                  "Немає в наявності"
                                )}
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
