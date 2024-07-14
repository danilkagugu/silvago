import { useState } from "react";
import css from "./BasketRigth.module.css";

const BasketRigth = () => {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (product) => {
    const existingItem = basketItems.find((item) => item._id === product._id);
    if (existingItem) {
      // If product already exists in basket, increase its quantity
      const updatedItems = basketItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setBasketItems(updatedItems);
    } else {
      // If product is not in basket, add it with quantity 1
      setBasketItems([...basketItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className={css.container}>
      <h2>Basket</h2>
      <ul>
        {basketItems.map((item) => (
          <li key={item._id}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BasketRigth;
