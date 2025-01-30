import { Link } from "react-router-dom";
import css from "./Logo.module.css";
import l from "../../assets/img/logoSilvago.png";

const Logo = ({ width, color }) => {
  return (
    <div className={css.logo}>
      <Link className={css.logoLink} to={"/"}>
        <img
          src={l}
          alt="Silvago"
          width={width}
          height={50}
          style={{ filter: color }}
        />
      </Link>
    </div>
  );
};

export default Logo;
