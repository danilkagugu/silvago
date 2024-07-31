import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProductToBasket, getCategories } from "../../services/productApi";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import css from "./CatalogList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/product/selectors";
import { getAllProduct } from "../../redux/product/operations";
import {
  fetchFavoriteProducts,
  handleToggleFavorite,
} from "../../helpers/productActions";

const CatalogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState();

  const dataProducts = useSelector(selectProducts);

  const { categorySlug, subCategorySlug } = useParams();

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        const initialQuantities = {};
        dataProducts.forEach((p) => {
          initialQuantities[p._id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
    fetchFavoriteProducts(setFavoriteProducts);
  }, [dataProducts, favoriteProducts]);

  const handleQuantityChange = (productId, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
    }));
  };

  const handleAddToBasket = async (productId, quantity) => {
    try {
      const data = await addProductToBasket(productId, quantity);
      console.log("Product added to basket:", data);
    } catch (error) {
      console.log("Error adding product to basket:", error);
    }
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

  const filteredProducts = dataProducts.filter((product) => {
    if (!categories) return false;

    const category = categories.find((cat) => cat.slug === categorySlug);
    if (!category) return false;

    const subCategory = category.items.find(
      (item) => item.slug === subCategorySlug
    );
    if (!subCategory) return false;

    return (
      product.category === category.name &&
      product.subcategory === subCategory.name
    );
  });

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
                  <p className={css.brandPrice}>{product.price} грн</p>
                </div>
              </div>
              <div className={css.priceBox}>
                <div className={css.quantityContainer}>
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
                    handleAddToBasket(product._id, quantities[product._id])
                  }
                >
                  Купити
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogList;
