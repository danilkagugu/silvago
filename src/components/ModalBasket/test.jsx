import { IoMdClose } from "react-icons/io";
import css from "./YourStyles.module.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { HiArrowNarrowLeft, HiOutlineMinus } from "react-icons/hi";
import { GoPlus } from "react-icons/go";

const test = ({
  open,
  closeModal,
  basket,
  productDetails,
  handleRemoveProduct,
  handleQuantityChange,
  calculateTotalAmount,
  navigate,
}) => {
  return (
    <div className={`${css.modalOverley} ${open ? css.modalOverleyOpen : ""}`}>
      <div className={`${css.popup} ${open ? css.popupShow : ""}`}>
        <div className={css.popupBlock}>
          <IoMdClose className={css.iconClose} onClick={closeModal} />
          <IoChevronBackOutline
            className={css.iconChevronClose}
            onClick={closeModal}
          />
          <h2 className={css.popupTitle}>Кошик</h2>

          {/* Десктопна версія з використанням table */}
          <div className={`desktop-table ${css.cartBasket}`}>
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
                        onClick={() => navigate("/basket")}
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

          {/* Мобільна версія з використанням div */}
          <div className={`mobile-div ${css.cartBasket}`}>
            {basket &&
              basket.map((item) => {
                const details = productDetails[item.product];
                const uniqueKey = `${item.product}-${item.volume}`;
                const volumeDetail = details?.volumes.find(
                  (vol) => vol.volume === item.volume
                );
                const price = volumeDetail ? volumeDetail.price : 0;
                const discount = volumeDetail ? volumeDetail.discount || 0 : 0;
                const discountedPrice = price * (1 - discount / 100);

                return (
                  details && (
                    <div className={css.cartProduct} key={uniqueKey}>
                      <div className={`${css.cartSell} ${css.cartImg}`}>
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
                      </div>
                      <div className={css.productDetails}>
                        <p className={css.productTitle}>{details.name}</p>
                        <p className={css.productVolume}>
                          Об&apos;єм: {item.volume} мл
                        </p>
                        <p className={css.productPrice}>
                          {Math.ceil(discountedPrice)} грн
                        </p>
                        <div className={css.quantity}>
                          <div className={css.counter}>
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
                        <p className={css.cost}>
                          Всього: {item.quantity * discountedPrice} грн
                        </p>
                      </div>
                    </div>
                  )
                );
              })}

            <div className={css.cartTotalAmount}>
              <p className={css.cartText}>Всього</p>
              <p className={css.cartCost}>{calculateTotalAmount()} грн</p>
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
                onClick={() => navigate("/basket")}
              >
                <p className={`${css.btnq} ${css.cartBtnText}`}>
                  Оформити замовлення
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default test;
