import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import css from "./ProductInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavoritesProducts,
  selectProductDetails,
  selectProductLoading,
} from "../../redux/product/selectors";
import {
  addProductFavorite,
  fetchProductVariation,
  getFavoriteProducts,
  getProductById,
  removeProductFavorite,
} from "../../redux/product/operations";
import { addProduct } from "../../redux/basket/operations";
import {
  fetchAllBrandsTorgsoft,
  fetchAllCategories,
} from "../../redux/inventoryStore/operations";
import {
  selectAllBrandsTorgsoft,
  selectAllCategories,
} from "../../redux/inventoryStore/selectors";

import ProductMainInfo from "./ProductMainInfo/ProductMainInfo";
import ProductMedia from "./ProductMedia/ProductMedia";
import ProductCharacteristics from "./ProductCharacteristics/ProductCharacteristics";
import ProductDescriptionTabs from "./ProductDescriptionTabs/ProductDescriptionTabs";
import ProductAdditionalInfoTabs from "./ProductAdditionalInfoTabs/ProductAdditionalInfoTabs";
import { getUserInfo } from "../../redux/auth/operations";
import { selectUserData } from "../../redux/auth/selectors";

const ProductInfo = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { slug } = useParams();

  const [quantities, setQuantities] = useState({});
  const [descriptionTab, setDescriptionTab] = useState("Опис");
  const [descriptionInfoTab, setDescriptionInfoTab] = useState("Доставка");
  const [isExpanded, setIsExpanded] = useState(false);

  const productDetails = useSelector(selectProductDetails);
  // console.log("productDetails: ", productDetails?.breadcrumbs);
  const brandsTorgsoft = useSelector(selectAllBrandsTorgsoft);
  const favorites = useSelector(selectFavoritesProducts);
  const categories = useSelector(selectAllCategories);
  const userData = useSelector(selectUserData) || {};
  const { id } = userData;

  const loading = useSelector(selectProductLoading);

  useEffect(() => {
    dispatch(getProductById(slug));
    dispatch(fetchAllCategories());
    dispatch(fetchAllBrandsTorgsoft());
    dispatch(getFavoriteProducts(id));
    dispatch(getUserInfo());
  }, [dispatch, slug, id]);

  // const toggleDescription = () => {
  //   if (isExpanded) {
  //     // Почати процес закриття
  //     setIsClosing(true);
  //     setTimeout(() => {
  //       setIsExpanded(false); // Прибрати видимість
  //       setIsClosing(false); // Скинути стан закриття
  //     }, 300); // Відповідає тривалості transition для висоти
  //   } else {
  //     setIsExpanded(true);
  //   }
  // };

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
    if (productDetails?.product) {
      // Оновлення кількості продукту в кошику
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productDetails.volume._id]:
          prevQuantities[productDetails.volume._id] || 1,
      }));
    }
  }, [productDetails, slug]);

  const handleToggleFavorite = async (product, idTorgsoft) => {
    if (!product || !product._id) {
      console.warn("Product is invalid.");
      return;
    }

    const isFavorite = favorites.some(
      (fav) =>
        fav.productId === product._id &&
        fav.variation.idTorgsoft === volume.idTorgsoft
    );
    const action = isFavorite
      ? removeProductFavorite({
          userId: id,
          productId: product._id,
          idTorgsoft,
        })
      : addProductFavorite({ userId: id, productId: product._id, idTorgsoft });

    await dispatch(action);
    dispatch(getFavoriteProducts(id));
  };

  const handleAddToBasket = () => {
    dispatch(
      addProduct({
        slug: volume.slug,
        quantity: quantities[volume._id],
        volume: volume.volume,
        tone: volume.tone
          ? parseInt(volume.tone.match(/\d+/)?.[0]) || null
          : null,
      })
    );
  };

  const handleVolumeChange = (productId, volumeId) => {
    // Змінюємо лише об'єм, залишаючи поточний тон
    const activeVariation = product.variations.find(
      (item) =>
        item.idTorgsoft === volumeId && (volumeId || item.tone === volume.tone)
    );
    dispatch(
      fetchProductVariation({
        productId,
        volumeId,
        tone: volume.tone, // Поточний тон залишається
      })
    );
    navigate(`/product/${activeVariation?.slug}`);
  };

  const handleToneChange = (productId, tone) => {
    const productVariations = product.variations.filter(
      (variant) => variant.tone === tone
    );

    // Знаходимо варіацію з поточним об'ємом
    let matchingVariation = productVariations.find(
      (variant) => variant.volume === volume.volume
    );

    // Якщо такої немає, беремо першу доступну варіацію
    if (!matchingVariation && productVariations.length > 0) {
      matchingVariation = productVariations[0];
    }

    // Якщо знайшли варіацію, оновлюємо обидва параметри
    if (matchingVariation) {
      dispatch(
        fetchProductVariation({
          productId,
          volumeId: matchingVariation.idTorgsoft,
          tone: tone,
        })
      );
      navigate(`/product/${matchingVariation?.slug}`);
    } else {
      console.error("Варіацію з таким об'ємом і тоном не знайдено");
    }
  };

  if (!productDetails) {
    return <div>Завантаження...</div>;
  }

  const { product, volume, breadcrumbs } = productDetails;

  return (
    <>
      {
        <div className={css.desctop}>
          {product && (
            <div className={css.productContent}>
              <div className={css.productLeft}>
                <ProductMedia
                  brand={brandsTorgsoft.find(
                    (b) =>
                      b.name.trim().toLowerCase() ===
                      product.brand.trim().toLowerCase()
                  )}
                  handleBrandClick={(brandId) => navigate(`/brand/${brandId}`)}
                  volume={volume}
                />
              </div>
              <div className={css.productRight}>
                <div>
                  <div className={css.productGroup}>
                    <ProductMainInfo
                      categories={categories}
                      product={product}
                      volume={volume}
                      breadcrumbs={breadcrumbs}
                      handleToggleFavorite={handleToggleFavorite}
                      handleToneChange={handleToneChange}
                      handleVolumeChange={handleVolumeChange}
                      handleAddToBasket={handleAddToBasket}
                      quantities={quantities}
                      slug={slug}
                      isFavorite={favorites.some(
                        (fav) =>
                          fav.productId === product._id &&
                          fav.variation.idTorgsoft === volume.idTorgsoft
                      )}
                      loading={loading}
                    />
                  </div>

                  <ProductCharacteristics
                    product={product}
                    productDetails={productDetails}
                  />

                  <ProductDescriptionTabs
                    descriptionTab={descriptionTab}
                    product={product}
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
          <div className={css.productDetailsBottom}></div>
        </div>
      }
    </>
  );
};

export default ProductInfo;
