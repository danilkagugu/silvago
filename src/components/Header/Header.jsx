import css from "./Header.module.css";

import HeaderLogo from "./HeaderLogo/HeaderLogo";
import SilvagoMenu from "./SilvagoMenu/SilvagoMenu";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderContacts from "./HeaderContacts/HeaderContacts";
import HeaderBasket from "./HeaderBasket/HeaderBasket";
import ProductsMenu from "./ProductsMenu/ProductsMenu";
import Heart from "./Heart/Heart";
import UserBar from "./UserBar/UserBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategoriesTorgsoft } from "../../redux/inventoryStore/operations";
import {
  selectAllQuantity,
  selectTotalPrice,
} from "../../redux/basket/selectors";
import { selectIsLoggedIn, selectUserData } from "../../redux/auth/selectors";
import { selectFavoritesQuantity } from "../../redux/product/selectors";
import { selectAllCategoriesTorgsoft } from "../../redux/inventoryStore/selectors";
import { useLocation } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  //Selectors

  const totalPrice = useSelector(selectTotalPrice);
  const allQuantity = useSelector(selectAllQuantity);
  const login = useSelector(selectIsLoggedIn);
  const favoriteProductsLength = useSelector(selectFavoritesQuantity);
  const categoriesTorgsoft = useSelector(selectAllCategoriesTorgsoft);
  const user = useSelector(selectUserData);

  // useEffect

  useEffect(() => {
    dispatch(fetchAllCategoriesTorgsoft());
  }, [dispatch]);
  return (
    <div
      className={`${css.header} ${location.pathname === "/" ? css.home : ""}`}
    >
      <div className={css.headerContainer}>
        <div className={css.headerTop}>
          <div className={css.headerWrapper}>
            <div className={`${css.headerLayout} ${css.headerLayoutMiddle}`}>
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
                  {/* <HeaderContacts /> */}
                </div>
                <div className={css.headerSection}>
                  <HeaderBasket
                    allQuantity={allQuantity}
                    totalPrice={totalPrice}
                    login={login}
                  />
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
                  <ProductsMenu categoriesTorgsoft={categoriesTorgsoft} />
                </div>
              </div>
              <div className={`${css.headerColumn} ${css.headerColumnRight}`}>
                <div className={css.headerSection}>
                  <Heart
                    favoriteProductsLength={favoriteProductsLength}
                    login={login}
                  />
                </div>
                <div className={css.headerSection}>
                  <UserBar user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
