import css from "./UserMenu.module.css";
import { MdOutlineHistory } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { LuUserX } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { apiLogoutUser } from "../../redux/auth/operations";

const UserMenu = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(apiLogoutUser());
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        <li className={css.listItem}>
          <MdOutlineHistory className={css.icon} />
          <p className={css.text}>Історія замовлень</p>
        </li>
        <li className={css.listItem}>
          <CiHeart className={css.icon} />
          <p className={css.text}>Обране</p>
        </li>
        <li className={css.listItem}>
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
