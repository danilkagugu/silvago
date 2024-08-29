import { useEffect, useState } from "react";
import css from "./UserMenu.module.css";
// import { MdOutlineHistory } from "react-icons/md";
// import { CiHeart } from "react-icons/ci";
// import { CiSettings } from "react-icons/ci";
// import { LuUserX } from "react-icons/lu";
// import { useDispatch } from "react-redux";
// import { apiLogoutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { getFavoriteProduct } from "../../services/productApi";

const UserMenu = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  // console.log("favoriteProducts: ", favoriteProducts);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const data = getFavoriteProduct();
        setFavoriteProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavoriteProducts();
  }, []);
  return (
    <div className={css.container}>
      <ul className={css.list}>
        <li
          className={css.listItem}
          onClick={() => {
            navigate("/user-cabinet/settings");
          }}
        >
          <div className={css.menuBox}>
            <p className={css.text}>Особисті дані</p>
          </div>
        </li>
        <li
          className={css.listItem}
          onClick={() => {
            navigate("/user-cabinet/history");
          }}
        >
          <div className={css.menuBox}>
            <p className={css.text}>Замовлення</p>
          </div>
        </li>
        <li
          className={css.listItem}
          onClick={() => {
            navigate("/user-cabinet/favorite");
          }}
        >
          <div className={css.menuBox}>
            <p className={css.text}>Обране</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
