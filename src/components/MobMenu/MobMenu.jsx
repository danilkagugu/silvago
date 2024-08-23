import css from "./MobMenu.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import catalog from "../Catalogy/NextCatalog.json";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/sv-logo.png";

const MobMenu = ({ closeMenu }) => {
  const [openMenu, setOpenMenu] = useState({
    main: true,
    category: null,
    subcategory: null,
  });

  const handleMainMenu = () => {
    setOpenMenu({ main: true, category: null, subcategory: null });
  };

  const handleCategoryMenu = (category) => {
    setOpenMenu({ main: false, category, subcategory: null });
  };

  const handleSubcategoryMenu = (subcategory) => {
    setOpenMenu((prev) => ({ ...prev, subcategory }));
  };

  return (
    <div className={css.mobWrapper}>
      <div className={openMenu.main ? css.mobMenuBox : css.mobMenuBoxHidden}>
        <div className={css.logoBox}>
          <Link to={"/"}>
            <img src={logo} alt="" width={55} />
          </Link>
        </div>
        <IoCloseSharp
          className={`${css.iconClose} ${css.mobMenuClose}`}
          onClick={() => closeMenu(false)}
        />
        <ul className={css.mobMenu}>
          <li
            className={css.mobMenuItem}
            onClick={() => handleCategoryMenu("Каталог")}
          >
            <p>Каталог</p>
            <FaChevronRight />
          </li>
          <li>
            <p>
              <Link className={css.link} to={"/brands"}>
                Бренди
              </Link>
            </p>
          </li>
          <li>
            <p>
              <Link className={css.link} to={"/delivery-and-payment"}>
                Доставка і оплата
              </Link>
            </p>
          </li>
          <li>
            <p>
              <Link className={css.link} to={"/about-us"}>
                Про нас
              </Link>
            </p>
          </li>
        </ul>
      </div>

      <div
        className={
          !openMenu.main && !openMenu.subcategory
            ? css.mobMenuBox
            : css.mobMenuBoxHidden
        }
      >
        <div className={css.catalogHeader}>
          <FaChevronRight className={css.backIcon} onClick={handleMainMenu} />
          <h3 className={css.itemText}>{openMenu.category}</h3>
          <IoCloseSharp
            className={css.iconClose}
            onClick={() => closeMenu(false)}
          />
        </div>
        <ul className={css.mobCatalogList}>
          {catalog.map((category, index) => (
            <li
              className={css.mobCatalogItem}
              key={index}
              onClick={() => handleSubcategoryMenu(category.name)}
            >
              <div className={css.catalogBox}>
                <p className={css.itemText}>{category.name}</p>
                {category.items && <FaChevronRight />}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={
          !openMenu.main && openMenu.subcategory
            ? css.mobMenuBox
            : css.mobMenuBoxHidden
        }
      >
        <div className={css.catalogHeader}>
          <FaChevronRight
            className={css.backIcon}
            onClick={() => handleCategoryMenu(openMenu.category)}
          />
          <h3 className={css.itemTitle}>{openMenu.subcategory}</h3>
          <IoCloseSharp
            className={css.iconClose}
            onClick={() => closeMenu(false)}
          />
        </div>
        <ul className={css.dropDownMenu}>
          {catalog
            .find((item) => item.name === openMenu.subcategory)
            ?.items.map((item, i) => (
              <li className={css.downMenuItem} key={i}>
                <p className={css.downMenuText}>{item}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MobMenu;
