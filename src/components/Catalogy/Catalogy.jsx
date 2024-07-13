import css from "./Catalogy.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import catologyJson from "./NextCatalog.json";
import { Link } from "react-router-dom";

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
                  <Link
                    to={`/catalog/${encodeURIComponent(
                      category.name
                    )}/${encodeURIComponent(item)}`}
                    className={css.downMenuLink}
                  >
                    <p className={css.downMenuText}>{item}</p>
                  </Link>
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
