import { useNavigate } from "react-router-dom";
import css from "./CatalogItem.module.css";
import { CiTrash } from "react-icons/ci";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { deleteProduct } from "../../redux/basket/operations";
import { useDispatch } from "react-redux";

const CatalogItem = ({
  productImg,
  productName,
  productPrice,
  id,
  slug,
  handleQuantityChange,
  item,
  details,
  discountedPrice,
}) => {
  const isMobile = window.innerWidth <= 1440;
  const dispatch = useDispatch();
  // console.log("item", item);
  const [showOutOfStockMessage, setShowOutOfStockMessage] = useState(false);
  const navigate = useNavigate();
  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleIncrement = () => {
    if (item.quantity < details.volume.quantity) {
      handleQuantityChange(item.product, item.volume, item.quantity + 1);
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
    const isConfirmed = window.confirm(
      "Ви впевнені, що хочете видалити цей продукт?"
    );
    if (isConfirmed) {
      dispatch(
        deleteProduct({
          productId: id,
          volume: item.volume,
        })
      );
    }
  };

  return (
    <>
      {!isMobile ? (
        <>
          <div
            className={css.itemIamge}
            onClick={() => handleProductClick(slug)}
          >
            <img
              className={`${css.imgItem} ${
                details.volume.quantity === 0 ? css.outOfStock : ""
              }`}
              src={productImg}
              alt={productName}
            />
          </div>
          <div className={css.itemContent}>
            <button onClick={handleDelete}>
              <span className={css.orderRemove}>
                <CiTrash className={css.iconRemove} />
              </span>
            </button>
            <div className={css.orderItemDescription}>
              <div
                className={css.orderItemTitle}
                onClick={() => handleProductClick(slug)}
              >
                <p className={css.productName}>{productName}</p>
              </div>
              <div className={css.orderItemContainer}>
                <p
                  className={
                    details.volume.quantity === 0 ? css.itemMissing : ""
                  }
                >
                  {productPrice} грн
                </p>
              </div>
            </div>
            <div className={css.orderItemControl}>
              {/* max={details.volume.quantity} */}
              {details.volume.quantity > 0 && (
                <div className={css.orderItemQuanity}>
                  <div className={css.counter}>
                    <div className={css.counterContainer}>
                      <button
                        className={`${css.counterBtn} ${
                          item.quantity === 1 ? css.disabled : ""
                        }`}
                        onClick={() =>
                          handleQuantityChange(
                            item.product,
                            item.volume,
                            item.quantity - 1
                          )
                        }
                      >
                        <FiMinus className={css.iconMinus} />
                      </button>
                      <div className={css.counterInput}>
                        <input
                          className={css.counterField}
                          type="text"
                          value={item.quantity}
                          min={"1"}
                          max={details.volume.quantity}
                          onChange={(e) => {
                            const newQuantity = Math.max(
                              1,
                              Math.min(e.target.value, details.volume.quantity)
                            );
                            handleQuantityChange(
                              item.product,
                              item.volume,
                              newQuantity
                            );
                          }}
                        />
                      </div>
                      <button
                        className={`${css.counterBtn} ${
                          item.quantity === details.volume.quantity
                            ? css.disabled
                            : ""
                        }`}
                        onClick={handleIncrement}
                      >
                        <FiPlus className={css.iconPlus} />
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
              {/* <div className={css.orderItemCost}>
            {details && item.quantity * discountedPrice} грн
          </div> */}
              <div
                className={
                  details.volume.quantity > 0
                    ? css.orderItemCost
                    : css.orderItemMissing
                }
              >
                {details.volume.quantity > 0
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
          <div className={css.cartItemImage}>
            <div className={css.image}>
              <div className={css.imageBox}>
                <img
                  className={css.imageProduct}
                  src={details?.volume.image}
                  alt={details.product.name}
                />
              </div>
            </div>
          </div>
          <div className={css.cartItemContent}>
            <div className={css.cartItemTitle}>
              <p>{details.product.name}</p>
            </div>
            <div className={css.cartItemPriceBlock}>
              <div className={css.cartItemPriceContainer}>
                <div className={css.cartItemPrice}>
                  {Math.ceil(discountedPrice)} грн
                </div>
              </div>
              <div className={css.cartItemCost}>
                {item.quantity * discountedPrice} грн
              </div>
            </div>
            <div className={css.cartItemButtons}>
              <div className={css.counter}>
                <div className={css.counterContainer}>
                  <div className={css.counterBox}>
                    <button
                      className={`${css.btnMinus} ${
                        item.quantity === 1 ? css.disabled : ""
                      }`}
                      onClick={() =>
                        handleQuantityChange(
                          item.product,
                          item.volume,
                          item.quantity - 1
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
                        max={details.volume.quantity}
                        onChange={(e) => {
                          const newQuantity = Math.max(
                            1,
                            Math.min(e.target.value, details.volume.quantity)
                          );
                          handleQuantityChange(
                            item.product,
                            item.volume,
                            newQuantity
                          );
                        }}
                      />
                    </div>
                    <button
                      className={`${css.btnPlus} ${
                        item.quantity === details.volume.quantity
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
