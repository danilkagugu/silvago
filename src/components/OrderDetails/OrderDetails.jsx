import { useNavigate, useParams } from "react-router-dom";
import css from "./OrderDetails.module.css";
import { useEffect } from "react";
import { formatDate } from "../../helpers/productActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../../redux/order/operations";
import { selectOrderById } from "../../redux/order/selectors";

const OrderDetails = () => {
  const dispatch = useDispatch();

  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const orderDetails = useSelector(selectOrderById);
  // console.log("orderDetails: ", orderDetails);
  if (!orderDetails) {
    return <div>Loading...</div>; // Optionally add a loading state
  }
  const { user, status, basket = [] } = orderDetails;

  const navigateProductClick = (id) => {
    if (!id) return;
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className={css.orderBoxDesctop}>
        <h1 className={css.title}>Замовлення №{orderId}</h1>
        <div className={css.orderBox}>
          <div className={css.orderContact}>
            <dl className={css.orderContactWrapper}>
              <dt className={css.orderContactItemA}>Статус</dt>
              <dd className={css.orderContactItemB}>
                {status}. Треба доробить
              </dd>
              <dt className={css.orderContactItemA}>Ім&apos;я та прізвище</dt>
              <dd className={css.orderContactItemB}>
                {user?.name || ""} {user?.serName || ""}
              </dd>
              <dt className={css.orderContactItemA}>Е-пошта</dt>
              <dd className={css.orderContactItemB}>{user?.email}</dd>
              <dt className={css.orderContactItemA}>Телефон</dt>
              <dd className={css.orderContactItemB}>{user?.phone}</dd>
              <dt className={css.orderContactItemA}>Спосіб доставки</dt>
              <dd className={css.orderContactItemB}>
                Нова пошта. Тут доробить треба
              </dd>
              <dt className={css.orderContactItemA}>Місто</dt>
              <dd className={css.orderContactItemB}>{user?.address?.city}</dd>
              <dt className={css.orderContactItemA}>Адреса</dt>
              <dd className={css.orderContactItemB}>{user?.address?.office}</dd>
              <dt className={css.orderContactItemA}>Спосіб оплати</dt>
              <dd className={css.orderContactItemB}>
                Післяплата. Тут треба доробить
              </dd>
            </dl>
          </div>
          <div className={css.orderContent}>
            <h2 className={css.orderContantTitle}>Ваше замовлення</h2>
            <ul className={css.orderList}>
              {basket &&
                basket.map((item) => {
                  return (
                    <li className={css.orderItem} key={item._id}>
                      <div className={css.itemImg}>
                        <img
                          className={css.img}
                          src={item.image}
                          alt={item.productName}
                        />
                      </div>
                      <div className={css.orderItemContent}>
                        <div
                          className={css.orderItemTitle}
                          onClick={() => navigateProductClick(item.product)}
                        >
                          <p>{item.productName}</p>
                        </div>
                        <div className={css.orderItemValues}>
                          <div className={css.orderItemPrice}>
                            {item.price} x {item.quantity}
                          </div>
                          <div className={css.orderItemCost}>
                            {item.price * item.quantity} грн
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className={css.orderSummary}>
              <div className={css.orderSummaryA}>Всього</div>
              <div className={css.orderSummaryB}>
                {orderDetails.totalAmount} грн
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.orderBoxMob}>
        <div className={css.invoice}>
          <div className={css.invoiceHeader}>Замовлення №{orderId}</div>
          <table className={css.invoiceTable}>
            <tbody>
              <tr className={css.invoiceItem}>
                <td className={css.invoiceName}>Номер замовлення</td>
                <td className={css.invoiceValue}>{orderId}</td>
              </tr>
              <tr className={css.invoiceItem}>
                <td className={css.invoiceName}>Дата</td>
                <td className={css.invoiceValue}>
                  {formatDate(orderDetails.createdAt)}
                </td>
              </tr>
              <tr className={css.invoiceItem}>
                <td className={css.invoiceName}>Ім&apos;я та прізвище</td>
                <td className={css.invoiceValue}>
                  {user?.name} {user?.serName}
                </td>
              </tr>
              <tr className={css.invoiceItem}>
                <td className={css.invoiceName}>Е-пошта</td>
                <td className={css.invoiceValue}>{user?.email}</td>
              </tr>
              <tr className={css.invoiceItem}>
                <td className={css.invoiceName}>Телефон</td>
                <td className={css.invoiceValue}>{user?.phone}</td>
              </tr>
              <tr className={css.invoiceItem}>
                <td className={css.invoiceName}>Спосіб доставки</td>
                <td className={css.invoiceValue}>
                  Нова пошта. Тут доробить треба
                </td>
              </tr>
              <tr className={css.invoiceItem}>
                <td className={css.invoiceName}>Місто</td>
                <td className={css.invoiceValue}>{user?.address?.city}</td>
              </tr>
              <tr className={css.invoiceItem}>
                <td className={css.invoiceName}>Адреса</td>
                <td className={css.invoiceValue}>{user?.address?.office}</td>
              </tr>
              <tr className={css.invoiceItem}>
                <td className={css.invoiceName}>Спосіб оплати</td>
                <td className={css.invoiceValue}>
                  Післяплата. Тут треба доробить
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={css.orderDetails}>
          <div className={css.orderDetailsBody}>
            <ul className={css.orderDetailsList}>
              {basket &&
                basket.map((item) => {
                  // console.log("item: ", item);
                  return (
                    <li className={css.orderDetailsItem} key={item._id}>
                      <div className={css.cartItem}>
                        <div className={css.cartItemImage}>
                          <div className={css.imageMob}>
                            <div className={css.imageMobBox}>
                              <img
                                className={css.itemImgMob}
                                src={item.image}
                                alt={item.productName}
                              />
                            </div>
                          </div>
                        </div>
                        <div className={css.cartItemContent}>
                          <div
                            className={css.catrItemTitle}
                            onClick={() => navigateProductClick(item.product)}
                          >
                            <p>{item.productName}</p>
                          </div>
                          <div className={css.cartItemPriceBox}>
                            <div className={css.cartItemPrice}>
                              {item.price} x {item.quantity}
                            </div>
                            <div className={css.cartItemCost}>
                              {item.price * item.quantity} грн
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className={css.orderDetailsTotal}>
              {orderDetails.totalAmount} грн
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
