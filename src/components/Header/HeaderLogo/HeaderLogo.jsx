import { Link } from "react-router-dom";
import css from "./HeaderLogo.module.css";
import logoSilvago from "../../../assets/img/logoSilvago.png";

const HeaderLogo = () => {
  return (
    <div className={css.headerLogo}>
      <Link className={css.headerLogoLink} to={"/"}>
        <img
          src={logoSilvago}
          alt="Silvago ❤️ Доглядова та декоративна косметика"
          className={css.headerLogoImg}
        />
      </Link>
    </div>
  );
};

export default HeaderLogo;
