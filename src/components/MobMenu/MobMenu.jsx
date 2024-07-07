import css from "./MobMenu.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import catalog from "../Catalogy/NextCatalog.json";
import { useState } from "react";

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
        <IoCloseSharp
          className={`${css.iconClose} ${css.mobMenuClose}`}
          onClick={() => closeMenu(false)}
        />
        <ul className={css.mobMenu}>
          <li className={css.mobMenuItem}>
            <p>Каталог</p>
            <FaChevronRight onClick={() => handleCategoryMenu("Каталог")} />
          </li>
          <li>
            <p>Бренди</p>
          </li>
          <li>
            <p>Доставка і оплата</p>
          </li>
          <li>
            <p>Про нас</p>
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
