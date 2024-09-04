import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import { searchProducts } from "../../services/productApi";
import css from "./SearchProducts.module.css";
import CatalogListItem from "../../components/CatalogListItem/CatalogListItem";
import { fetchFavoriteProducts } from "../../helpers/productActions";

const SearchProducts = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState();
  const [selectedVolume, setSelectedVolume] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (query) {
          const result = await searchProducts(query);
          setFilteredProducts(result);
        } else {
          setFilteredProducts("");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
    fetchFavoriteProducts(setFavoriteProducts);
  }, [query]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
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

  return (
    <Layout>
      <ul className={css.list}>
        {filteredProducts.map((product) => (
          <li key={product._id} className={css.listItem} id={product._id}>
            <CatalogListItem
              favoriteProducts={favoriteProducts}
              handleVolumeSelect={handleVolumeSelect}
              product={product}
              quantities={quantities}
              selectedVolume={selectedVolume}
            />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default SearchProducts;
