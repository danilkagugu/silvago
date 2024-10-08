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
            <li className={css.footerMenuItem}>
              <Logo />
            </li>
            <li>
              <h4 className={css.footerTitles}>Каталог</h4>
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
              <h4 className={css.footerTitles}>Клієнтам</h4>
              <ul>
                <li className={css.catologyBox}>
                  <p className={css.itemText}>Оплата і доставка</p>
                </li>
                <li className={css.catologyBox}>
                  <p className={css.itemText}>Контакти</p>
                </li>
                <li className={css.catologyBox}>
                  <p className={css.itemText}>Обмін та повернення</p>
                </li>
                <li className={css.catologyBox}>
                  <p className={css.itemText}>Публічна оферта</p>
                </li>
              </ul>
            </li>
            <li>
              <h4 className={css.footerTitles}>Контактна інформація</h4>
              <ul>
                <li className={css.catologyBox}>
                  <p className={css.itemText}>Мобільний номер</p>
                </li>
                <li className={css.catologyBox}>
                  <p className={css.itemText}>Мобільний номер</p>
                </li>
                <li className={css.catologyBox}>
                  <p className={css.itemText}>Мобільний номер</p>
                </li>
                <li className={css.catologyBox}>
                  <p className={css.itemText}>Почта</p>
                </li>
                <li className={css.catologyBox}>
                  <p className={css.itemText}>Соц мережі іконки</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>{" "}
        <div className={css.mobFooterMenu}>
          <div className={css.phonesBlock}>
            <a className={css.telNumber} href="tel:+380682825562">
              +380682825562
            </a>
            <p className={css.contacts}>Контакти</p>
          </div>
          <div className={css.copyrightBlock}>
            <p className={css.copyrightText}>© 2017—2024</p>
            <p className={css.copyrightText}>
              Silvago - онлайн магазин професійної косметики
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
