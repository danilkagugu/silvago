import css from "./HeaderMenu.module.css";

import { FaAngleDown } from "react-icons/fa6";

const HeaderMenu = () => {
  return (
    <>
      <li className={`${css.itemModalMenu} ${css.firstElListMenu}`}>
        Каталог товарів
      </li>
      <li className={css.itemModalMenu}>
        Бренди{" "}
        <span>
          <FaAngleDown />
        </span>
      </li>
      <li className={css.itemModalMenu}>
        Обличчя{" "}
        <span>
          <FaAngleDown />
        </span>
      </li>
      <li className={css.itemModalMenu}>
        Волосся{" "}
        <span>
          <FaAngleDown />
        </span>
      </li>
      <li className={css.itemModalMenu}>
        Тіло та ванна{" "}
        <span>
          <FaAngleDown />
        </span>
      </li>
    </>
  );
};

export default HeaderMenu;
