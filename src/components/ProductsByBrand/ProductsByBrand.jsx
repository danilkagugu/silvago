import { useDispatch, useSelector } from "react-redux";
import {
  // selectProductDetails,
  selectProducts,
} from "../../redux/product/selectors";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../redux/product/operations";
import { getBrands } from "../../services/productApi";
import { useParams } from "react-router-dom";
import css from "./ProductsByBrand.module.css";
import {
  fetchFavoriteProducts,
  handleQuantityChange,
  handleQuantityInputChange,
  handleToggleFavorite,
} from "../../helpers/productActions";
import CatalogListItem from "../CatalogListItem/CatalogListItem";
// import { addProduct } from "../../redux/basket/operations";

const ProductsByBrand = () => {
  // const navigate = useNavigate();
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

  // const handleProductClick = (productId) => {
  //   navigate(`/product/${productId}`);
  // };

  const getDefaultVolume = (volumes) => {
    if (!volumes || volumes.length === 0) return 0;
    return volumes.reduce(
      (maxVol, vol) => (vol.volume > maxVol ? vol.volume : maxVol),
      0
    );
  };
  // const getDefaultPrice = (product) => {
  //   const defaultVolume = getDefaultVolume(product.volumes);
  //   const volumeObj = product.volumes.find(
  //     (vol) => vol.volume === defaultVolume
  //   );
  //   return volumeObj ? volumeObj.price : product.price;
  // };

  return (
    <div>
      <ul className={css.list}>
        {filteredProducts.map((product) => (
          <li key={product._id} className={css.listItem} id={product._id}>
            <CatalogListItem
              favoriteProducts={favoriteProducts}
              handleQuantityChange={handleQuantityChange}
              handleQuantityInputChange={handleQuantityInputChange}
              handleToggleFavorite={handleToggleFavorite}
              handleVolumeSelect={handleVolumeSelect}
              product={product}
              quantities={quantities}
              selectedVolume={selectedVolume}
              setFavoriteProducts={setFavoriteProducts}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductsByBrand;
