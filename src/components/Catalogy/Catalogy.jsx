import css from "./Catalogy.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import catologyJson from "./NextCatalog.json";

const Catalogy = () => {
  return (
    <ul className={css.catalogyList}>
      {catologyJson.map((category, index) => (
        <li className={css.catologyItem} key={index}>
          <div className={css.catologyBox}>
            <p className={css.itemText}>{category.name}</p>
            <IoMdArrowDropright />
          </div>
          {category.items && (
            <ul className={css.dropDownMenu}>
              {category.items.map((item, i) => (
                <li className={css.downMenuItem} key={i}>
                  <p className={css.downMenuText}>{item}</p>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Catalogy;
