import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import css from "./ProductInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavoritesProducts,
  selectProductDetails,
} from "../../redux/product/selectors";
import {
  addProductFavorite,
  getFavoriteProducts,
  getProductById,
  removeProductFavorite,
} from "../../redux/product/operations";
import { addProduct } from "../../redux/basket/operations";
import { getBrands, getCategories } from "../../services/productApi";
import { IoChevronForward, IoCloseSharp } from "react-icons/io5";
import { BsHeart } from "react-icons/bs";
import novaPoshta from "../../assets/img/novaPoshta.png";
import { FaChevronRight } from "react-icons/fa";

const ProductInfo = () => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [descriptionTab, setDescriptionTab] = useState("Опис");
  const [descriptionInfoTab, setDescriptionInfoTab] = useState("Доставка");
  const tabsInfo = [
    "Доставка",
    "Оплата",
    "Гарантія",
    "Повернення",
    "Консультація",
  ];
  const { slug } = useParams();
  const productDetails = useSelector(selectProductDetails);
  // console.log("productDetails: ", productDetails?.product);
  const [brand, setBrand] = useState();
  const [localFavorites, setLocalFavorites] = useState([]);
  const favorites = useSelector(selectFavoritesProducts);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [categories, setCategories] = useState();
  // console.log("categories: ", categories);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleDescription = () => {
    if (isExpanded) {
      // Почати процес закриття
      setIsClosing(true);
      setTimeout(() => {
        setIsExpanded(false); // Прибрати видимість
        setIsClosing(false); // Скинути стан закриття
      }, 300); // Відповідає тривалості transition для висоти
    } else {
      setIsExpanded(true);
    }
  };
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
    const fetchFavorites = async () => {
      try {
        const data = await dispatch(getFavoriteProducts()).unwrap();
        setLocalFavorites(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavorites();
  }, [dispatch]);

  useEffect(() => {
    setLocalFavorites(favorites);
  }, [favorites]);

  const handleToggleFavorite = async (product) => {
    if (!product || !product._id) {
      console.warn("Product is invalid.");
      return;
    }

    const isFavorite = localFavorites.some((item) => item._id === product._id);

    if (isFavorite) {
      dispatch(removeProductFavorite(product._id));
    } else {
      dispatch(addProductFavorite(product._id));
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const brands = await getBrands();

        // Ensure both strings are trimmed and compared in a case-insensitive way
        const selectBrand = brands.filter(
          (brand) =>
            brand.name.trim().toLowerCase() ===
            productDetails?.product.brand.trim().toLowerCase()
        );

        setBrand(selectBrand);
      } catch (error) {
        console.log("Error fetching brands:", error);
      }
    };
    fetchProducts();
  }, [productDetails]);

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

  const inStock =
    selectedVolume &&
    productDetails?.product?.volumes.some(
      (item) => item._id === selectedVolume._id && item.quantity > 0
    );

  const isFavorite = localFavorites.some(
    (item) => productDetails && item._id === productDetails.product._id
  );
  const handleBrandClick = (brandId) => {
    navigate(`/brand/${brandId}`);
  };

  //  breadcrumb

  const getCategoryName = () => {
    const category = categories?.find(
      (cat) => cat.name === productDetails?.product.category
    );
    return category ? category.name : "";
  };

  const getSubCategoryName = () => {
    const category = categories?.find(
      (cat) => cat.name === productDetails?.product.category
    );

    const subCategory = category.items.find(
      (item) => item.name === productDetails?.product.subcategory
    );
    // console.log("subCategory", subCategory);
    // console.log("subCategory", subCategory);
    return subCategory ? subCategory.name : "";
  };
  // console.log("categories", categories);
  const currentCategory = categories?.find(
    (cat) => cat.name === productDetails?.product.category
  );

  const currentSubCategory = currentCategory
    ? currentCategory.items.find(
        (item) => item.name === productDetails?.product.subcategory
      )
    : null;
  // console.log("currentSubCategory", currentSubCategory);
  // console.log("getSubCategoryName", getSubCategoryName());
  return (
    <>
      <div className={css.desctop}>
        {/* Desctop */}
        {productDetails?.product && (
          <div className={css.productContent}>
            <div className={css.productLeft}>
              <div className={css.productColumnContainer}>
                <div className={css.productGallery}>
                  <div className={css.galerry}>
                    <div className={css.titlePhoto}>
                      <div className={css.titlePhotoContainer}>
                        <ul className={css.galerryList}>
                          <li className={css.galerryListItem}>
                            <img
                              className={css.galerryProductImg}
                              src={productDetails.product.image}
                              alt={productDetails.product.name}
                            />
                          </li>
                        </ul>
                      </div>
                      {brand && brand.length > 0 && (
                        <span
                          className={css.logoBrand}
                          onClick={() => {
                            handleBrandClick(brand[0].name);
                          }}
                        >
                          <img
                            className={css.imageBrand}
                            src={brand[0].image}
                            alt={brand[0].name}
                            width={60}
                            height={60}
                          />
                        </span>
                      )}
                    </div>
                    <div className={css.photoCarusel}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.productRight}>
              <div>
                <div className={css.productColumnItem}>
                  <div className={css.productGroup}>
                    <div className={css.productGroupItem}>
                      <div className={css.productGroupItemHeader}>
                        {/* ТУТ НАДА ЗРОБИТЬ НАВІГАЦІЮ ПО МЕНЮ */}
                        <nav className={css.productGroupMenu}>
                          <div className={css.productGroupMenuItem}>
                            <Link to="/">Головна</Link>
                            <IoChevronForward
                              className={`${css.icon} ${css.iconChevron}`}
                            />
                          </div>
                          <div className={css.productGroupMenuItem}>
                            <Link to="/catalog">Каталог</Link>
                          </div>

                          {currentCategory && (
                            <div className={css.productGroupMenuItem}>
                              <IoChevronForward
                                className={`${css.icon} ${css.iconChevron}`}
                              />
                              <Link
                                className={css.navItem}
                                to={`/catalog/${currentCategory.slug}`}
                              >
                                {getCategoryName(currentCategory.slug)}
                              </Link>
                            </div>
                          )}
                          {currentSubCategory && (
                            <div className={css.productGroupMenuItem}>
                              <IoChevronForward
                                className={`${css.icon} ${css.iconChevron}`}
                              />
                              <Link
                                className={css.navItem}
                                to={`/catalog/${currentCategory.slug}/${currentSubCategory.slug}`}
                              >
                                {getSubCategoryName()}
                              </Link>
                            </div>
                          )}
                          {currentSubCategory && (
                            <div className={css.productGroupMenuItem}>
                              <IoChevronForward
                                className={`${css.icon} ${css.iconChevron}`}
                              />
                              <p className={css.navItem}>
                                {productDetails.product.name},{" "}
                                {selectedVolume && selectedVolume.volume} мл
                              </p>
                            </div>
                          )}
                        </nav>
                        {/* ТУТ НАДА ЗРОБИТЬ НАВІГАЦІЮ ПО МЕНЮ */}
                        <div className={css.productHeader}>
                          <div className={css.productHeaderTitle}>
                            <div className={css.productHeaderTitleBlock}>
                              <h1 className={css.productTitle}>
                                {productDetails.product.name}
                              </h1>
                            </div>
                          </div>
                          <div className={css.productHeaderInfo}>
                            <div
                              className={`${css.productHeaderAvailability} ${
                                inStock
                                  ? css.productInStock
                                  : css.productNotStock
                              }`}
                            >
                              {inStock ? "В наявності" : "Немає в наявності"}
                            </div>

                            <div className={css.productHeaderArticle}>
                              Артикул: {productDetails.product.article}
                            </div>
                            <div className={css.productHeaderRaiting}>
                              Написати відгук. Треба зробить🙌!
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={css.productGroupItem}>
                      <div className={css.productPriceContainer}>
                        <div className={css.productPriceWrapper}>
                          <div className={css.productPrice}>
                            <div className={css.price}>
                              <div
                                className={
                                  selectedVolume && selectedVolume.discount > 0
                                    ? css.priceItemNew
                                    : css.priceItem
                                }
                              >
                                {Math.ceil(getPriceDetails())} ₴
                              </div>
                              {selectedVolume && selectedVolume.discount ? (
                                <div className={css.productOldPrice}>
                                  {selectedVolume.price} ₴
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className={css.productLikeBox}>
                            <div className={css.productLikeItem}>
                              <button
                                className={css.favoriteBtn}
                                onClick={() =>
                                  handleToggleFavorite(productDetails.product)
                                }
                              >
                                <span className={css.favoriteIconBox}>
                                  <BsHeart
                                    className={`${css.icon} ${
                                      css.iconFavorite
                                    } ${isFavorite ? css.isFavorite : ""}`}
                                  />
                                </span>
                                <div className={css.favoriteText}>
                                  {isFavorite ? "В бажаннях" : "В бажання"}
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={css.productGroupItem}>
                      <div className={css.productVolumesContainer}>
                        <div className={css.productVolumes}>
                          <div className={css.volumesTop}>
                            <p className={css.volumesTitle}>Об&apos;єм</p>
                          </div>
                          <div className={css.volumesBottom}>
                            <div className={css.volumesList}>
                              {productDetails.product.volumes &&
                                productDetails.product.volumes.map((item) => (
                                  <button
                                    key={item._id}
                                    className={`${css.volumeButton} ${
                                      selectedVolume &&
                                      selectedVolume._id === item._id
                                        ? css.selected
                                        : css.default
                                    }`}
                                    onClick={() => handleVolumeChange(item)}
                                  >
                                    {item.volume} мл
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={css.productGroupItem}>
                      <div className={css.productSectionBuy}>
                        <div className={css.productOrder}>
                          <button
                            className={css.productBuyBtn}
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
                  </div>
                </div>
                <div className={css.productColumnItem}>
                  <div className={css.productGroup}>
                    <div className={css.productGroupItem}>
                      <div className={css.productCharacteristics}>
                        <p className={css.productCharacteristicsTitle}>
                          Характеристики
                        </p>
                      </div>
                      {productDetails && (
                        <div className={css.productCharacteristicsBox}>
                          <table className={css.productCharacteristicsTable}>
                            <tbody>
                              {productDetails.product.characteristics &&
                                productDetails.product.characteristics.map(
                                  (item, index) => {
                                    const {
                                      skinType,
                                      age,
                                      appointment,
                                      country,
                                      productClass,
                                      productType,
                                      series,
                                    } = item;
                                    return (
                                      <React.Fragment key={index}>
                                        <tr key={1}>
                                          <th
                                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                          >
                                            Тип шкіри
                                          </th>
                                          <td>{skinType}</td>
                                        </tr>
                                        <tr key={2}>
                                          <th
                                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                          >
                                            Призначення
                                          </th>
                                          <td>{appointment}</td>
                                        </tr>
                                        <tr key={3}>
                                          <th
                                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                          >
                                            Вік
                                          </th>
                                          <td>{age}</td>
                                        </tr>
                                        <tr key={4}>
                                          <th
                                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                          >
                                            Вид товару
                                          </th>
                                          <td>{productType}</td>
                                        </tr>
                                        <tr key={5}>
                                          <th
                                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                          >
                                            Клас товару
                                          </th>
                                          <td>{productClass}</td>
                                        </tr>
                                        <tr key={6}>
                                          <th
                                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                          >
                                            Серія
                                          </th>
                                          <td>{series}</td>
                                        </tr>
                                        <tr key={7}>
                                          <th
                                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                          >
                                            Країна виробник
                                          </th>
                                          <td>{country}</td>
                                        </tr>
                                      </React.Fragment>
                                    );
                                  }
                                )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={css.productColumnItem}>
                  <div className={css.productGroup}>
                    <div className={css.productDescriptionHeader}>
                      <nav className={css.productDescriptionNav}>
                        <p
                          className={`${css.descriptionNavTab} ${
                            descriptionTab === "Опис" ? css.tabActive : ""
                          }`}
                          onClick={() => setDescriptionTab("Опис")}
                        >
                          Опис
                        </p>
                        <p
                          className={`${css.descriptionNavTab}  ${
                            descriptionTab === "Новий відгук"
                              ? css.tabActive
                              : ""
                          }`}
                          onClick={() => setDescriptionTab("Новий відгук")}
                        >
                          Новий відгук
                        </p>
                      </nav>
                    </div>
                    {descriptionTab === "Опис" && (
                      <div className={css.productDescriptionBox}>
                        <div
                          className={css.text}
                          dangerouslySetInnerHTML={{
                            __html: productDetails.product.description,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className={css.productColumnItem}>
                  <div className={css.productGroup}>
                    <div className={css.headerInfoTabs}>
                      <nav className={css.headerInfoNav}>
                        {tabsInfo.map((tab) => (
                          <p
                            key={tab}
                            className={`${css.descriptionNavTab} ${
                              descriptionInfoTab === tab ? css.tabActive : ""
                            }`}
                            onClick={() => setDescriptionInfoTab(tab)}
                          >
                            {tab}
                          </p>
                        ))}
                      </nav>
                    </div>
                    {descriptionInfoTab === "Доставка" && (
                      <div className={css.deliveryContainer}>
                        <div className={css.text}>
                          <p>
                            <a href="https://novaposhta.ua/" target="blank">
                              <img
                                className={css.imgNP}
                                src={novaPoshta}
                                alt="Нова Пошта"
                                height={50}
                                width={126}
                              />
                            </a>
                          </p>
                          <p>
                            &nbsp;Відправка замовлень здійснюється в день
                            замовлення (якщо замовлення оформлене до 17:00,
                            після 17:00 - на наступний день). Відправки робимо
                            кожного дня, без вихідних.
                          </p>
                          <p>
                            <strong>&nbsp;Безкоштовна доставка</strong> на
                            замовлення від 1200 грн. (при повній оплаті
                            замовлення)
                          </p>
                        </div>
                      </div>
                    )}
                    {descriptionInfoTab === "Оплата" && (
                      <div className={css.deliveryContainer}>
                        <div className={css.text}>Оплата</div>
                      </div>
                    )}
                    {descriptionInfoTab === "Гарантія" && (
                      <div className={css.deliveryContainer}>
                        <div className={css.text}>Гарантія</div>
                      </div>
                    )}
                    {descriptionInfoTab === "Повернення" && (
                      <div className={css.deliveryContainer}>
                        <div className={css.text}>Повернення</div>
                      </div>
                    )}
                    {descriptionInfoTab === "Консультація" && (
                      <div className={css.deliveryContainer}>
                        <div className={css.text}>Консультація</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={css.productDetailsBottom}></div>
        {/* Desctop */}
      </div>
      {/* Mobile */}
      <div className={css.mobile}>
        <div className={css.wrapper}>
          {productDetails?.product && (
            <>
              <div className={css.productTop}>
                <div className={css.productHeaderBlock}>
                  <div className={css.productHeaderMob}>
                    <nav className={css.productGroupMenuMob}>
                      <div className={css.productGroupMenuWrapper}>
                        <div className={css.productGroupMenuList}>
                          <div className={css.productGroupMenuItem}>
                            <Link to="/">Головна</Link>
                          </div>

                          {currentCategory && (
                            <div className={css.productGroupMenuItem}>
                              <IoChevronForward
                                className={`${css.icon} ${css.iconChevron}`}
                              />
                              <Link
                                className={css.navItem}
                                to={`/catalog/${currentCategory.slug}`}
                              >
                                {getCategoryName(currentCategory.slug)}
                              </Link>
                            </div>
                          )}
                          {currentSubCategory && (
                            <div className={css.productGroupMenuItem}>
                              <IoChevronForward
                                className={`${css.icon} ${css.iconChevron}`}
                              />
                              <Link
                                className={css.navItem}
                                to={`/catalog/${currentCategory.slug}/${currentSubCategory.slug}`}
                              >
                                {getSubCategoryName()}
                              </Link>
                            </div>
                          )}
                          {currentSubCategory && (
                            <div className={css.productGroupMenuItem}>
                              <IoChevronForward
                                className={`${css.icon} ${css.iconChevron}`}
                              />
                              <p className={css.navItem}>
                                {productDetails.product.name},{" "}
                                {selectedVolume && selectedVolume.volume} мл
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </nav>
                    {/* ТУТ НАДА ЗРОБИТЬ НАВІГАЦІЮ ПО МЕНЮ */}
                    <h1 className={css.titleProduct}>
                      {productDetails.product.name}
                    </h1>
                    <div className={css.productDetailes}>
                      <div className={css.productDetailesItem}>
                        <span className={css.productArticleName}>
                          Артикул:{" "}
                        </span>
                        {productDetails.product.article}
                      </div>
                      <div>відгуки</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={css.productMain}>
                <div className={css.productLeftMob}>
                  <div className={css.galerryMob}>
                    <div className={css.galerryContainer}>
                      <div className={css.galerryCarusel}>
                        <div className={css.galerryWrapper}>
                          <div className={css.galerryItem}>
                            <img
                              className={css.galerryImg}
                              src={productDetails.product.image}
                              alt={productDetails.product.name}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        {brand && brand.length > 0 && (
                          <span
                            className={css.logoBrandMob}
                            onClick={() => {
                              handleBrandClick(brand[0].name);
                            }}
                          >
                            <img
                              className={css.imageBrandMob}
                              src={brand[0].image}
                              alt={brand[0].name}
                              width={60}
                              height={60}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={css.productRightMob}>
                  <div className={css.volumeBox}>
                    <div className={css.volumesHeader}>
                      <p className={css.volumesTitleMob}>Об&apos;єм</p>
                    </div>
                    <div className={css.volumesBottomMob}>
                      <div className={css.volumesListMob}>
                        {productDetails.product.volumes &&
                          productDetails.product.volumes.map((item) => (
                            <button
                              key={item._id}
                              className={`${css.volumeButton} ${
                                selectedVolume &&
                                selectedVolume._id === item._id
                                  ? css.selected
                                  : css.default
                              }`}
                              onClick={() => handleVolumeChange(item)}
                            >
                              {item.volume} мл
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className={css.priceBox}>
                    <div className={css.priceWrapper}>
                      <div className={css.priceWrapperTop}>
                        <div
                          className={`${css.productStatus} ${
                            inStock ? css.productInStock : css.productNotStock
                          }`}
                        >
                          {inStock ? "В наявності" : "Немає в наявності"}
                        </div>
                      </div>
                      <div className={css.priceWrapperMain}>
                        <div className={css.productPriceItem}>
                          <div
                            className={
                              selectedVolume && selectedVolume.discount > 0
                                ? css.priceItemNew
                                : css.priceItem
                            }
                          >
                            {Math.ceil(getPriceDetails())} ₴
                          </div>
                          {selectedVolume && selectedVolume.discount ? (
                            <div className={css.productOldPrice}>
                              {selectedVolume.price} ₴
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className={css.priceWrapperBottom}>
                        <div className={css.priceBtnList}>
                          <div className={css.btnItemBuy}>
                            <div className={css.btnBuyMob}>
                              <button
                                className={css.btnMob}
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
                              <button
                                className={css.btnMobLike}
                                onClick={() =>
                                  handleToggleFavorite(productDetails.product)
                                }
                              >
                                {isFavorite ? "До обраного" : "В обраних"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={css.productBottom}>
                <div
                  className={`${css.productBlock} ${css.productBlockDescription}`}
                >
                  <h3 className={css.descriptionTitle}>Опис</h3>
                  <div>
                    <div className={css.descriptionProductBlock}>
                      <div className={`${css.descriptionProduct}`}>
                        <div
                          className={css.textProductDescription}
                          dangerouslySetInnerHTML={{
                            __html: productDetails.product.description,
                          }}
                        />
                      </div>
                      <button
                        className={css.btnFullRead}
                        onClick={toggleDescription}
                      >
                        Читати повністю
                        <FaChevronRight />
                      </button>
                      <div
                        className={`${css.fullDescriptionBlock} ${
                          isExpanded ? css.open : ""
                        }`}
                      >
                        <div
                          className={`${css.fullDescriptionWrapper} ${
                            isExpanded && !isClosing
                              ? css.fullDescriptionWrapperShow
                              : ""
                          } ${isClosing ? css.fullDescriptionWrapperHide : ""}`}
                        >
                          <div className={`${css.fullDescription} `}>
                            <div className={css.fullDescriptionHeader}>
                              <p className={css.titleDescription}>Опис</p>
                              <button
                                className={css.btnClose}
                                onClick={toggleDescription}
                              >
                                <IoCloseSharp className={css.iconClose} />
                              </button>
                            </div>
                            <div className={css.textProductDescriptionWrapper}>
                              <div
                                className={css.textProductDescription}
                                dangerouslySetInnerHTML={{
                                  __html: productDetails.product.description,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${css.productBlock} ${css.productBlockCharacteristics}`}
                >
                  <h3 className={css.characteristicsTitle}>Характеристики</h3>

                  {productDetails && (
                    <div className={css.characteristicsProductBlock}>
                      <table className={css.productCharacteristicsTable}>
                        <tbody>
                          {productDetails.product.characteristics &&
                            productDetails.product.characteristics.map(
                              (item, i) => {
                                const {
                                  skinType,
                                  age,
                                  appointment,
                                  country,
                                  productClass,
                                  productType,
                                  series,
                                } = item;
                                return (
                                  <React.Fragment key={i}>
                                    <tr key={2}>
                                      <th
                                        className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                      >
                                        Тип шкіри
                                      </th>
                                      <td>{skinType}</td>
                                    </tr>
                                    <tr key={3}>
                                      <th
                                        className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                      >
                                        Призначення
                                      </th>
                                      <td>{appointment}</td>
                                    </tr>
                                    <tr key={4}>
                                      <th
                                        className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                      >
                                        Вік
                                      </th>
                                      <td>{age}</td>
                                    </tr>
                                    <tr key={5}>
                                      <th
                                        className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                      >
                                        Вид товару
                                      </th>
                                      <td>{productType}</td>
                                    </tr>
                                    <tr key={6}>
                                      <th
                                        className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                      >
                                        Клас товару
                                      </th>
                                      <td>{productClass}</td>
                                    </tr>
                                    <tr key={7}>
                                      <th
                                        className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                      >
                                        Серія
                                      </th>
                                      <td>{series}</td>
                                    </tr>
                                    <tr key={8}>
                                      <th
                                        className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                                      >
                                        Країна виробник
                                      </th>
                                      <td>{country}</td>
                                    </tr>
                                  </React.Fragment>
                                );
                              }
                            )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Mobile */}
    </>
  );
};

export default ProductInfo;
