import css from "./Catalogy.module.css";
import { IoMdArrowDropright } from "react-icons/io";
// import catologyJson from "./NextCatalog.json";
import { Link } from "react-router-dom";
// import transliterate from "../../helpers/transliterate";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/productApi";

const Catalogy = () => {
  // const { categorySlug, subCategorySlug } = useParams();

  const [categories, setCategories] = useState();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <ul className={css.catalogyList}>
      {categories &&
        categories.map((category) => (
          <li className={css.catologyItem} key={category._id}>
            <div className={css.catologyBox}>
              <p className={css.itemText}>{category.name}</p>
              <IoMdArrowDropright />
            </div>
            {category.items && (
              <ul className={css.dropDownMenu}>
                {category.items.map((item) => (
                  <li className={css.downMenuItem} key={item._id}>
                    <Link
                      to={`/catalog/${category.slug}/${item.slug}`} // Використання транслітерації
                      className={css.downMenuLink}
                    >
                      <p className={css.downMenuText}>{item.name}</p>
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
