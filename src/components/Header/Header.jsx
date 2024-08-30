import css from "./Header.module.css";

import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import MobMenu from "../MobMenu/MobMenu";

import Catalogy from "../Catalogy/Catalogy";
import MenuHeader from "../MenuHeader/MenuHeader";

const Header = () => {
  const [openMobMenu, setOpenMobMenu] = useState(false);

  return (
    <div className={css.headerBox}>
      <div className={css.topHeader}>
        <p className={css.freeDelivery}>
          Безкоштовна доставка від 1200 грн ❤ Відправлення замовлення щодня
        </p>
      </div>
      <div className={css.headerWrapper}>
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
      </div>
      <Catalogy />
    </div>
  );
};

export default Header;
