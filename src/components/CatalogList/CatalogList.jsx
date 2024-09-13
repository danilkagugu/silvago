import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategories } from "../../services/productApi";
import css from "./CatalogList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/product/selectors";
import { getAllProduct } from "../../redux/product/operations";
import { fetchFavoriteProducts } from "../../helpers/productActions";
import CatalogListItem from "../CatalogListItem/CatalogListItem";

const CatalogList = () => {
  const dispatch = useDispatch();

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

  return (
    <div>
      <ul className={css.list}>
        {productsToDisplay.map((product) => (
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
