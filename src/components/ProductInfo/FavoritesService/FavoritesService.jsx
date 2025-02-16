import { BsHeart } from "react-icons/bs";
import css from "./FavoritesService.module.css";

const FavoritesService = ({
  product,
  volume,
  handleToggleFavorite,
  isFavorite,
  loading,
}) => {
  return (
    <div className={css.productActionBox}>
      <div className={css.productActionItem}>
        <button
          className={css.favoriteBtn}
          onClick={() => handleToggleFavorite(product, volume.idTorgsoft)}
          disabled={loading}
        >
          <span className={css.favoriteIconBox}>
            <BsHeart
              className={`${css.icon} ${css.iconFavorite} ${
                isFavorite ? css.isFavorite : ""
              }`}
            />
          </span>
          <div className={css.favoriteText}>
            {isFavorite ? "В бажаннях" : "В бажання"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default FavoritesService;

/*
<ProductPrice
                          handleToggleFavoritee={handleToggleFavoritee}
                          isFavorite={isFavorite}
                          product={product}
                          volume={volume}
                        />
                         */
