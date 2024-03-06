import css from "./HeaderMenu.module.css";

import { FaAngleDown } from "react-icons/fa6";

const HeaderMenu = () => {
  // const [dropDownList, setDropDownList] = useState(false);
  // const handleHover = (e) => {
  //   console.log(e.target.value);
  //   setDropDownList(!dropDownList);
  // };
  return (
    <>
      <li className={`${css.itemModalMenu} ${css.firstElListMenu}`}>
        Каталог товарів
      </li>
      <li className={css.itemModalMenu}>
        Бренди
        <button
          className={css.dropdownBtn}
          // onMouseEnter={handleHover}
          // onMouseLeave={handleHover}
        >
          <span>
            <FaAngleDown />
          </span>
          <nav className={css.dropDownMenu}>
            <ul className={css.secondListMenu}>
              <li>Top Beayty</li>
              <li>Masil</li>
              <li>Dr.Ceuracle</li>
              <li>Benton</li>
            </ul>
          </nav>
        </button>
      </li>
      <li className={css.itemModalMenu}>
        Обличчя
        <button
          className={css.dropdownBtn}
          // onMouseEnter={handleHover}
          // onMouseLeave={handleHover}
        >
          <span>
            <FaAngleDown />
          </span>
          <nav className={css.dropDownMenu}>
            <ul className={css.secondListMenu}>
              <li>Крем</li>
              <li>Сировотка</li>
              <li>Пінка</li>
              <li>Тонер</li>
            </ul>
          </nav>
        </button>
      </li>
      <li className={css.itemModalMenu}>
        Волосся
        <button
          className={css.dropdownBtn}
          // onMouseEnter={handleHover}
          // onMouseLeave={handleHover}
        >
          <span>
            <FaAngleDown />
          </span>
          <nav className={css.dropDownMenu}>
            <ul className={css.secondListMenu}>
              <li>Шампунь</li>
              <li>Маска</li>
              <li>Кондиціонер</li>
              <li>Олійка</li>
            </ul>
          </nav>
        </button>
      </li>
      <li className={css.itemModalMenu}>
        Тіло та ванна
        <button
          className={css.dropdownBtn}
          // onMouseEnter={handleHover}
          // onMouseLeave={handleHover}
        >
          <span>
            <FaAngleDown />
          </span>
          <nav className={css.dropDownMenu}>
            <ul className={css.secondListMenu}>
              <li>Гель</li>
              <li>Пінка</li>
              <li>Бомбочка</li>
              <li>Сіль</li>
            </ul>
          </nav>
        </button>
      </li>
    </>
  );
};

export default HeaderMenu;
