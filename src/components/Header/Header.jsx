import css from "./Header.module.css";
import Catalogy from "../Catalogy/Catalogy";
import Logo from "../Logo/Logo";
import { IoSearch } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";

const Header = () => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.leftHeaderMenu}>
          <MdOutlineMenu className={`${css.iconMenu} ${css.icon}`} />
          <Logo />
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
