import css from "./Header.module.css";
import Catalogy from "../MenuHeader/MenuHeader";
import Logo from "../Logo/Logo";
import { IoSearch } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";
import MobMenu from "../MobMenu/MobMenu";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [openMobMenu, setOpenMobMenu] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const login = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const regForm = () => {
    setOpenRegisterForm(true);
    setOpenLoginForm(false);
  };

  const loginForm = () => {
    setOpenRegisterForm(false);
    setOpenLoginForm(true);
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.leftHeaderMenu}>
          <MdOutlineMenu
            className={`${css.iconMenu} ${css.icon}`}
            onClick={() => {
              setOpenMobMenu(true);
            }}
          />
          <Logo />
          {openMobMenu && <MobMenu closeMenu={setOpenMobMenu} />}
        </div>
        <Catalogy />
        <div className={css.searchBox}>
          <IoSearch className={`${css.iconSearch} ${css.icon}`} />
          <input className={css.inputSearch} type="text" placeholder="Пошук" />
        </div>
        <div className={css.iconBox}>
          <IoSearch className={`${css.iconSearchMob} ${css.icon}`} />
          <SlBasket className={css.icon} />
          <CiHeart
            className={css.icon}
            onClick={() => {
              navigate("/user-cabinet/favorite");
            }}
          />
          <FaRegUserCircle
            className={css.icon}
            onClick={() => {
              !login
                ? setOpenLoginForm(true)
                : navigate("/user-cabinet/settings");
            }}
          />
        </div>
        {openLoginForm && (
          <LoginForm
            openLogin={openLoginForm}
            closeLogin={setOpenLoginForm}
            regFormOn={regForm}
          />
        )}
        {openRegisterForm && (
          <RegisterForm
            openLogin={openRegisterForm}
            closeLogin={setOpenRegisterForm}
            loginFormOn={loginForm}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
