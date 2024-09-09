import { useEffect, useState } from "react";
import { getOrder } from "../../services/productApi";
import css from "./OrderHistory.module.css";
// import { getAreaByRef } from "../../services/NovaPoshtaApi";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { formatDate } from "../../helpers/productActions";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  console.log("history: ", history);

  // const [expandedRows, setExpandedRows] = useState({});
  // const [areaNames, setAreaNames] = useState({});
  // console.log("areaNames: ", areaNames);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const orderData = await getOrder();
        setHistory(orderData);

        // const uniqueRefs = new Set(
        //   orderData.map((order) => order.user.address.area)
        // );

        // const areaPromises = Array.from(uniqueRefs).map(async (ref) => {
        //   try {
        //     const data = await getAreaByRef(ref);
        //     return { ref, name: data[0].Description };
        //   } catch (error) {
        //     console.error(`Error fetching area for ref ${ref}:`, error);
        //     return { ref, name: ref };
        //   }
        // });

        // const areas = await Promise.all(areaPromises);
        // setAreaNames(
        //   areas.reduce((acc, { ref, name }) => {
        //     acc[ref] = name;
        //     return acc;
        //   }, {})
        // );
      } catch (error) {
        console.error("Помилка отримання продуктів:", error);
      }
    };
    fetchProducts();
  }, []);

  // const toggleOpenInfoProduct = (orderId) => {
  //   setExpandedRows((prevExpandedRows) => ({
  //     ...prevExpandedRows,
  //     [orderId]: !prevExpandedRows[orderId],
  //   }));
  // };

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

  return (
    <div>
      <h1 className={css.title}>Замовлення</h1>
      <ul className={css.ordersDesc}>
        {history &&
          history.map((order) => {
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
        {history &&
          history.map((order) => {
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
{
  /* <div>
  <table className={css.table}>
    <thead>
      <tr>
        <th>№ замовлення</th>
        <th>Дата</th>
        <th>Кількість</th>
        <th>Сума</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      {history &&
        history.map((order) => {
          return (
            <Fragment key={order._id}>
              <tr>
                <td>{order.orderNumber}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td>{order.allQuantity}</td>
                <td>{order.totalAmount} грн</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => toggleOpenInfoProduct(order._id)}>
                    {expandedRows[order._id] ? "-" : "+"}
                  </button>
                </td>
              </tr>
              {expandedRows[order._id] && (
                <tr>
                  <td colSpan="6">
                    <div className={css.orderTable}>
                      <div className={css.tableWrap}>
                        <table className={css.nestedTable}>
                          <thead>
                            <tr>
                              <th>Продукт</th>
                              <th>Об’єм</th>
                              <th>Ціна</th>
                              <th>Кількість</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.basket.map((product, idx) => (
                              <tr key={product.product + idx}>
                                <td
                                  onClick={() =>
                                    handleProductClick(product.product)
                                  }
                                >
                                  <img
                                    src={product.image}
                                    alt={product.productName}
                                    className={css.productImage}
                                  />
                                  <p>{product.productName}</p>
                                </td>
                                <td>{product.volume}</td>
                                <td>{product.price} грн</td>
                                <td>{product.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className={css.infoWrap}>
                        <table>
                          <tbody>
                            <tr>
                              <td>Доставка</td>
                              <td>У відділення Нової Пошти</td>
                            </tr>
                            <tr>
                              <td>Адреса</td>
                              <td>
                                {areaNames[order.user.address.area]} область ,
                                {order.user.address.city},
                                {order.user.address.office}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
    </tbody>
  </table>
</div>; */
}
