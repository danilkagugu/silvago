import { Link, useNavigate } from "react-router-dom";
import css from "./MenuHeader.module.css";
// import { FaChevronDown } from "react-icons/fa6";
import { BsBasket, BsTelephone } from "react-icons/bs";
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import {
  selectAllQuantity,
  // selectBasket,
  selectTotalPrice,
} from "../../redux/basket/selectors";
import { useEffect, useState } from "react";
import ModalBasket from "../ModalBasket/ModalBasket";
import { LuHeart } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { store } from "../../redux/store";
// import { getBasketInfo } from "../../redux/basket/operations";
import { selectFavoritesQuantity } from "../../redux/product/selectors";

const MenuHeader = () => {
  // const dispatch = useDispatch();

  // const basketDataA = useSelector(selectBasket);
  // console.log("basketDataA: ", basketDataA);

  const [open, setOpen] = useState(false);
  const [showOutOfStockMessage, setShowOutOfStockMessage] = useState(false);
  const navigate = useNavigate();
  const totalPrice = useSelector(selectTotalPrice);
  const allQuantity = useSelector(selectAllQuantity);
  const login = useSelector(selectIsLoggedIn);
  const favoriteProductsLength = useSelector(selectFavoritesQuantity);
  // console.log("login: ", login);
  const token = store.getState().auth.token;

  // useEffect(() => {
  //   dispatch(getBasketInfo());
  // }, [dispatch]);

  useEffect(() => {
    if (!token) return;
    // Можливо, інша логіка чи запити
  }, [token]);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const clickHeart = () => {
    if (token) {
      console.log("token: ", token);
      navigate("/user-cabinet/favorite");
    } else {
      // Якщо кількість перевищує максимальну, показуємо повідомлення
      setShowOutOfStockMessage(true);
      // Приховуємо повідомлення через 2-3 секунди
      setTimeout(() => {
        setShowOutOfStockMessage(false);
      }, 2000); // 2000 мілісекунд = 2 секунди
    }
  };

  return (
    <div className={css.menuContainer}>
      <Logo width={200} color={"invert(0)"} />
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
      <div className={css.headerCont}>
        <div className={css.telephoneBox}>
          <span className={css.telSpan}>
            <BsTelephone className={css.iconTelephone} />
          </span>

          <a className={css.link} href="tel:+380682825562">
            +380682825562
          </a>
        </div>
        <div className={css.searchBox}>
          <IoSearch className={`${css.iconSearch} ${css.icon}`} />
        </div>
        <div className={css.favoriteBox}>
          <LuHeart
            className={`${css.favoriteIcon} ${css.icon}`}
            onClick={clickHeart}
          />
          {token && (
            <span className={css.amountProductsFavorites}>
              {favoriteProductsLength}
            </span>
          )}
        </div>

        <div
          className={css.basketBox}
          onClick={() => {
            if (allQuantity > 0 && login) {
              openModal();
            }
          }}
        >
          <BsBasket className={`${css.iconBasket} ${css.icon}`} />
          <span className={css.allQuantity}>{login ? allQuantity : 0}</span>
          <div className={css.basketInfoPriceBox}>
            <p className={css.basketTitle}>Мій кошик</p>
            {totalPrice > 0 && login && <p>{totalPrice}</p>}
          </div>
        </div>
      </div>
      <ModalBasket closeModal={closeModal} open={open} />
    </div>
  );
};

export default MenuHeader;
