import css from "./Header.module.css";

import { MdOutlineMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import MobMenu from "../MobMenu/MobMenu";

import Catalogy from "../Catalogy/Catalogy";
import MenuHeader from "../MenuHeader/MenuHeader";
import { getBasketProduct } from "../../services/productApi";
// import { useSelector } from "react-redux";
// import { selectBasket } from "../../redux/basket/selectors";

const Header = () => {
  const [openMobMenu, setOpenMobMenu] = useState(false);
  // const basketDataQQ = useSelector(selectBasket);
  // console.log("basketDataQQ: ", basketDataQQ);
  // console.log("totalPrice: ", totalPrice);
  const [basket, setBasket] = useState([]);
  // console.log("basket: ", basket);
  // const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const basketData = await getBasketProduct();
        // console.log("basketData: ", basketData);

        if (basketData && Array.isArray(basketData.products)) {
          setBasket(basketData.products);
        }
      } catch (error) {
        console.error("Помилка отримання продуктів у кошику:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={css.headerBox}>
      <div className={css.topHeader}>
        <p className={css.freeDelivery}>
          Безкоштовна доставка від 1200 грн ❤ Відправлення замовлення щодня
        </p>
      </div>
      <div className={css.qqqqq}>
        <div className={css.header}>
          <MenuHeader />
          <div className={css.leftHeaderMenu}>
            <MdOutlineMenu
              className={`${css.iconMenu} ${css.icon}`}
              onClick={() => {
                setOpenMobMenu(true);
              }}
            />
            {openMobMenu && <MobMenu closeMenu={setOpenMobMenu} />}
          </div>
        </div>
      </div>
      <Catalogy />
    </div>
  );
};

export default Header;
