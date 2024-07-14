import { useEffect, useState } from "react";
import { getBasketProduct, productById } from "../../services/productApi";
import css from "./BasketRigth.module.css";
import FavoriteItem from "../FavoriteItem/FavoriteItem";

const BasketRigth = () => {
  const [basket, setBasket] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const basketData = await getBasketProduct();
        console.log("Fetched basket data:", basketData);

        if (!basketData || !basketData.products) {
          console.error("Invalid basket data format:", basketData);
          return;
        }
        setBasket(basketData.products);

        // Fetch details for all products in the basket
        const details = {};
        for (const basketItem of basketData.products) {
          const response = await productById(basketItem.product);
          details[basketItem.product] = response;
        }
        setProductDetails(details);
      } catch (error) {
        console.error("Error fetching basket products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={css.container}>
      <h2>Basket</h2>
      <ul>
        {basket.map((product) => {
          const details = productDetails[product.product];
          return (
            <li key={product._id}>
              <p>BASKET ITEM ID: {product._id}</p>
              {details && (
                <FavoriteItem
                  productImg={details.image}
                  productName={details.name}
                  productPrice={details.price}
                />
              )}
              <button onClick={() => console.log("Product details:", details)}>
                View Details
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BasketRigth;
