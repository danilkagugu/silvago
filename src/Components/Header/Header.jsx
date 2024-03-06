import css from "./Header.module.css";
import { IoIosMenu } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import Modal from "react-modal";
import { useState } from "react";

import HeaderMenu from "../HeaderMenu/HeaderMenu";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <header className={css.header}>
      <div className={css.topHeader}>
        <div className={css.container}>
          <ul className={css.topHeaderList}>
            <li>Instagram</li>
            <li>Про нас</li>
            <li>Оплата і доставка</li>
            <li>FAQ</li>
            <li>Контакти</li>
          </ul>
        </div>
      </div>
      <div className={css.container}>
        <div className={css.headerMenu}>
          <div className={css.leftHeader}>
            <button className={css.btnMenu}>
              <IoIosMenu
                className={css.iconMenu}
                onClick={() => setModalIsOpen(true)}
              />
            </button>
            <Modal
              className={css.menuBox}
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              ariaHideApp={false}
            >
              <div className={css.menuBox}>
                <div className={css.modalMenuHeader}>
                  <a className={css.logoHeader} href="index.html">
                    <img
                      className={css.logoHeader}
                      src="/src/Img/logo.png"
                      alt="SILVAGO"
                    />
                  </a>
                  <div className={css.closeBox}>
                    <button
                      className={css.iconClose}
                      onClick={() => setModalIsOpen(false)}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                </div>
                <ul className={css.modalMenuList}>
                  <HeaderMenu />
                </ul>
              </div>
            </Modal>
            <a className={css.logoHeader} href="index.html">
              <img src="/src/Img/logo.png" alt="SILVAGO" />
            </a>
            <form className={css.formSearch} action="">
              <input
                className={css.inputSearch}
                type="text"
                placeholder="Шукати всі обрані товари..."
              />
            </form>
          </div>

          <div className={css.rightHeader}>
            <ul className={css.headerRightList}>
              <li className={css.headerRightItem}>
                <a href="">
                  <CiHeart className={css.iconHeart} />
                </a>
              </li>
              <li className={`${css.headerRightItem} ${css.iconSearch}`}>
                <a href="">
                  <CiSearch />
                </a>
              </li>
              <li className={css.headerRightItem}>
                <a href="">
                  <CiUser />
                </a>
              </li>
              <li className={css.headerRightItem}>
                <a href="">
                  <IoBagHandleOutline />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
