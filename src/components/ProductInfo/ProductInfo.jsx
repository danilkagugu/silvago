import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import css from "./ProductInfo.module.css";
import { useDispatch } from "react-redux";
import { toogleFavorite } from "../../redux/product/operations";
import {
  addToCart,
  removeFromCart,
  updateQuantityInCart,
} from "../../redux/basket/operations";

import ProductMainInfo from "./ProductMainInfo/ProductMainInfo";
import ProductMedia from "./ProductMedia/ProductMedia";
import ProductCharacteristics from "./ProductCharacteristics/ProductCharacteristics";
import ProductDescriptionTabs from "./ProductDescriptionTabs/ProductDescriptionTabs";
import ProductAdditionalInfoTabs from "./ProductAdditionalInfoTabs/ProductAdditionalInfoTabs";

const ProductInfo = ({
  id,
  productDetails,
  brandsTorgsoft,
  favorites,
  categories,
  loading,
  itemsCart,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { slug } = useParams();
  // console.log("itemsCart", itemsCart);
  // const [quantities, setQuantities] = useState({});
  const [localQuantities, setLocalQuantities] = useState({});
  console.log("localQuantities: ", localQuantities);
  const [descriptionTab, setDescriptionTab] = useState("Опис");
  const [descriptionInfoTab, setDescriptionInfoTab] = useState("Доставка");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(
    productDetails.selectedVariation
  );
  // const loading = useSelector(selectProductLoading);

  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add(css.noScroll);
      // document.documentElement.classList.add(css.noScroll);
    } else {
      document.body.classList.remove(css.noScroll);
      // document.documentElement.classList.remove(css.noScroll);
    }

    // Очищення при демонтажі компонента
    return () => {
      document.body.classList.remove(css.noScroll);
      // document.documentElement.classList.remove(css.noScroll);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (productDetails?.product && productDetails?.volume) {
      const viewedProducts =
        JSON.parse(localStorage.getItem("viewedProducts")) || [];

      // Перевіряємо, чи товар вже є в списку
      const isAlreadyViewed = viewedProducts.some(
        (item) =>
          item.product._id === productDetails.product._id &&
          item.volume._id === productDetails.volume._id
      );

      if (!isAlreadyViewed) {
        // Додаємо товар разом із `volume` (конкретна варіація)
        const updatedProducts = [
          { product: productDetails.product, volume: productDetails.volume },
          ...viewedProducts,
        ].slice(0, 20);

        localStorage.setItem("viewedProducts", JSON.stringify(updatedProducts));
      }
    }
  }, [productDetails]);

  useEffect(() => {
    const cartItem = itemsCart.find(
      (item) =>
        item.productId.toString() === productDetails.productId.toString() &&
        Number(item.selectedVariation.idTorgsoft) ===
          Number(selectedVariation.idTorgsoft)
    );

    setLocalQuantities((prev) => ({
      ...prev,
      [selectedVariation.idTorgsoft]: cartItem ? cartItem.quantity : 1,
    }));
  }, [selectedVariation, itemsCart]);

  const handleFavoriteToggle = () => {
    dispatch(
      toogleFavorite({
        userId: id,
        productId: productDetails.productId,
        idTorgsoft: selectedVariation.idTorgsoft,
      })
    );
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        userId: id,
        productId: productDetails.productId,
        idTorgsoft: selectedVariation.idTorgsoft,
        quantity:
          localQuantities[productDetails.selectedVariation.idTorgsoft] ??
          quantityInCart,
      })
    );
  };
  const handleVolumeChange = (volumeId) => {
    const newVariation = productDetails.variations.find(
      (variant) => variant.idTorgsoft === volumeId
    );

    if (newVariation) {
      setSelectedVariation(newVariation);
      const cartItem = itemsCart.find(
        (item) =>
          item.productId === productDetails.productId &&
          item.selectedVariation.idTorgsoft === newVariation.idTorgsoft
      );

      setLocalQuantities((prev) => ({
        ...prev,
        [newVariation.idTorgsoft]: cartItem ? cartItem.quantity : 1,
      }));
      navigate(`/product/${newVariation?.slug}`);
    } else {
      console.error("Варіацію з таким об'ємом не знайдено");
    }
  };

  const handleToneChange = (tone) => {
    const newVariation = productDetails.variations.find(
      (variant) =>
        variant.tone === tone && variant.volume === selectedVariation.volume
    );

    if (newVariation) {
      setSelectedVariation(newVariation);
      navigate(`/product/${newVariation?.slug}`);
    } else {
      console.error("Варіацію з таким тоном не знайдено");
    }
  };

  const isFavorite = favorites.some(
    (fav) =>
      fav.productId.toString() === productDetails.productId.toString() &&
      Number(fav?.selectedVariation?.idTorgsoft) ===
        Number(selectedVariation?.idTorgsoft)
  );

  // if (!productDetails) {
  //   return <div>Завантаження...</div>;
  // }

  // const { product, volume, breadcrumbs } = productDetails;

  const handleQuantityChange = (newQuantity) => {
    const cartItem = itemsCart.find(
      (item) =>
        item.productId === productDetails.productId &&
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
    if (newQuantity < 1) {
      dispatch(
        removeFromCart({
          userId: id,
          productId: productDetails.productId,
          idTorgsoft: selectedVariation.idTorgsoft,
        })
      );
    } else {
      dispatch(
        updateQuantityInCart({
          userId: id,
          productId: productDetails.productId,
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

  const cartItem = itemsCart.find(
    (item) =>
      item.productId === productDetails.productId &&
      item.selectedVariation.idTorgsoft ===
        productDetails.selectedVariation.idTorgsoft
  );
  const isInCart = !!itemsCart.find(
    (item) =>
      item.productId === productDetails.productId &&
      item.selectedVariation.idTorgsoft === selectedVariation.idTorgsoft
  );
  // console.log("isInCart", isInCart);
  const quantityInCart = cartItem ? cartItem.quantity : 1;
  return (
    <>
      <section className={css.product}>
        {productDetails && (
          <div className={css.productContent}>
            <div
              className={`${css.productColumn} ${css.productColumnSticky} ${css.productColumnLeft}`}
            >
              <ProductMedia
                brand={brandsTorgsoft.find(
                  (b) =>
                    b.name.trim().toLowerCase() ===
                    productDetails.brand.trim().toLowerCase()
                )}
                handleBrandClick={(brandId) => navigate(`/brand/${brandId}`)}
                volume={selectedVariation}
              />
            </div>
            <div
              className={`${css.productColumn} ${css.productColumnSticky}  ${css.productRight}`}
            >
              <div className={css.productColumnContainer}>
                <ProductMainInfo
                  categories={categories}
                  product={productDetails}
                  volume={selectedVariation}
                  breadcrumbs={productDetails.breadcrumbs}
                  handleFavoriteToggle={handleFavoriteToggle}
                  handleToneChange={handleToneChange}
                  handleVolumeChange={handleVolumeChange}
                  handleAddToCart={handleAddToCart}
                  slug={slug}
                  isFavorite={isFavorite}
                  loading={loading}
                  handleQuantityChange={handleQuantityChange}
                  localQuantities={localQuantities}
                  selectedVariation={selectedVariation}
                  quantityInCart={quantityInCart}
                  handleInputChange={handleInputChange}
                  isInCart={isInCart}
                />

                <ProductCharacteristics
                  product={productDetails}
                  productDetails={productDetails}
                />

                <ProductDescriptionTabs
                  descriptionTab={descriptionTab}
                  product={productDetails}
                  setDescriptionTab={setDescriptionTab}
                />

                <ProductAdditionalInfoTabs
                  descriptionInfoTab={descriptionInfoTab}
                  setDescriptionInfoTab={setDescriptionInfoTab}
                  tabsInfo={[
                    "Доставка",
                    "Оплата",
                    "Гарантія",
                    "Повернення",
                    "Консультація",
                  ]}
                />
              </div>
            </div>
          </div>
        )}
        {/* <div className={css.productDetailsBottom}></div> */}
      </section>
    </>
  );
};

export default ProductInfo;
