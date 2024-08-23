import { useEffect, useState } from "react";
import { searchProducts } from "../../services/productApi";
import css from "./SearchProduct.module.css";
import { useNavigate } from "react-router-dom";

const SearchProduct = ({ searchQuery }) => {
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log("filteredProducts: ", filteredProducts);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchQuery) {
          const result = await searchProducts(searchQuery);
          setFilteredProducts(result);
        } else {
          setFilteredProducts("");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <ul className={css.searchResults}>
      {filteredProducts &&
        filteredProducts.map((item) => (
          <li
            className={css.searchResultsList}
            key={item._id}
            onClick={() => handleProductClick(item._id)}
          >
            <div className={css.imgBox}>
              <img
                className={css.imgBrand}
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
              />
            </div>
            <div className={css.boxInfo}>
              <p className={css.brandInfo}>{item.name}</p>
              {/* {item.volumes.map((i) => (
                <p key={i._id} className={css.brandInfo}>
                  {i.price} грн
                </p>
              ))} */}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default SearchProduct;
