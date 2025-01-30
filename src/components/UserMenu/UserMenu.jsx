import css from "./UserMenu.module.css";

import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <ul className={css.list}>
        <li
          className={`${css.listItem} ${css.textDesctop}`}
          onClick={() => {
            navigate("/user-cabinet/settings");
          }}
        >
          <div className={css.menuBox}>
            <p className={css.text}>Особисті дані</p>
          </div>
        </li>
        <li
          className={`${css.listItem} ${css.textMobile}`}
          onClick={() => {
            navigate("/user-cabinet/settings");
          }}
        >
          <div className={css.menuBox}>
            <p className={css.text}>Профіль</p>
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
