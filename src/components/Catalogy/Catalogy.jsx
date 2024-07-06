import css from "./Catalogy.module.css";
import { FaChevronDown } from "react-icons/fa6";

const Catalogy = () => {
  return (
    <nav>
      <ul className={css.catalogy}>
        <li className={`${css.catologyList} ${css.catologyChevron}`}>
          Каталог <FaChevronDown />
        </li>
        <li className={css.catologyList}>Бренди</li>
        <li className={css.catologyList}>Доставка і оплата</li>
        <li className={css.catologyList}>Про нас</li>
      </ul>
    </nav>
  );
};

export default Catalogy;
