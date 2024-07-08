import { Link } from "react-router-dom";
import css from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={css.logo}>
      <Link className={css.logoLink} to={"/"}>
        Silvago
      </Link>
    </div>
  );
};

export default Logo;
