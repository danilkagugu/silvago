import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoSilvago from "../../assets/img/logoSilvago.png";
import { IoLogoInstagram } from "react-icons/io5";
import { FaPhone, FaTelegram, FaTiktok } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

import css from "./Footer.module.css";

import { selectAllCategories } from "../../redux/inventoryStore/selectors";

const Footer = () => {
  const categories = useSelector(selectAllCategories);

  const menuItems = [
    { name: "Про нас", path: "/about-us" },
    { name: "FAQ", path: "/faq" },
    { name: "Доставка і оплата", path: "/delivery-and-payment" },
    { name: "Контакти", path: "/contacts" },
  ];
  return (
    <div className={css.footer} id="footer">
      <div className={css.footerContainer}>
        <div className={css.footerWrapper}>
          <div className={css.footerColumns}>
            <div
              className={`${css.footerColumnsItem} ${css.footerColumnsItemDob}`}
            >
              <div className={css.footerColumnsItemWrap}>
                <div className={css.footerLogo}>
                  <Link className={css.headerLogoLink} to={"/"}>
                    <img
                      src={logoSilvago}
                      alt="Silvago ❤️ Доглядова та декоративна косметика"
                      className={css.footerLogoImg}
                    />
                  </Link>
                </div>
                <div className={css.footerCopyright}>
                  © 2022—2025 <br />
                  Silvago - магазин професійної косметики
                </div>
              </div>
            </div>
            <div className={css.footerColumnsItem}>
              <div className={css.footerColumnsItemWrap}>
                <div className={css.footerBlock}>
                  <div className={css.footerHead}>Каталог</div>
                  <ul className={css.footerMenu}>
                    {categories.map((category) => (
                      <li
                        className={css.footerMenuItem}
                        key={category.idTorgsoft}
                      >
                        <Link
                          className={css.footerMenuItemLink}
                          to={`/catalog/category/${category.slug}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className={css.footerColumnsItem}>
              <div className={css.footerColumnsItemWrap}>
                <div className={css.footerBlock}>
                  <div className={css.footerHead}>Клієнтам</div>
                  <ul className={css.footerMenu}>
                    {menuItems.map((item) => (
                      <li className={css.footerMenuItem} key={item.path}>
                        <Link className={css.footerMenuItemLink} to={item.path}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={css.footerBlock}>
                  Ми в соцмережах
                  <div className={css.footerSocialContainer}>
                    <a
                      href="https://www.instagram.com/silvago.ua/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={css.footerSocialIconLink}
                      title="Інстаграм"
                    >
                      <IoLogoInstagram className={css.footerSocialIcon} />
                    </a>
                    <a
                      href="https://www.tiktok.com/@silvago.ua"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={css.footerSocialIconLink}
                      title="Тік Ток"
                    >
                      <FaTiktok className={css.footerSocialIcon} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${css.footerColumnsItem} ${css.footerColumnsItemDob}`}
            >
              <div className={css.footerColumnsItemWrap}>
                <div className={css.footerHead}>Контактна інформація</div>
                <div className={css.footerContacts}>
                  <div className={css.footerContactsGroup}>
                    <FaPhone className={css.iconFooter} />
                    <div className={css.footerContactsItem}>
                      <a
                        className={css.phonesItemLink}
                        href="tel:+380682825562"
                        aria-label={"Зателефонувати за номером +380682825562"}
                      >
                        +380682825562
                      </a>
                    </div>
                  </div>
                  <div className={css.footerContactsGroup}>
                    <div className={css.footerContactsItem}>
                      <FaTelegram className={css.iconFooter} />
                      <a className={css.phonesItemLink} href="#">
                        Telegram
                      </a>
                    </div>
                    <div className={css.footerContactsItem}>
                      <AiTwotoneMail className={css.iconFooter} />
                      <a className={css.phonesItemLink} href="#">
                        silvago@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className={css.footerContactsGroup}>
                    <FaLocationDot
                      className={`${css.iconFooter} ${css.iconLocation}`}
                    />
                    <div className={css.footerAddress}>
                      м.Коростишів
                      <br /> Героїв Небесної Сотні, 56 <br /> З 09:30-17:30
                    </div>
                    <a href="#" className={css.phonesItemLink}>
                      Мапа проїзду
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
