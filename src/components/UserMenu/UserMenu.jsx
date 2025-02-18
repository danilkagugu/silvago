import css from "./UserMenu.module.css";

import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();

  return (
    <div className={css.layoutAsideI}>
      <nav className={css.sideMenu}>
        <ul className={css.sideMenuList}>
          <li
            className={`${css.sideMenuItem}`}
            onClick={() => {
              navigate("/user-cabinet/settings");
            }}
          >
            <div className={css.sideMenuItemBox}>
              <p className={css.text}>Особисті дані</p>
            </div>
          </li>

          <li
            className={css.sideMenuItem}
            onClick={() => {
              navigate("/user-cabinet/history");
            }}
          >
            <div className={css.sideMenuItemBox}>
              <p className={css.text}>Замовлення</p>
            </div>
          </li>
          <li
            className={css.sideMenuItem}
            onClick={() => {
              navigate("/user-cabinet/favorite");
            }}
          >
            <div className={css.sideMenuItemBox}>
              <p className={css.text}>Обране</p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
