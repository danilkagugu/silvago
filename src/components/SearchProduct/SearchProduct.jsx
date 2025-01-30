import { useEffect } from "react";
import css from "./SearchProduct.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchResults } from "../../redux/filterProduct/selectors";
import { searchProducts } from "../../redux/filterProduct/operations";

const SearchProduct = ({ searchQuery }) => {
  const navigate = useNavigate();
  const filteredProducts = useSelector(selectSearchResults);
  // console.log("filteredProducts: ", filteredProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchProducts(searchQuery));
    } else {
      dispatch(searchProducts(""));
    }
  }, [searchQuery, dispatch]);

  const handleProductClick = (slug) => {
    console.log("slug: ", slug);
    navigate(`/product/${slug}`);
  };
  return (
    <ul className={css.searchResults}>
      {filteredProducts &&
        filteredProducts.map((item) =>
          item.volumes.map((it) => (
            <li
              className={css.searchResultsList}
              key={it._id}
              onClick={() => handleProductClick(it.slug)}
            >
              <div className={css.imgBox}>
                <img
                  className={css.imgBrand}
                  src={it.image}
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
          ))
        )}
    </ul>
  );
};

export default SearchProduct;
