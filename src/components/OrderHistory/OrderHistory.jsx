import { useEffect, useState } from "react";
import { getOrder } from "../../services/productApi";
import css from "./OrderHistory.module.css";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { formatDate } from "../../helpers/productActions";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  // console.log("history: ", history);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const orderData = await getOrder();
        setHistory(orderData);
      } catch (error) {
        console.error("Помилка отримання продуктів:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleOrderClick = (orderId) => {
    navigate(`/user-cabinet/history/${orderId}`);
  };

  const getProductLabel = (quantity) => {
    const lastDigit = quantity % 10;
    const lastTwoDigits = quantity % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return "товар";
    } else if (
      lastDigit >= 2 &&
      lastDigit <= 4 &&
      !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
    ) {
      return "товари";
    } else {
      return "товарів";
    }
  };
  const sortedHistory = history.sort((a, b) => b.orderNumber - a.orderNumber);
  return (
    <div>
      <h1 className={css.title}>Замовлення</h1>
      <ul className={css.ordersDesc}>
        {sortedHistory &&
          sortedHistory.map((order) => {
            return (
              <li className={css.ordersItemDesc} key={order._id}>
                <div className={`${css.ordersData} ${css.info}`}>
                  <div
                    className={css.ordersNum}
                    onClick={() => handleOrderClick(order.orderNumber)}
                  >
                    <p>Замовлення №{order.orderNumber}</p>
                  </div>
                  <div className={css.orderDate}>
                    {formatDate(order.createdAt)}
                  </div>
                </div>
                <div className={`${css.ordersData} ${css.content}`}>
                  <h4 className={css.orderHead}>Замовлення</h4>

                  {order &&
                    order.basket.map((item) => {
                      return (
                        <div className={css.orderTitle} key={item._id}>
                          {item.productName}
                        </div>
                      );
                    })}
                </div>
                <div className={`${css.ordersData} ${css.cost}`}>
                  <div className={css.ordersCost}>{order.totalAmount} грн</div>
                </div>
              </li>
            );
          })}
      </ul>
      <div className={css.ordersMob}>
        {sortedHistory &&
          sortedHistory.map((order) => {
            return (
              <div className={css.ordersItemMob} key={order._id}>
                <div className={css.orderMob}>
                  <div
                    className={css.orderLink}
                    onClick={() => handleOrderClick(order.orderNumber)}
                  >
                    <div className={css.orderHeader}>
                      <div className={css.orderNumber}>
                        №{order.orderNumber}
                      </div>
                      <div className={css.orderDateMob}>
                        {formatDate(order.createdAt)}
                      </div>
                      <div className={css.orderStatus}>В обробці</div>
                      <div className={css.orderArrow}>
                        <IoIosArrowForward className={css.iconArrow} />
                      </div>
                    </div>
                  </div>
                  <div className={css.orderBody}>
                    <div className={css.orderContent}>
                      <div className={css.orderAmount}>
                        {order.allQuantity} {getProductLabel(order.allQuantity)}
                      </div>
                      <div className={css.orderCost}>
                        {order.totalAmount} грн
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OrderHistory;
