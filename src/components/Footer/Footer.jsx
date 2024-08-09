import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import css from "./Footer.module.css";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/productApi";
const Footer = () => {
  const navigate = useNavigate();
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

  const handleCategoryClick = (slug) => {
    navigate(`/catalog/${slug}`);
  };
  return (
    <div className={css.footer}>
      <div className={css.footerContainer}>
        <div className={css.footerList}>
          <ul className={css.footerMenu}>
            <li>
              <Logo />
            </li>
            <li>
              <h4>Каталог</h4>
              <ul className={css.catalogyList}>
                {categories &&
                  categories.map((category) => (
                    <li className={css.catologyItem} key={category._id}>
                      <div
                        className={css.catologyBox}
                        onClick={() => handleCategoryClick(category.slug)}
                      >
                        <p className={css.itemText}>{category.name}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </li>
            <li>
              <h4>Клієнтам</h4>
              <ul>
                <li>
                  <p className={css.itemText}>Оплата і доставка</p>
                </li>
                <li>
                  <p className={css.itemText}>Контакти</p>
                </li>
                <li>
                  <p className={css.itemText}>Обмін та повернення</p>
                </li>
                <li>
                  <p className={css.itemText}>Публічна оферта</p>
                </li>
              </ul>
            </li>
            <li>
              <h4>Контактна інформація</h4>
              <ul>
                <li>
                  <p className={css.itemText}>Мобільний номер</p>
                </li>
                <li>
                  <p className={css.itemText}>Мобільний номер</p>
                </li>
                <li>
                  <p className={css.itemText}>Мобільний номер</p>
                </li>
                <li>
                  <p className={css.itemText}>Почта</p>
                </li>
                <li>
                  <p className={css.itemText}>Соц мережі іконки</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
