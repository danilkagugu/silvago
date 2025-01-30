import css from "./LoaderSilvago.module.css";
import logoSv from "../../assets/img/sv-logo.png";

const LoaderSilvago = () => {
  return (
    <div className={css.skeletonContainer}>
      <img src={logoSv} alt="Logo" className={css.logo} />
    </div>
  );
};

export default LoaderSilvago;
