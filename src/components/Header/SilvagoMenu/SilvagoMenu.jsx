import { Link } from "react-router-dom";
import css from "./SilvagoMenu.module.css";

const menuItems = [
  { name: "Про нас", path: "/about-us" },
  { name: "FAQ", path: "/faq" },
  { name: "Доставка і оплата", path: "/delivery-and-payment" },
  { name: "Контакти", path: "/contacts" },
];

const SilvagoMenu = () => {
  return (
    <nav className={css.silvagoMenu}>
      {menuItems.map((item) => (
        <span className={css.silvagoMenuItem} key={item.path}>
          <Link className={css.silvagoMenuLink} to={item.path}>
            {item.name}
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default SilvagoMenu;
