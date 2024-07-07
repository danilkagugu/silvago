import css from "./Header.module.css";
import Catalogy from "../MenuHeader/MenuHeader";
import Logo from "../Logo/Logo";
import { IoSearch } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import MobMenu from "../MobMenu/MobMenu";

const Header = () => {
  const [openMobMenu, setOpenMobMenu] = useState(false);
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
          <FaRegUserCircle className={css.icon} />
        </div>
      </div>
    </div>
  );
};

export default Header;
