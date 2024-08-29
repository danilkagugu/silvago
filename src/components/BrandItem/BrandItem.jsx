import css from "./BrandItem.module.css";
const BrandItem = ({ brandImg, brandTitle }) => {
  return (
    <div className={css.cardBox}>
      <div className={css.imgBox}>
        <img className={css.imgBrand} src={brandImg} alt={brandTitle} />
      </div>
    </div>
  );
};

export default BrandItem;
