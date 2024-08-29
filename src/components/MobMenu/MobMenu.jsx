import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowRight, FaLongArrowAltLeft } from "react-icons/fa";
import css from "./MobMenu.module.css";
import logo from "../../assets/img/logoSilvago.png";
import { getCategories } from "../../services/productApi";
import { apiLogoutUser } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { BsTelephone } from "react-icons/bs";
import { LuClipboardList, LuHeart, LuUserCircle2 } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";

const MobMenu = ({ closeMenu, openMobMenu }) => {
  const navigate = useNavigate();
  const [menuStack, setMenuStack] = useState([
    { items: [], title: "Categories", slug: null }, // Початкове меню з заголовком і без слугу
  ]);

  const dispatch = useDispatch();
  const login = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (openMobMenu) {
      document.body.classList.add(css.noScroll);
      // document.documentElement.classList.add(css.noScroll);
    } else {
      document.body.classList.remove(css.noScroll);
      // document.documentElement.classList.remove(css.noScroll);
    }

    // Очищення при демонтажі компонента
    return () => {
      document.body.classList.remove(css.noScroll);
      // document.documentElement.classList.remove(css.noScroll);
    };
  }, [openMobMenu]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setMenuStack([{ items: data, title: "Categories", slug: null }]); // Ініціалізуємо перший рівень меню
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const currentLevel = menuStack.length - 1; // Поточний рівень меню

  const handleItemClick = (item) => {
    if (item.items && item.items.length > 0) {
      // Якщо є підменю, додаємо його до стеку
      setMenuStack((prevStack) => [
        ...prevStack,
        { items: item.items, title: item.name, slug: item.slug },
      ]);
    } else {
      // Перенаправлення на відповідну сторінку
      const parentSlug = menuStack[currentLevel].slug;
      const path = parentSlug
        ? `/catalog/${parentSlug}/${item.slug}`
        : `/catalog/${item.slug}`;
      navigate(path);
      closeMenu(); // Закриваємо меню після вибору
    }
  };

  const navigateOnCategories = (slug) => {
    navigate(`/catalog/${slug}`);
    closeMenu();
  };

  const handleBack = () => {
    if (menuStack.length > 1) {
      setMenuStack((prevStack) => prevStack.slice(0, -1));
    } else {
      closeMenu(); // Якщо на першому рівні, закриваємо меню
    }
  };

  const onLogout = () => {
    dispatch(apiLogoutUser());
    navigate("/");
  };

  return (
    <div
      className={`${css.mobWrapper} ${openMobMenu ? css.mobWrapperOpen : ""}`}
    >
      <div
        className={`${css.mobileMenuBox} ${
          openMobMenu ? css.mobileMenuBoxShow : ""
        }`}
      >
        <nav className={css.menu}>
          <div className={css.headerMenu}>
            {menuStack.length > 1 ? (
              <button className={css.backButton} onClick={handleBack}>
                <FaLongArrowAltLeft />
              </button>
            ) : (
              <div className={css.logoBox}>
                <Link to="/">
                  <img className={css.imgLogo} src={logo} alt="Logo" />
                </Link>
              </div>
            )}
            {menuStack.length > 1 && (
              <div
                className={css.headerTitle}
                onClick={() =>
                  navigateOnCategories(menuStack[currentLevel].slug)
                }
              >
                {menuStack[currentLevel].title}
              </div>
            )}
            <IoCloseSharp
              className={css.iconClose}
              onClick={() => closeMenu(false)}
            />
          </div>

          <div
            className={css.levelContainer}
            style={{
              transform: `translateX(-${currentLevel * 100}%)`,
            }}
          >
            {menuStack.map((menuLevel, index) => (
              <div key={index} className={css.menuLevel}>
                {menuLevel.items.map((item) => (
                  <button
                    key={item._id}
                    className={css.menuItem}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.name}
                    {item.items && item.items.length > 0 && (
                      <FaArrowRight className={css.arrowIcon} />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className={css.menuListBox}>
            <ul className={css.menuHeader}>
              <li className={css.menuList}>
                <Link className={css.link} to={"/contacts"}>
                  Контакти
                </Link>
              </li>
              <li className={css.menuList}>
                <Link className={css.link} to={"/faq"}>
                  FAQ
                </Link>
              </li>
              <li className={css.menuList}>
                <Link className={css.link} to={"/brands"}>
                  Бренди
                </Link>
              </li>
              <li className={css.menuList}>
                <Link className={css.link} to={"/delivery-and-payment"}>
                  Доставка і оплата
                </Link>
              </li>
              <li className={css.menuList}>
                <Link className={css.link} to={"/about-us"}>
                  Про нас
                </Link>
              </li>
            </ul>
          </div>
          <div className={css.userMenu}>
            {login && (
              <ul className={css.userMenuList}>
                <li
                  className={css.userMenuItem}
                  onClick={() => {
                    navigate("/user-cabinet/settings");
                  }}
                >
                  <LuUserCircle2 className={css.userIcon} />
                  <p className={css.userItemText}>Мій профіль</p>
                </li>
                <li
                  className={css.userMenuItem}
                  onClick={() => {
                    navigate("/user-cabinet/history");
                  }}
                >
                  <LuClipboardList className={css.userIcon} />

                  <p className={css.userItemText}>Мої замовлення</p>
                </li>
                <li
                  className={css.userMenuItem}
                  onClick={() => {
                    navigate("/user-cabinet/favorite");
                  }}
                >
                  <LuHeart className={css.userIcon} />
                  <p className={css.userItemText}>Обране</p>
                </li>
                <li className={css.userMenuItem} onClick={onLogout}>
                  <CiLogout className={css.userIcon} />
                  <p className={css.userItemText}>Вихід</p>
                </li>
              </ul>
            )}
            {!login && <p className={css.userItemTextLogin}>Вхід</p>}
          </div>
          <div className={css.phoneBox}>
            <BsTelephone />
            <a className={css.link} href="tel:+380682825562">
              +380682825562
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobMenu;
