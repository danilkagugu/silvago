import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../services/productApi";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import css from "./CatalogList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/product/selectors";
import { getAllProduct } from "../../redux/product/operations";
import {
  fetchFavoriteProducts,
  handleAddToBasket,
  handleToggleFavorite,
} from "../../helpers/productActions";

const CatalogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState();
  const [selectedVolume, setSelectedVolume] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const dataProducts = useSelector(selectProducts);

  const { categorySlug, subCategorySlug } = useParams();

  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug, subCategorySlug]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        const initialQuantities = {};
        const initialVolume = {};
        dataProducts.forEach((p) => {
          initialQuantities[p._id] = 1;
          const defaultVolume = getDefaultVolume(p.volumes);
          if (defaultVolume) {
            initialVolume[p._id] = defaultVolume;
          }
        });
        setQuantities(initialQuantities);
        setSelectedVolume(initialVolume);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
    fetchFavoriteProducts(setFavoriteProducts);
  }, [dataProducts]);

  const handleQuantityChange = (productId, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
    }));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleQuantityInputChange = (productId, value) => {
    const newValue = Math.max(1, parseInt(value, 10) || 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newValue,
    }));
  };

  const handleVolumeSelect = (productId, volume) => {
    setSelectedVolume((prev) => ({
      ...prev,
      [productId]: volume,
    }));
  };

  const getDefaultVolume = (volumes) => {
    if (!volumes || volumes.length === 0) return 0;
    return volumes.reduce(
      (maxVol, vol) => (vol.volume > maxVol ? vol.volume : maxVol),
      0
    );
  };

  const filteredProducts = dataProducts.filter((product) => {
    if (!categories) return false;

    const category = categories.find((cat) => cat.slug === categorySlug);
    if (!category) return false;

    if (subCategorySlug) {
      const subCategory = category.items.find(
        (item) => item.slug === subCategorySlug
      );
      if (!subCategory) return false;

      return (
        product.category === category.name &&
        product.subcategory === subCategory.name
      );
    } else {
      return product.category === category.name;
    }
  });

  const getDefaultPrice = (product) => {
    const defaultVolume = getDefaultVolume(product.volumes);
    const volumeObj = product.volumes.find(
      (vol) => vol.volume === defaultVolume
    );
    return volumeObj ? volumeObj.price : product.price;
  };

  // Пагінація
  const ITEMS_PER_PAGE = 15;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  // console.log("filteredProducts", filteredProducts);
  return (
    <div>
      <ul className={css.list}>
        {productsToDisplay.map((product) => (
          <li key={product._id} className={css.listItem} id={product._id}>
            <div className={css.cardContainer}>
              {favoriteProducts.has(product._id) ? (
                <FaHeart
                  className={css.iconFavorite}
                  onClick={() =>
                    handleToggleFavorite(
                      product._id,
                      favoriteProducts,
                      setFavoriteProducts
                    )
                  }
                />
              ) : (
                <CiHeart
                  className={css.iconFavorite}
                  onClick={() =>
                    handleToggleFavorite(
                      product._id,

                      favoriteProducts,
                      setFavoriteProducts
                    )
                  }
                />
              )}

              <div
                className={css.cardBox}
                onClick={() => handleProductClick(product._id)}
              >
                <div className={css.imgBox}>
                  <img
                    className={css.imgBrand}
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className={css.boxInfo}>
                  <p className={css.brandTitle}>{product.name}</p>
                  <p className={css.brandPrice}>
                    {selectedVolume[product._id]
                      ? product.volumes.find(
                          (vol) => vol.volume === selectedVolume[product._id]
                        )?.price
                      : getDefaultPrice(product)}
                    грн
                  </p>
                </div>
              </div>
              <div className={css.priceBox}>
                <div className={css.quantityBox}>
                  <div className={css.quantityInputWrapper}>
                    <button
                      className={css.quantityButton}
                      onClick={() => handleQuantityChange(product._id, -1)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className={css.quantityInput}
                      value={quantities[product._id] || 1}
                      onChange={(e) =>
                        handleQuantityInputChange(product._id, e.target.value)
                      }
                      min="1"
                    />
                    <button
                      className={css.quantityButton}
                      onClick={() => handleQuantityChange(product._id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={css.buyButton}
                  onClick={() =>
                    handleAddToBasket(
                      product._id,
                      quantities[product._id],
                      selectedVolume[product._id]
                    )
                  }
                >
                  Купити
                </button>
              </div>
              <div className={css.volumeOptions}>
                {product.volumes.map((vol) => (
                  <button
                    key={vol._id}
                    className={`${css.volumeOption} ${
                      selectedVolume[product._id] === vol.volume
                        ? css.selected
                        : ""
                    }`}
                    onClick={() => handleVolumeSelect(product._id, vol.volume)}
                  >
                    {vol.volume} мл
                  </button>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className={css.pagination}>
          <button
            className={css.pageButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Назад
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`${css.pageButton} ${
                currentPage === index + 1 ? css.activePage : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={css.pageButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogList;
