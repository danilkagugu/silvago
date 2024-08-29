import { useNavigate } from "react-router-dom";
import css from "./CatalogItem.module.css";

const CatalogItem = ({ productImg, productName, productPrice, id }) => {
  const navigate = useNavigate();
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <div className={css.cardBox} id={id} onClick={() => handleProductClick(id)}>
      <div className={css.imgBox}>
        <img
          className={css.imgBrand}
          src={productImg}
          alt={productName}
          width={100}
          height={100}
        />
      </div>
      <div className={css.boxInfo}>
        <p className={css.brandInfo}>{productName}</p>
        <p className={css.brandInfo}>{productPrice} ₴</p>
      </div>
    </div>
  );
};

export default CatalogItem;
