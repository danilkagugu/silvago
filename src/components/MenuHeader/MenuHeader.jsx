import { Link } from "react-router-dom";
import Catalogy from "../Catalogy/Catalogy";
import css from "./MenuHeader.module.css";
import { FaChevronDown } from "react-icons/fa6";

const MenuHeader = () => {
  return (
    <ul className={css.MenuHeader}>
      <li className={`${css.menuList} ${css.menuChevron}`}>
        Каталог <FaChevronDown />
        <div className={css.catalogyBox}>
          <Catalogy />
        </div>
      </li>
      <li className={css.menuList}>
        <Link className={css.link} to={"/brands"}>
          Бренди
        </Link>
      </li>
      <li className={css.menuList}>
        <Link className={css.link} to={"/delivery-and-payment"}>
          Доставка і оплата
        </Link>
      </li>
      <li className={css.menuList}>
        <Link className={css.link} to={"/about-us"}>
          Про нас
        </Link>
      </li>
    </ul>
  );
};

export default MenuHeader;
