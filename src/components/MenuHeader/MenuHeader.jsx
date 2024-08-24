import { Link } from "react-router-dom";
// import Catalogy from "../Catalogy/Catalogy";
import css from "./MenuHeader.module.css";
// import { FaChevronDown } from "react-icons/fa6";
import { BsBasket, BsTelephone } from "react-icons/bs";
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import {
  selectAllQuantity,
  selectTotalPrice,
} from "../../redux/basket/selectors";
import { useEffect, useState } from "react";
import ModalBasket from "../ModalBasket/ModalBasket";
import { getBasketProduct } from "../../services/productApi";

const MenuHeader = () => {
  const [open, setOpen] = useState(false);
  // const [basketUpdated, setBasketUpdated] = useState(false);
  const totalPrice = useSelector(selectTotalPrice);
  const allQuantity = useSelector(selectAllQuantity);
  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchBasketData = async () => {
      try {
        await getBasketProduct(); // Fetch and update basket data
        // setBasketUpdated(true);
      } catch (error) {
        console.error("Failed to fetch basket data:", error);
      }
    };

    fetchBasketData();
  }, []);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className={css.menuContainer}>
      <Logo />
      <ul className={css.MenuHeader}>
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
        <div className={css.basketBox} onClick={openModal}>
          <BsBasket className={`${css.icon} ${css.iconBasket}`} />
          <span className={css.allQuantity}>{allQuantity}</span>
          <div className={css.basketInfoPriceBox}>
            <p className={css.basketTitle}>Мій кошик</p>
            {totalPrice > 0 && <p>{totalPrice}</p>}
          </div>
        </div>
      </div>
      {open && <ModalBasket closeModal={closeModal} />}
    </div>
  );
};

export default MenuHeader;
