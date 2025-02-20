import css from "./FavoriteItem.module.css";

import {
  addToCart,
  removeFromCart,
  updateQuantityInCart,
} from "../../redux/basket/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FavoriteProductImage from "./FavoretiProductImage/FavoretiProductImage";
import FavoriteProductInfo from "./FavoriteProductInfo/FavoriteProductInfo";
import FavoriteProductModifications from "./FavoriteProductModifications/FavoriteProductModifications";
import FavoriteProductActions from "./FavoriteProductActions/FavoriteProductActions";
import { selectTopProducts } from "../../redux/product/selectors";
import { toogleFavorite } from "../../redux/product/operations";
import { IoCloseSharp } from "react-icons/io5";

const FavoriteItem = ({ product, favoriteProducts, id, itemsCart }) => {
  console.log("product: ", product);
  const [localQuantities, setLocalQuantities] = useState({});
  // console.log("localQuantities: ", localQuantities);

  const dispatch = useDispatch();

  const [selectedVariation, setSelectedVariation] = useState(
    product?.selectedVariation
  );

  const cartItem = itemsCart.find(
    (item) =>
      item.productId === product.productId &&
      item.selectedVariation.idTorgsoft === product.selectedVariation.idTorgsoft
  );
  const quantityInCart = cartItem ? cartItem.quantity : 1; // Якщо немає в кошику, беремо 1

  useEffect(() => {
    if (product?.selectedVariation) {
      setSelectedVariation(product.selectedVariation);
    } else if (product?.allVariations?.length) {
      // Якщо `selectedVariation` відсутній, встановлюємо першу доступну варіацію
      setSelectedVariation(product.allVariations[0]);
    }
  }, [product]);

  useEffect(() => {
    const cartItem = itemsCart.find(
      (item) =>
        item.productId.toString() === product.productId.toString() &&
        Number(item.selectedVariation.idTorgsoft) ===
          Number(selectedVariation.idTorgsoft)
    );

    setLocalQuantities((prev) => ({
      ...prev,
      [selectedVariation.idTorgsoft]: cartItem ? cartItem.quantity : 1,
    }));
  }, [selectedVariation, itemsCart]);

  const topProducts = useSelector(selectTopProducts);

  const handleQuantityChangee = (newQuantity) => {
    const cartItem = itemsCart.find(
      (item) =>
        item.productId === product.productId &&
        item.selectedVariation.idTorgsoft === selectedVariation.idTorgsoft
    );

    if (!cartItem) {
      // Якщо товару немає в кошику – просто змінюємо localQuantities
      setLocalQuantities((prev) => ({
        ...prev,
        [selectedVariation.idTorgsoft]: newQuantity,
      }));
      return;
    }

    // Якщо товар вже є в кошику – оновлюємо кількість в Redux
    if (newQuantity < 1) {
      dispatch(
        removeFromCart({
          userId: id.id,
          productId: product.productId,
          idTorgsoft: selectedVariation.idTorgsoft,
        })
      );
    } else {
      dispatch(
        updateQuantityInCart({
          userId: id.id,
          productId: product.productId,
          idTorgsoft: selectedVariation.idTorgsoft,
          quantity: newQuantity,
        })
      );
    }
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
      [selectedVariation.idTorgsoft]: value || "", // Якщо поле порожнє, залишаємо ""
    }));
  };

  const handleInputBlur = () => {
    let newQuantity = localQuantities[selectedVariation.idTorgsoft];

    if (!newQuantity || newQuantity < 1) {
      newQuantity = 1; // Мінімальна кількість - 1
    } else if (newQuantity > selectedVariation.quantity) {
      newQuantity = selectedVariation.quantity; // Обмежуємо максимальною кількістю
    }

    handleQuantityChangee(newQuantity);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        userId: id.id,
        productId: product.productId,
        idTorgsoft: selectedVariation.idTorgsoft,
        quantity:
          localQuantities[product.selectedVariation.idTorgsoft] ??
          quantityInCart,
      })
    );
  };

  const handleVolumeChange = (volumeId) => {
    const newVariation = product.allVariations.find(
      (variant) => variant.idTorgsoft === volumeId
    );

    if (newVariation) {
      setSelectedVariation(newVariation);
      const cartItem = itemsCart.find(
        (item) =>
          item.productId === product.productId &&
          item.selectedVariation.idTorgsoft === newVariation.idTorgsoft
      );

      setLocalQuantities((prev) => ({
        ...prev,
        [newVariation.idTorgsoft]: cartItem ? cartItem.quantity : 1,
      }));
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

  const isFavorite = favoriteProducts.some((fav) => {
    return (
      fav.productId.toString() === product.productId.toString() &&
      Number(fav?.selectedVariation?.idTorgsoft) ===
        Number(selectedVariation?.idTorgsoft)
    );
  });
  const handleFavoriteToggle = () => {
    dispatch(
      toogleFavorite({
        userId: id.id,
        productId: product.productId,
        idTorgsoft: selectedVariation.idTorgsoft,
      })
    );
  };
  // if (!selectedVariation) {
  // console.log("selectedVariation: ", selectedVariation);
  //   return null; // Або можна показати Skeleton Loader
  // }

  return (
    <div className={css.catalogCard}>
      <div className={css.cardContainer} id={product._id}>
        <span className={css.removeBtn} onClick={handleFavoriteToggle}>
          <IoCloseSharp className={css.removeIcon} />
        </span>
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
            isFavorite={isFavorite}
            product={product}
            // quantities={quantities}
            selectedVariation={selectedVariation}
            id={id}
            handleFavoriteToggle={handleFavoriteToggle}
            handleAddToCart={handleAddToCart}
            quantityInCart={quantityInCart}
            itemsCart={itemsCart}
            handleInputBlur={handleInputBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
