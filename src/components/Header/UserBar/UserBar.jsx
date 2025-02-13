import { PiUserFill } from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";
import css from "./UserBar.module.css";
import { useState } from "react";
import LoginForm from "../../LoginForm/LoginForm";
import RegisterForm from "../../RegisterForm/RegisterForm";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LuHeart } from "react-icons/lu";
import { apiLogoutUser } from "../../../redux/auth/operations";

const UserBar = ({ user }) => {
  const dispatch = useDispatch();

  const [isLoginOpen, setIsLoginOpen] = useState(false); // Відкриття модалки входу
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // Відкриття реєстрації
  const [hoverUserBar, setHoverUserBar] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  //   const closeModals = () => {
  //     setIsLoginOpen(false);
  //     setIsRegisterOpen(false);
  //   };

  const onLogout = () => {
    dispatch(apiLogoutUser());
  };

  return (
    <div className={css.userBox}>
      <div
        className={css.userBar}
        onMouseEnter={() => setHoverUserBar(true)}
        onMouseLeave={() => setHoverUserBar(false)}
      >
        <button
          className={`${css.userBarButton} ${hoverUserBar ? css.hover : ""}`}
          onClick={openLogin}
        >
          <PiUserFill className={css.iconUser} />
          <span className={css.userBarButtonText}>
            {user ? user.firstName + " " + user.lastName : "Вхід"}
          </span>
          {user && <MdKeyboardArrowDown className={css.iconArrowDown} />}
        </button>
        {user && (
          <div
            className={`${css.userBarDropDown} ${
              hoverUserBar ? css.visible : ""
            }`}
          >
            <ul className={css.userBarMenu}>
              <li className={css.userBarMenuItem}>
                <Link
                  className={css.userBarMenuLink}
                  to={"/user-cabinet/settings"}
                >
                  Особисті дані
                </Link>
              </li>
              <li className={css.userBarMenuItem}>
                <Link
                  className={css.userBarMenuLink}
                  to={"/user-cabinet/history"}
                >
                  Замовлення
                </Link>
              </li>
              <li className={css.userBarMenuItem}>
                <Link
                  className={css.userBarMenuLink}
                  to={"user-cabinet/favorite"}
                >
                  Обране
                  <LuHeart className={css.iconHeart} />
                </Link>
              </li>
              <li
                className={`${css.userBarMenuItem} ${css.userBarMenuItemLogout}`}
              >
                <Link
                  className={css.userBarMenuLink}
                  onClick={onLogout}
                  to={"/"}
                >
                  Вийти
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {isLoginOpen && (
        <LoginForm
          openLogin={isLoginOpen}
          closeLogin={setIsLoginOpen}
          regFormOn={openRegister}
        />
      )}
      {isRegisterOpen && (
        <RegisterForm
          closeLogin={setIsRegisterOpen}
          loginFormOn={openLogin}
          openLogin={isLoginOpen}
        />
      )}
    </div>
  );
};

export default UserBar;
