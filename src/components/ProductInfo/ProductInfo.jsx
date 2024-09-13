import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import css from "./ProductInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProductDetails } from "../../redux/product/selectors";
import { getProductById } from "../../redux/product/operations";
import { addProduct } from "../../redux/basket/operations";

const ProductInfo = () => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const [selectedVolume, setSelectedVolume] = useState(null);
  const { slug } = useParams();
  const productDetails = useSelector(selectProductDetails);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductById(slug));
  }, [dispatch, slug]);

  // Функція для отримання об'єму з slug
  const getVolumeFromSlug = (slug) => {
    const volumeMatch = slug.match(/-(\d+)ml$/); // Парсимо об'єм з кінця slug
    return volumeMatch ? parseInt(volumeMatch[1], 10) : null;
  };

  useEffect(() => {
    if (productDetails?.product) {
      // Оновлення кількості продукту в кошику
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productDetails.product._id]:
          prevQuantities[productDetails.product._id] || 1,
      }));

      // Отримуємо об'єм з URL
      const volumeFromSlug = getVolumeFromSlug(slug);

      // Вибираємо об'єм з продукту на основі об'єму з slug або встановлюємо найбільший
      const defaultVolume = volumeFromSlug
        ? productDetails.product.volumes.find(
            (volume) => volume.volume === volumeFromSlug
          )
        : productDetails.product.volumes.reduce((prev, curr) =>
            prev.volume > curr.volume ? prev : curr
          );

      setSelectedVolume(defaultVolume);
    }
  }, [productDetails, slug]);

  const handleQuantityChange = (productId, amount) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity = Math.min(
        Math.max(1, currentQuantity + amount),
        selectedVolume?.quantity || 1
      );
      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  const handleQuantityInputChange = (productId, value) => {
    const numericValue = parseInt(value, 10);
    const maxQuantity = selectedVolume?.quantity || 0;
    const newValue = Math.min(Math.max(1, numericValue || 1), maxQuantity);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newValue,
    }));
  };
  const handleAddToBasket = () => {
    dispatch(
      addProduct({
        slug: selectedVolume.slug,
        quantity: quantities[productDetails.product._id],
        volume: selectedVolume.volume,
        price: selectedVolume.price,
      })
    );
  };

  const handleVolumeChange = (volume) => {
    setSelectedVolume(volume);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productDetails.product._id]: 1, // Скидаємо кількість на 1 при зміні об'єму
    }));
    const newSlug = slug.replace(/-\d+ml$/, "");

    // Додаємо новий об'єм до slug
    const updatedSlug = `${newSlug}-${volume.volume}ml`;

    // Оновлюємо URL
    navigate(`/product/${updatedSlug}`);
  };

  const getPriceDetails = () => {
    const volume = selectedVolume;
    if (volume) {
      const price = volume.price;
      const discount = volume.discount || 0;
      const discountedPrice = price * (1 - discount / 100);
      return discountedPrice < price ? discountedPrice : price;
    }
    return 0;
  };

  return (
    <div className={css.productDetail}>
      {productDetails?.product && (
        <div className={css.productContainer}>
          <div className={css.productWrapper}>
            <img
              src={productDetails.product.image}
              alt={productDetails.product.name}
              className={css.productImage}
            />
            <div className={css.productDetailBox}>
              <h1 className={css.productTitle}>
                {productDetails.product.name}
              </h1>
              <div className={css.infoProduct}>
                <p>Артикул: {productDetails.product.article}</p>
                {selectedVolume && (
                  <p>
                    {productDetails.product.volumes.some(
                      (item) =>
                        item._id === selectedVolume._id && item.quantity > 0
                    )
                      ? "✔️ В наявності"
                      : "Закінчилась"}
                  </p>
                )}
                <p className={css.info}>{productDetails.product.brand}</p>
                <p className={css.info}>{productDetails.product.category}</p>
                <p className={css.info}>
                  В наявності {productDetails.product.quantity} шт.
                </p>
              </div>

              {selectedVolume && (
                <div className={css.priceBox}>
                  <p className={css.productPrice}>
                    {Math.ceil(getPriceDetails())} ₴
                  </p>
                </div>
              )}

              {/* Об'ємні варіанти */}
              {productDetails.product.volumes && (
                <div className={css.volumeSelector}>
                  <p>Об&apos;єм</p>
                  {productDetails.product.volumes.map((item) => (
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

              <div className={css.priceBox}>
                <div className={css.quantityWrapper}>
                  <div className={css.inputWrapper}>
                    <button
                      className={css.btnChange}
                      onClick={() =>
                        handleQuantityChange(productDetails.product._id, -1)
                      }
                      disabled={
                        (quantities[productDetails.product._id] || 1) <= 1
                      }
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className={css.inputQuantity}
                      value={quantities[productDetails.product._id] || 1}
                      onChange={(e) =>
                        handleQuantityInputChange(
                          productDetails.product._id,
                          e.target.value
                        )
                      }
                      min="1"
                      max={selectedVolume?.quantity || 1}
                    />
                    <button
                      className={css.btnChange}
                      onClick={() =>
                        handleQuantityChange(productDetails.product._id, 1)
                      }
                      disabled={
                        (quantities[productDetails.product._id] || 1) >=
                        (selectedVolume?.quantity || 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={css.btnBuy}
                  onClick={() => {
                    handleAddToBasket(
                      slug,
                      quantities[productDetails.product._id],
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
                    {productDetails.product.description}
                  </p>
                </li>
                <li
                  className={`${css.characteristicItem} ${css.characteristicDescription}`}
                >
                  <h3 className={css.characteristicTitle}>Характеристика</h3>
                  {productDetails.product.characteristics &&
                    productDetails.product.characteristics.map(
                      (char, index) => (
                        <p className={css.characteristicInfo} key={index}>
                          {char.name}: {char.value}
                        </p>
                      )
                    )}
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
