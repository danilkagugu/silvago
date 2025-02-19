import css from "./FavoriteItem.module.css";

import { addToCart, updateQuantityInCart } from "../../redux/basket/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FavoriteProductImage from "./FavoretiProductImage/FavoretiProductImage";
import FavoriteProductInfo from "./FavoriteProductInfo/FavoriteProductInfo";
import FavoriteProductModifications from "./FavoriteProductModifications/FavoriteProductModifications";
import FavoriteProductActions from "./FavoriteProductActions/FavoriteProductActions";
import { selectTopProducts } from "../../redux/product/selectors";
import { toogleFavorite } from "../../redux/product/operations";

const FavoriteItem = ({ product, favoriteProducts, id }) => {
  const [localQuantities, setLocalQuantities] = useState({});
  const [quantity, setQuantity] = useState(1);
  // const [quantities, setQuantities] = useState(
  //   product.allVariations.reduce(
  //     (acc, variant) => ({
  //       ...acc,
  //       [variant.idTorgsoft]: 1,
  //     }),
  //     {}
  //   )
  // );
  const dispatch = useDispatch();

  const [selectedVariation, setSelectedVariation] = useState(
    product.selectedVariation
  );

  useEffect(() => {
    setQuantity(1); // При зміні варіації значення quantity завжди скидається на 1
  }, [selectedVariation]);

  const topProducts = useSelector(selectTopProducts);

  const handleQuantityChangee = (item, newQuantity) => {
    if (newQuantity < 1) return; // Мінімальна кількість - 1

    // if (newQuantity > item.selectedVariation.quantity) {
    //   // Якщо користувач хоче більше, ніж є в наявності, показуємо повідомлення
    //   setShowOutOfStockMessage((prev) => ({
    //     ...prev,
    //     [item.selectedVariation.idTorgsoft]: true,
    //   }));

    //   // Приховуємо повідомлення через 2 секунди
    //   setTimeout(() => {
    //     setShowOutOfStockMessage((prev) => ({
    //       ...prev,
    //       [item.selectedVariation.idTorgsoft]: false,
    //     }));
    //   }, 2000);

    //   return; // Зупиняємо виконання, щоб не відправляти зайвий запит
    // }
    setLocalQuantities((prev) => ({
      ...prev,
      [item.productId]: newQuantity,
    }));

    dispatch(
      updateQuantityInCart({
        userId: id.id,
        productId: item.productId,
        idTorgsoft: item.selectedVariation.idTorgsoft,
        quantity: newQuantity,
      })
    );
  };

  const handleInputChange = (e, item) => {
    let value = e.target.value.replace(/\D/, ""); // Видаляємо нецифрові символи

    if (value) {
      value = parseInt(value, 10); // Конвертуємо у число
      if (value > item.selectedVariation.quantity) {
        value = item.selectedVariation.quantity; // Обмежуємо максимальною кількістю
      }
    }

    setLocalQuantities((prev) => ({
      ...prev,
      [item.productId]: value || "", // Якщо поле порожнє, залишаємо ""
    }));
  };

  const handleQuantityChanges = (e) => {
    setQuantity(Math.max(Number(e.target.value), 1)); // Мінімум 1
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        userId: id.id,
        productId: product.productId,
        idTorgsoft: selectedVariation.idTorgsoft,
        quantity,
      })
    );
  };

  const handleVolumeChange = (volumeId) => {
    const newVariation = product.allVariations.find(
      (variant) => variant.idTorgsoft === volumeId
    );

    if (newVariation) {
      setSelectedVariation(newVariation);
    } else {
      console.error("Варіацію з таким об'ємом не знайдено");
    }
  };

  const handleToneChange = (tone) => {
    const newVariation = product.allVariations.find(
      (variant) =>
        variant.tone === tone && variant.volume === selectedVariation.volume
    );

    if (newVariation) {
      setSelectedVariation(newVariation);
    } else {
      console.error("Варіацію з таким тоном не знайдено");
    }
  };

  // const handleQuantityChange = (idTorgsoft, value) => {
  //   setQuantities((prev) => ({
  //     ...prev,
  //     [idTorgsoft]: Math.min(
  //       Math.max(value, 1),
  //       selectedVariation.quantity || 1
  //     ),
  //   }));
  // };

  const isFavorite = favoriteProducts.some(
    (fav) =>
      fav.productId.toString() === product.productId.toString() &&
      Number(fav.selectedVariation.idTorgsoft) ===
        Number(selectedVariation?.idTorgsoft)
  );
  const handleFavoriteToggle = () => {
    dispatch(
      toogleFavorite({
        userId: id.id,
        productId: product.productId,
        idTorgsoft: product.selectedVariation.idTorgsoft,
      })
    );
  };

  return (
    <div className={css.catalogCard}>
      <div className={css.cardContainer} id={product._id}>
        <div className={css.catalogCardMain}>
          <div className={css.catalogCardMainB}>
            <FavoriteProductImage
              isTopProduct={topProducts.some(
                (topProduct) => topProduct._id === product._id
              )}
              volumeDetail={selectedVariation}
            />
            <FavoriteProductInfo
              product={product}
              volumeDetail={selectedVariation}
            />
          </div>
        </div>
        <div className={css.catalogCardFooter}>
          <FavoriteProductModifications
            handleToneChange={handleToneChange}
            handleVolumeChange={handleVolumeChange}
            product={product}
            volumeDetail={selectedVariation}
          />
          <FavoriteProductActions
            // handleQuantityChange={handleQuantityChange}
            handleQuantityChangee={handleQuantityChangee}
            handleInputChange={handleInputChange}
            localQuantities={localQuantities}
            setLocalQuantities={setLocalQuantities}
            isFavorite={isFavorite}
            product={product}
            // quantities={quantities}
            volumeDetail={selectedVariation}
            id={id}
            handleFavoriteToggle={handleFavoriteToggle}
            handleAddToCart={handleAddToCart}
            handleQuantityChanges={handleQuantityChanges}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
