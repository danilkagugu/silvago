import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addProductToBasket } from "../../services/productApi";
import css from "./ProductInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProductDetails } from "../../redux/product/selectors";
import { getProductById } from "../../redux/product/operations";
const ProductInfo = () => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const [selectedVolume, setSelectedVolume] = useState(null);
  const { productId } = useParams();
  const productDetails = useSelector(selectProductDetails);
  console.log("productDetails: ", productDetails);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (productDetails) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productDetails.id]: 1,
      }));
      if (productDetails.volumes.length > 0) {
        const defaultVolume = productDetails.volumes.reduce((prev, curr) =>
          prev.volume > curr.volume ? prev : curr
        );
        setSelectedVolume(defaultVolume);
      }
    }
  }, [productDetails]);

  const handleQuantityChange = (productId, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
    }));
  };

  const handleQuantityInputChange = (productId, value) => {
    const newValue = Math.max(1, parseInt(value, 10) || 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newValue,
    }));
  };
  const handleAddToBasket = async (productId, quantity, volume) => {
    try {
      const data = await addProductToBasket(productId, quantity, volume);
      console.log("Product added to basket:", data);
    } catch (error) {
      console.log("Error adding product to basket:", error);
    }
  };

  const handleVolumeChange = (volume) => {
    setSelectedVolume(volume);
  };
  return (
    <div className={css.productDetail}>
      {productDetails && (
        <div className={css.productContainer}>
          <div className={css.productWrapper}>
            <img
              src={productDetails.image}
              alt={productDetails.name}
              className={css.productImage}
            />
            <div className={css.productDetailBox}>
              <h1 className={css.productTitle}>{productDetails.name}</h1>
              <div className={css.infoProduct}>
                <p>Артикул:{productDetails.article}</p>
                {productDetails.quantity ? (
                  <p>✔️ В наявності</p>
                ) : (
                  <p>Закінчилась</p>
                )}
                <p className={css.info}>{productDetails.brand}</p>
                <p className={css.info}>{productDetails.category}</p>
                <p className={css.info}>
                  В наявності {productDetails.quantity} шт.
                </p>
              </div>
              {/* <p className={css.productDescription}>{productDetails.description}</p> */}
              {/* {productDetails.volumes &&
                productDetails.volumes.map((item) => (
                  <ul key={item._id}>
                    <li>
                      <p className={css.productPrice}>Ціна: {item.price} грн</p>
                    </li>
                    <li>
                      <p className={css.productPrice}>
                        Об'єм: {item.volume} грн
                      </p>
                    </li>
                  </ul>
                ))} */}
              {selectedVolume && (
                <div className={css.priceBox}>
                  <p className={css.productPrice}>
                    Ціна: {selectedVolume.price}
                  </p>
                </div>
              )}

              {/* Об'ємні варіанти */}
              {productDetails.volumes && (
                <div className={css.volumeSelector}>
                  <p>Обєм</p>
                  {productDetails.volumes.map((item) => (
                    <button
                      key={item._id}
                      className={`${css.volumeButton} ${
                        selectedVolume && selectedVolume._id === item._id
                          ? css.selected
                          : ""
                      }`}
                      onClick={() => handleVolumeChange(item)}
                    >
                      {item.volume} ml
                    </button>
                  ))}
                </div>
              )}
              {/*  {productDetails.volumes && (
                <div className={css.volumeSelector}>
                  {productDetails.volumes.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => handleVolumeChange(item)}
                    >
                      {item.volume} ml - {item.price} грн
                    </button>
                  ))}
                </div>
              )} */}

              <div className={css.priceBox}>
                <div className={css.quantityWrapper}>
                  <div className={css.inputWrapper}>
                    <button
                      className={css.btnChange}
                      onClick={() =>
                        handleQuantityChange(productDetails.id, -1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className={css.inputQuantity}
                      value={quantities[productDetails.id] || 1}
                      onChange={(e) =>
                        handleQuantityInputChange(
                          productDetails.id,
                          e.target.value
                        )
                      }
                      min="1"
                    />
                    <button
                      className={css.btnChange}
                      onClick={() => handleQuantityChange(productDetails.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={css.btnBuy}
                  onClick={() => {
                    console.log("selectedVolume", selectedVolume.volume);
                    handleAddToBasket(
                      productDetails.id,
                      quantities[productDetails.id],
                      selectedVolume.volume
                    );
                  }}
                >
                  Купити
                </button>
              </div>
            </div>
          </div>
          {productDetails && (
            <div className={css.characteristicBox}>
              <ul className={css.characteristicList}>
                <li className={css.characteristicItem}>
                  <h3 className={css.characteristicTitle}>Опис</h3>

                  <p className={css.characteristicInfo}>
                    {productDetails.description}
                  </p>
                </li>
                <li
                  className={`${css.characteristicItem} ${css.characteristicDescription}`}
                >
                  <h3 className={css.characteristicTitle}>Характеристика</h3>
                  {productDetails.characteristics &&
                    productDetails.characteristics.map((item) => (
                      <ul key={item._id}>
                        <li>Країна виробництва {item.country}</li>
                        <li>Клас товару:{item.productClass}</li>
                        <li>Призначення:{item.appointment}</li>
                        <li>Тип шкіри:{item.skinType}</li>
                        <li>Серія:{item.series}</li>
                        <li>Вид товару:{item.productType}</li>
                        <li>Вік:{item.age}</li>
                      </ul>
                    ))}
                  {/* <h3 className={css.characteristicTitle}>Характеристика</h3>
                  <p className={css.characteristicDescriptionItem}>
                    <span className={css.characteristicDescriptionSpan}>
                      Країна виробник:
                    </span>
                    <span>{productDetails.country}</span>
                  </p>
                  <p className={css.characteristicDescriptionItem}>
                    <span className={css.characteristicDescriptionSpan}>
                      Бренд:
                    </span>
                    <span>{productDetails.brand}</span>
                  </p> */}
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
