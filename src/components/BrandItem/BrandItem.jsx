import { setToken } from "../../services/authApi";
import css from "./BrandItem.module.css";
const BrandItem = ({ brandImg, brandTitle }) => {
  const token = setToken();
  console.log("token: ", token);
  return (
    <div className={css.cardBox}>
      <div className={css.imgBox}>
        <img
          className={css.imgBrand}
          src={brandImg}
          alt={brandTitle}
          width={120}
          height={120}
        />
      </div>
      <div className={css.boxInfo}>
        <p className={css.brandInfo}>{brandTitle}</p>
      </div>
    </div>
  );
};

export default BrandItem;
