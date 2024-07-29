import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productById } from "../../services/productApi";
import css from "./ProductInfo.module.css";
const ProductInfo = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  console.log("product: ", product);
  console.log("productId: ", productId);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productById(productId);
        setProduct(data);
      } catch (error) {
        console.log("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);
  return (
    <div className={css.productDetail}>
      {product && (
        <>
          <img
            src={product.image}
            alt={product.name}
            className={css.productImage}
          />
          <h1 className={css.productName}>{product.name}</h1>
          <p className={css.productDescription}>{product.description}</p>
          <p className={css.productPrice}>Ціна: {product.price} грн</p>
          <p className={css.productQuantity}>Кількість: {product.quantity}</p>
        </>
      )}
    </div>
  );
};

export default ProductInfo;
