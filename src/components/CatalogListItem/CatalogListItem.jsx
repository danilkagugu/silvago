import css from "./CatalogListItem.module.css";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectUserData } from "../../redux/auth/selectors";
import ProductImage from "./ProductImage/ProductImage";
import ProductInfo from "./ProductInfo/ProductInfo";
import ProductModifications from "./ProductModifications/ProductModifications";
import ProductActions from "./ProductActions/ProductActions";
import {
  addProductFavorite,
  fetchTopProducts,
  getFavoriteProducts,
  removeProductFavorite,
} from "../../redux/product/operations";
import {
  selectFavoritesProducts,
  selectTopProducts,
} from "../../redux/product/selectors";
import { addProduct } from "../../redux/basket/operations";

const CatalogListItem = ({ product }) => {
  console.log("product: ", product);
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavoritesProducts);
  const { id } = useSelector(selectUserData);
  const topProducts = useSelector(selectTopProducts);

  const [quantities, setQuantities] = useState(
    product.variations.reduce(
      (acc, variant) => ({
        ...acc,
        [variant.idTorgsoft]: 1,
      }),
      {}
    )
  );

  const [activeVariation, setActiveVariation] = useState(
    product.activeVariation || product.variations[0]
  );
  console.log("activeVariation", activeVariation);

  useEffect(() => {
    setActiveVariation(product.activeVariation || product.variations[0]);
  }, [product.activeVariation, product.variations]);

  useEffect(() => {
    dispatch(fetchTopProducts());
    dispatch(getFavoriteProducts(id));
  }, [dispatch, id]);

  const handleToggleFavorite = async (productId, idTorgsoft) => {
    const isFavorite = favorites.some(
      (fav) =>
        fav.productId === productId && fav.variation.idTorgsoft === idTorgsoft
    );

    const action = isFavorite
      ? removeProductFavorite({ userId: id, productId, idTorgsoft })
      : addProductFavorite({ userId: id, productId, idTorgsoft });

    await dispatch(action);
    dispatch(getFavoriteProducts(id));
  };

  const handleAddToBasket = () => {
    const currentQuantity = quantities[activeVariation.idTorgsoft];
    if (currentQuantity > 0 && currentQuantity <= activeVariation.quantity) {
      dispatch(
        addProduct({
          slug: activeVariation.slug,
          quantity: currentQuantity,
          volume: activeVariation.volume,
          tone: activeVariation.tone,
        })
      );
    }
  };

  const handleQuantityChange = (idTorgsoft, value) => {
    setQuantities((prev) => ({
      ...prev,
      [idTorgsoft]: Math.min(Math.max(value, 1), activeVariation.quantity || 1),
    }));
  };

  const handleVolumeChange = (volumeId) => {
    const selectedVariation = product.variations.find(
      (variant) => variant.idTorgsoft === volumeId
    );

    if (selectedVariation) {
      setActiveVariation(selectedVariation);
    } else {
      console.error("Варіацію з таким об'ємом не знайдено");
    }
  };

  const handleToneChange = (tone) => {
    const selectedVariation = product.variations.find(
      (variant) =>
        variant.tone === tone && variant.volume === activeVariation.volume
    );

    if (selectedVariation) {
      setActiveVariation(selectedVariation);
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
      [idTorgsoft]: Math.min(prev[idTorgsoft] + 1, activeVariation.quantity),
    }));
  };

  const isFavorite = favorites.some(
    (fav) =>
      fav.productId === product._id &&
      fav.variation.idTorgsoft === activeVariation?.idTorgsoft
  );

  return (
    <div className={css.catalogCard}>
      <div className={css.cardContainer} id={product._id}>
        <div className={css.catalogCardMain}>
          <div className={css.catalogCardMainB}>
            <ProductImage
              isTopProduct={topProducts.some(
                (topProduct) => topProduct._id === product._id
              )}
              volumeDetail={activeVariation}
            />
            <ProductInfo product={product} volumeDetail={activeVariation} />
          </div>
        </div>
        <div className={css.catalogCardFooter}>
          <ProductModifications
            handleToneChange={handleToneChange}
            handleVolumeChange={handleVolumeChange}
            product={product}
            volumeDetail={activeVariation}
          />
          <ProductActions
            handleAddToBasket={handleAddToBasket}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleQuantityChange={handleQuantityChange}
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            product={product}
            quantities={quantities}
            volumeDetail={activeVariation}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogListItem;
