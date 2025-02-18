import css from "./FavoriteItem.module.css";

import { addProduct, addToCart } from "../../redux/basket/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FavoriteProductImage from "./FavoretiProductImage/FavoretiProductImage";
import FavoriteProductInfo from "./FavoriteProductInfo/FavoriteProductInfo";
import FavoriteProductModifications from "./FavoriteProductModifications/FavoriteProductModifications";
import FavoriteProductActions from "./FavoriteProductActions/FavoriteProductActions";
import { selectTopProducts } from "../../redux/product/selectors";
import {
  addProductFavorite,
  getFavoriteProducts,
  removeProductFavorite,
  toogleFavorite,
} from "../../redux/product/operations";

const FavoriteItem = ({ product, favoriteProducts, id }) => {
  const [quantity, setQuantity] = useState(1);
  const [quantities, setQuantities] = useState(
    product.allVariations.reduce(
      (acc, variant) => ({
        ...acc,
        [variant.idTorgsoft]: 1,
      }),
      {}
    )
  );
  const dispatch = useDispatch();

  const [selectedVariation, setSelectedVariation] = useState(
    product.selectedVariation
  );
  useEffect(() => {
    setQuantity(1); // При зміні варіації значення quantity завжди скидається на 1
  }, [selectedVariation]);
  const topProducts = useSelector(selectTopProducts);

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

  const handleAddToBasket = () => {
    if (quantities[product.volumeId] > product.quantityInStock) {
      console.log("quantities: ", quantities);
      console.error("Not enough stock for this volume.");
      return;
    }
    dispatch(
      addProduct({
        slug: product.slug,
        quantity: quantities[product.volumeId],
        volume: product.volume,
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

  const handleDecrement = (idTorgsoft) => {
    setQuantities((prev) => ({
      ...prev,
      [idTorgsoft]: Math.max(prev[idTorgsoft] - 1, 1),
    }));
  };

  const handleIncrement = (idTorgsoft) => {
    setQuantities((prev) => ({
      ...prev,
      [idTorgsoft]: Math.min(prev[idTorgsoft] + 1, selectedVariation.quantity),
    }));
  };

  const handleQuantityChange = (idTorgsoft, value) => {
    setQuantities((prev) => ({
      ...prev,
      [idTorgsoft]: Math.min(
        Math.max(value, 1),
        selectedVariation.quantity || 1
      ),
    }));
  };

  const handleToggleFavorite = async (productId, idTorgsoft) => {
    const isFavorite = favoriteProducts.some(
      (fav) =>
        fav.productId === productId && fav.variation.idTorgsoft === idTorgsoft
    );

    const action = isFavorite
      ? removeProductFavorite({ userId: id.id, productId, idTorgsoft })
      : addProductFavorite({ userId: id.id, productId, idTorgsoft });

    await dispatch(action);
    dispatch(getFavoriteProducts(id.id));
  };

  const isFavorite = favoriteProducts.some(
    (fav) =>
      fav.productId === product.productId &&
      fav.selectedVariation.idTorgsoft === selectedVariation?.idTorgsoft
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
            handleAddToBasket={handleAddToBasket}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleQuantityChange={handleQuantityChange}
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            product={product}
            quantities={quantities}
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
