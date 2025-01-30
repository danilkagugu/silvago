import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import css from "./HeaderBasket.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
const HeaderBasket = () => {
  return (
    <div className={css.header}>
      <div className={css.container}>
        <div className={css.headerWrapper}>
          <div className={css.headerLayout}>
            <div className={`${css.headerColumn} ${css.headerColumnFixed}`}>
              <div className={css.headerSection}>
                <div className={css.headerLogo}>
                  <Logo width={150} color={"invert(0)"} />
                </div>
              </div>
            </div>
            <div className={`${css.headerColumn} ${css.headerColumnWide}`}>
              <div className={css.headerSection}>
                <Link className={css.headerLink} to={"/"}>
                  <FaArrowLeft />
                  <p>Повернутись до покупок</p>
                </Link>
              </div>
            </div>
            <div className={`${css.headerColumn} ${css.headerColumnFixed}`}>
              <div className={css.headerSection}>
                <div className={css.phone}>
                  <div className={css.phonesList}>
                    <div className={css.phonesItem}>
                      <BsTelephone />
                      <a className={css.phoneLink} href="tel:+380682825562">
                        +380682825562
                      </a>
                    </div>
                  </div>
                  <div className={css.phonesCallback}>
                    <p className={css.callbackItem}>Передзвонити вам?</p>
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

export default HeaderBasket;
