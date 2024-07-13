import css from "./UserMenu.module.css";
import { MdOutlineHistory } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { LuUserX } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { apiLogoutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(apiLogoutUser());
    navigate("/");
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        <li
          className={css.listItem}
          onClick={() => {
            navigate("/user-cabinet/history");
          }}
        >
          <MdOutlineHistory className={css.icon} />
          <p className={css.text}>Історія замовлень</p>
        </li>
        <li
          className={css.listItem}
          onClick={() => {
            navigate("/user-cabinet/favorite");
          }}
        >
          <CiHeart className={css.icon} />
          <p className={css.text}>Обране</p>
        </li>
        <li
          className={css.listItem}
          onClick={() => {
            navigate("/user-cabinet/settings");
          }}
        >
          <CiSettings className={css.icon} />
          <p className={css.text}>Налаштування</p>
        </li>
        <li className={css.listItem} onClick={onLogout}>
          <div className={css.listItem}>
            <LuUserX className={css.icon} />
            <p className={css.text}>Вийти</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
