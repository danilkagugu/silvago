import { Link } from "react-router-dom";
import css from "./Heart.module.css";
import { LuHeart } from "react-icons/lu";

import { useState } from "react";

const Heart = ({ login, favoriteProductsLength }) => {
  const [openCategory, setOpenCategory] = useState(false);
  return (
    <div className={css.favoritesView}>
      <Link
        className={`${css.favoritesViewButton} ${!login ? css.disablad : ""}`}
        onMouseEnter={() => setOpenCategory(true)}
        onMouseLeave={() => setOpenCategory(false)}
        to={login ? "/user-cabinet/favorite" : "#"}
      >
        <div className={css.favoritesViewIcon}>
          <LuHeart className={css.iconHeart} />
          <span className={css.favoritesViewCount}>
            {favoriteProductsLength}
          </span>
        </div>
      </Link>
      {!login && (
        <div className={`${css.heartTooltip} ${openCategory ? css.open : ""}`}>
          Додайте товари до списку бажань
        </div>
      )}
    </div>
  );
};

export default Heart;
