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
      <li className={css.menuList}>Бренди</li>
      <li className={css.menuList}>Доставка і оплата</li>
      <li className={css.menuList}>Про нас</li>
    </ul>
  );
};

export default MenuHeader;
