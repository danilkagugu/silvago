import css from "./Header.module.css";

// import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
// import MobMenu from "../MobMenu/MobMenu";

import Catalogy from "../Catalogy/Catalogy";
// import MenuHeader from "../MenuHeader/MenuHeader";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import SilvagoMenu from "./SilvagoMenu/SilvagoMenu";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderContacts from "./HeaderContacts/HeaderContacts";
import HeaderBasket from "./HeaderBasket/HeaderBasket";
import ProductsMenu from "./ProductsMenu/ProductsMenu";

const Header = () => {
  const [openMobMenu, setOpenMobMenu] = useState(false);

  return (
    <div className={css.header}>
      <div className={css.headerContainer}>
        <div className={css.headerTop}>
          <div className={css.headerWrapper}>
            <div className={css.headerLayout}>
              <div className={`${css.headerColumn}`}>
                <div className={css.headerSection}>
                  <HeaderLogo />
                </div>
              </div>
              <div className={`${css.headerColumn} ${css.headerColumnMiddle}`}>
                <div className={css.headerRow}>
                  <div className={css.headerSection}>
                    <SilvagoMenu />
                  </div>
                </div>
                <div className={css.headerRow}>
                  <div className={css.headerColumn}>
                    <div
                      className={`${css.headerSection} ${css.headerSectionSearch}`}
                    >
                      <HeaderSearch />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${css.headerColumn} ${css.headerColumnRight}`}>
                <div className={css.headerSection}>
                  <HeaderContacts />
                </div>
                <div className={css.headerSection}>
                  <HeaderBasket />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={css.headerBottom}>
          <div className={css.headerWrapper}>
            <div className={`${css.headerLayout} ${css.headerLayoutBottom}`}>
              <div className={`${css.headerColumn} ${css.headerColumnLeft}`}>
                <div className={css.headerSection}>
                  <ProductsMenu />
                </div>
              </div>
              <div
                className={`${css.headerColumn} ${css.headerColumnRight}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={css.topHeader}>
        <p className={css.freeDelivery}>
          Безкоштовна доставка від 1200 грн ❤ Відправлення замовлення щодня
        </p>
      </div> */}
      {/* <div className={css.headerWrapper}>
        <div className={css.header}>
          <div className={css.menuBtn}>
            <MdOutlineMenu
              className={`${css.iconMenu} ${css.icon}`}
              onClick={() => {
                setOpenMobMenu(true);
              }}
            />
          </div>

          <MenuHeader />

           
          <div className={css.leftHeaderMenu}>
            <MobMenu closeMenu={setOpenMobMenu} openMobMenu={openMobMenu} />
          </div>
        </div>
      </div> */}
      <Catalogy />
    </div>
  );
};

export default Header;
