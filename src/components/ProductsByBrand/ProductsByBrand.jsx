import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/product/selectors";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../redux/product/operations";
import { getBrands } from "../../services/productApi";
import { useNavigate, useParams } from "react-router-dom";
import css from "./ProductsByBrand.module.css";
import {
  fetchFavoriteProducts,
  handleAddToBasket,
  handleQuantityChange,
  handleQuantityInputChange,
  handleToggleFavorite,
} from "../../helpers/productActions";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const ProductsByBrand = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [brands, setBrands] = useState();
  const [quantities, setQuantities] = useState({});
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [selectedVolume, setSelectedVolume] = useState({});
  const { brandName } = useParams();

  const dataProducts = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
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

  // const handleAddToBasket = async (productId, quantity, volume) => {
  //   try {
  //     const data = await addProductToBasket(productId, quantity, volume);
  //     console.log("Product added to basket:", data);
  //   } catch (error) {
  //     console.log("Error adding product to basket:", error);
  //   }
  // };

  const handleVolumeSelect = (productId, volume) => {
    setSelectedVolume((prev) => ({
      ...prev,
      [productId]: volume,
    }));
  };

  const filteredProducts = dataProducts.filter((product) => {
    if (!brands) return false;

    const brand = brands.find((cat) => cat.name === brandName);
    if (!brand) return false;

    return product.brand === brand.name;
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getDefaultVolume = (volumes) => {
    if (!volumes || volumes.length === 0) return 0;
    return volumes.reduce(
      (maxVol, vol) => (vol.volume > maxVol ? vol.volume : maxVol),
      0
    );
  };
  const getDefaultPrice = (product) => {
    const defaultVolume = getDefaultVolume(product.volumes);
    const volumeObj = product.volumes.find(
      (vol) => vol.volume === defaultVolume
    );
    return volumeObj ? volumeObj.price : product.price;
  };

  return (
    <div>
      <ul className={css.list}>
        {filteredProducts.map((product) => (
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
                <div className={css.quantityContainer}>
                  <div className={css.quantityInputWrapper}>
                    <button
                      className={css.quantityButton}
                      onClick={() =>
                        handleQuantityChange(product._id, -1, setQuantities)
                      }
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className={css.quantityInput}
                      value={quantities[product._id] || 1}
                      onChange={(e) =>
                        handleQuantityInputChange(
                          product._id,
                          e.target.value,
                          setQuantities
                        )
                      }
                      min="1"
                    />
                    <button
                      className={css.quantityButton}
                      onClick={() =>
                        handleQuantityChange(product._id, 1, setQuantities)
                      }
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
    </div>
  );
};
export default ProductsByBrand;
