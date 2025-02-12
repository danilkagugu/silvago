import { IoSearch } from "react-icons/io5";
import css from "./HeaderSearch.module.css";
const HeaderSearch = () => {
  return (
    <div className={css.searchContainer}>
      <form action="">
        <button className={css.searchButton} type="submit">
          <IoSearch className={css.iconSeacrch} />
        </button>
        <input
          className={css.searchInput}
          type="text"
          placeholder="пошук товарів"
        />
      </form>
    </div>
  );
};

export default HeaderSearch;
