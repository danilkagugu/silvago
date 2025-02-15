import { IoSearch } from "react-icons/io5";
import css from "./HeaderSearch.module.css";
import { searchProducts } from "../../../redux/filterProduct/operations";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchLoading,
  selectSearchResults,
} from "../../../redux/filterProduct/selectors";
import { Link } from "react-router-dom";
import { clearSearchResults } from "../../../redux/filterProduct/slice";
import LoaderSearch from "./LoaderSearch";
const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const result = useSelector(selectSearchResults);
  const loadingSearch = useSelector(selectSearchLoading);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim().length > 1) {
        dispatch(searchProducts(query.trim()));
      } else {
        dispatch(clearSearchResults()); // Викликаємо очищення результатів, якщо поле порожнє
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query, dispatch]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() !== "") {
      dispatch(searchProducts(query));
    }
  };

  return (
    <div className={css.searchContainer}>
      <form onSubmit={handleSearch}>
        {!loadingSearch && (
          <button className={css.searchButton} type="submit">
            <IoSearch className={css.iconSeacrch} />
          </button>
        )}
        <input
          className={css.searchInput}
          type="text"
          value={query}
          placeholder="пошук товарів"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className={css.searchResults}
          style={{ display: result.length > 0 ? "block" : "none" }}
        >
          <ul>
            {result.length > 0 &&
              result
                .flatMap((product) => product.variations) // Збираємо всі варіації в один масив
                .slice(0, 5) // Обмежуємо до 5 елементів
                .map((variation) => (
                  <li
                    key={variation.idTorgsoft}
                    className={css.searchResultsItem}
                  >
                    <Link
                      className={css.searchResultsLink}
                      to={`/product/${variation.slug}`}
                    >
                      <div className={css.searchResultsImage}>
                        <img
                          src={variation.image}
                          alt={variation.fullName}
                          className={css.productImg}
                        />
                      </div>
                      <div className={css.searchResultsText}>
                        <div className={css.searchResultsTitle}>
                          {variation.fullName}
                        </div>
                        <div className={css.searchResultsPrice}>
                          {Number(variation.discount) > 0
                            ? variation.discountPrice
                            : variation.retailPrice}{" "}
                          грн
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            <li className={css.searchResultsItem}>
              <Link
                className={`${css.searchResultsLink} ${css.searchResultsLinkAll}`}
                to={`/catalog/search?query=${encodeURIComponent(query)}`}
              >
                Всі результати пошуку
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`${css.loaderSpinner}`}
          style={{ display: !loadingSearch && "none" }}
        >
          <LoaderSearch />
        </div>
      </form>
    </div>
  );
};

export default HeaderSearch;
