import css from "./Catalogy.module.css";
import { IoMdArrowDropright } from "react-icons/io";
// import catologyJson from "./NextCatalog.json";
import { Link, useNavigate } from "react-router-dom";
// import transliterate from "../../helpers/transliterate";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/productApi";

const Catalogy = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  // console.log("categories: ", categories);
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
  const handleCategoryClick = (slug) => {
    navigate(`/catalog/${slug}`);
  };
  return (
    <ul className={css.catalogyList}>
      {categories &&
        categories.map((category) => (
          <li className={css.catologyItem} key={category._id}>
            <div
              className={css.catologyBox}
              onClick={() => handleCategoryClick(category.slug)}
            >
              <p className={css.itemText}>{category.name}</p>
              {category.items.length > 0 && <IoMdArrowDropright />}
            </div>
            {category.items.length > 0 && (
              <ul className={css.dropDownMenu}>
                {category.items.map((item) => (
                  <li className={css.downMenuItem} key={item._id}>
                    <Link
                      to={`/catalog/${category.slug}/${item.slug}`}
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
