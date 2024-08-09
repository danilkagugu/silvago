import { Fragment, useEffect, useState } from "react";
import { getOrder } from "../../services/productApi";
import css from "./OrderHistory.module.css";
import { getAreaByRef } from "../../services/NovaPoshtaApi";

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  // console.log("history: ", history);

  const [expandedRows, setExpandedRows] = useState({});
  const [areaNames, setAreaNames] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const orderData = await getOrder();
        setHistory(orderData);

        const uniqueRefs = new Set(
          orderData.map((order) => order.user.address.area)
        );

        const areaPromises = Array.from(uniqueRefs).map(async (ref) => {
          try {
            const data = await getAreaByRef(ref);
            return { ref, name: data[0].Description };
          } catch (error) {
            console.error(`Error fetching area for ref ${ref}:`, error);
            return { ref, name: ref };
          }
        });

        const areas = await Promise.all(areaPromises);
        setAreaNames(
          areas.reduce((acc, { ref, name }) => {
            acc[ref] = name;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Помилка отримання продуктів:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleOpenInfoProduct = (orderId) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [orderId]: !prevExpandedRows[orderId],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div>
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
            history.map((order, index) => {
              console.log("order", order);
              return (
                <Fragment key={order._id}>
                  <tr>
                    <td>{index + 1}</td>
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
                                    <td>
                                      <img
                                        src={product.image}
                                        alt={product.productName}
                                        className={css.productImage}
                                      />
                                      <p>{product.productName}</p>
                                    </td>
                                    {/* <td>{product.productName}</td> */}
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
                                    {areaNames[order.user.address.area]} область
                                    ,{order.user.address.city},
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
    </div>
  );
};

export default OrderHistory;
