import { useNavigate } from "react-router-dom";
import css from "./CatalogItem.module.css";
import { CiTrash } from "react-icons/ci";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { deleteProduct } from "../../redux/basket/operations";
import { useDispatch } from "react-redux";

const CatalogItem = ({
  productPrice,
  handleQuantityChange,
  item,
  discountedPrice,
  slug,
}) => {
  const isMobile = window.innerWidth <= 1440;
  const dispatch = useDispatch();
  // console.log("item", item);
  const [showOutOfStockMessage, setShowOutOfStockMessage] = useState(false);
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/product/${slug}`);
    console.log("slug: ", slug);
  };

  const handleIncrement = () => {
    if (item.quantity < item.quantityStock) {
      handleQuantityChange(item._id, item.volume, item.quantity + 1, item.tone);
      console.log("item.product: ", item);
    } else {
      // Якщо кількість перевищує максимальну, показуємо повідомлення
      setShowOutOfStockMessage(true);
      // Приховуємо повідомлення через 2-3 секунди
      setTimeout(() => {
        setShowOutOfStockMessage(false);
      }, 2000); // 2000 мілісекунд = 2 секунди
    }
  };

  // const tt = useSelector(selectBasket);
  const handleDelete = () => {
    // console.log("hello");
    const isConfirmed = window.confirm(
      "Ви впевнені, що хочете видалити цей продукт?"
    );
    if (isConfirmed) {
      dispatch(
        deleteProduct({
          productId: item._id,
          volume: item.volume,
        })
      );
    }
  };

  return (
    <>
      {!isMobile ? (
        <>
          <div className={css.itemIamge} onClick={handleProductClick}>
            <img
              className={`${css.imgItem} ${
                item.quantityStock === 0 ? css.outOfStock : ""
              }`}
              src={item.image}
              alt={item.productName}
            />
          </div>
          <div className={css.itemContent}>
            <button onClick={handleDelete}>
              <span className={css.orderRemove}>
                <CiTrash className={css.iconRemove} />
              </span>
            </button>
            <div className={css.orderItemDescription}>
              <div className={css.orderItemTitle}>
                <p className={css.productName}>{item.productName}</p>
              </div>
              <div className={css.orderItemContainer}>
                <p className={item.quantityStock === 0 ? css.itemMissing : ""}>
                  {productPrice} грн
                </p>
              </div>
            </div>
            <div className={css.orderItemControl}>
              {item.quantityStock > 0 && (
                <div className={css.orderItemQuanity}>
                  <div className={css.counter}>
                    <div className={css.counterContainer}>
                      <button
                        className={`${css.counterBtn} ${
                          item.quantity === 1 ? css.disabled : ""
                        }`}
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.volume,
                            item.quantity - 1,
                            item.tone
                          )
                        }
                        disabled={item.quantity === 1}
                      >
                        <FiMinus className={`${css.icon} ${css.iconMinus}`} />
                      </button>
                      <div className={css.counterInput}>
                        <input
                          className={css.counterField}
                          type="text"
                          value={
                            item.quantityStock < item.quantity
                              ? item.quantityStock
                              : item.quantity
                          }
                          min={"1"}
                          max={item.quantityStock}
                          onChange={(e) => {
                            const newQuantity = Math.max(
                              1,
                              Math.min(e.target.value, item.quantityStock)
                            );
                            handleQuantityChange(
                              item._id,
                              item.volume,
                              newQuantity,
                              item.tone
                            );
                          }}
                        />
                      </div>
                      <button
                        className={`${css.counterBtn} ${
                          item.quantity === item.quantityStock
                            ? css.disabled
                            : ""
                        }`}
                        onClick={handleIncrement}
                      >
                        <FiPlus className={`${css.icon} ${css.iconPlus}`} />
                      </button>
                    </div>

                    <p
                      className={css.outOfStockMessage}
                      style={{
                        display: showOutOfStockMessage ? "block" : "none",
                      }}
                    >
                      Більше немає в наявності
                    </p>
                  </div>
                </div>
              )}

              <div
                className={
                  item.quantityStock > 0
                    ? css.orderItemCost
                    : css.orderItemMissing
                }
              >
                {item.quantityStock > 0
                  ? `${item.quantity * discountedPrice} грн`
                  : "Немає в наявності"}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={css.notificationsContainer}>
            <div
              className={`${css.notificationInfo} ${css.notification} ${css.notificationExpends}`}
              style={{
                display: showOutOfStockMessage ? "block" : "none",
              }}
            >
              <div className={css.notificationText}>
                Більше немає в наявності
              </div>
            </div>
          </div>
          <div className={css.cartItemImage} onClick={handleProductClick}>
            <div className={css.image}>
              <div className={css.imageBox}>
                <img
                  // className={css.imageProduct}
                  className={`${css.imageProduct} ${
                    item.quantityStock === 0 ? css.outOfStock : ""
                  }`}
                  src={item.image}
                  alt={item.productName}
                />
              </div>
            </div>
          </div>
          <div className={css.cartItemContent}>
            <div className={css.cartItemTitle}>
              <p>{item.productName}</p>
            </div>
            <div className={css.cartItemPriceBlock}>
              <div className={css.cartItemPriceContainer}>
                <div className={css.cartItemPrice}>
                  {Math.ceil(discountedPrice)} грн
                </div>
              </div>
              {item.quantityStock > 0 && (
                <div className={css.cartItemCost}>
                  {item.quantity * discountedPrice} грн
                </div>
              )}
            </div>
            <div className={css.cartItemButtons}>
              {item.quantityStock > 0 ? (
                <div className={css.counter}>
                  <div className={css.counterContainer}>
                    <div className={css.counterBox}>
                      <button
                        className={`${css.btnMinus} ${
                          item.quantity === 1 ? css.disabled : ""
                        }`}
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.volume,
                            item.quantity - 1,
                            item.tone
                          )
                        }
                      >
                        <FiMinus className={css.iconMinus} />
                      </button>
                      <div>
                        <input
                          className={css.counterInput}
                          type="text"
                          value={item.quantity}
                          min={"1"}
                          max={item.quantityStock}
                          onChange={(e) => {
                            const newQuantity = Math.max(
                              1,
                              Math.min(e.target.value, item.quantityStock)
                            );
                            handleQuantityChange(
                              item._id,
                              item.volume,
                              newQuantity,
                              item.tone
                            );
                          }}
                        />
                      </div>
                      <button
                        className={`${css.btnPlus} ${
                          item.quantity === item.quantityStock
                            ? css.disabled
                            : ""
                        }`}
                        onClick={handleIncrement}
                      >
                        <FiPlus className={css.iconPlus} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={css.orderItemMissingMob}>Немає в наявності</div>
              )}
              <button className={css.btnRemove} onClick={handleDelete}>
                <span className={css.btnIconRemove}>
                  <CiTrash className={css.iconRemove} />
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CatalogItem;
