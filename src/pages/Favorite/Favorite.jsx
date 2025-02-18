import { useDispatch, useSelector } from "react-redux";
import FavoriteList from "../../components/FavoriteList/FavoriteList";
import { selectFavoritesProducts } from "../../redux/product/selectors";
import { selectUserData } from "../../redux/auth/selectors";
import { getFavoriteProducts } from "../../redux/product/operations";
import { useEffect } from "react";

const Favorite = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavoritesProducts);
  const id = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getFavoriteProducts(id.id));
  }, [dispatch, id.id, favoriteProducts.length]);
  return (
    <>
      <FavoriteList favoriteProducts={favoriteProducts} id={id} />
    </>
  );
};

export default Favorite;
