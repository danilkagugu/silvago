import { BsHeart } from "react-icons/bs";
import css from "./FavoritesService.module.css";

const FavoritesService = ({
  product,
  volume,
  handleToggleFavorite,
  isFavorite,
  loading,
}) => {
  // console.log("volume", volume);
  return (
    <div className={css.productLikeBox}>
      <div className={css.productLikeItem}>
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
