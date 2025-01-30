import css from "./ProductTitle.module.css";

const ProductTitle = ({ volume }) => {
  return (
    <div className={css.productHeader}>
      <div className={css.productHeaderTitle}>
        <div className={css.productHeaderTitleBlock}>
          <h1 className={css.productTitle}>{volume.fullName}</h1>
        </div>
      </div>
      <div className={css.productHeaderInfo}>
        <div
          className={`${css.productHeaderAvailability} ${
            volume.quantity > 0 ? css.productInStock : css.productNotStock
          }`}
        >
          {volume.quantity > 0 ? "В наявності" : "Немає в наявності"}
        </div>

        <div className={css.productHeaderArticle}>
          Артикул: {volume.article}
        </div>
        <div className={css.productHeaderRaiting}>
          Написати відгук. Треба зробить🙌!
        </div>
      </div>
    </div>
  );
};

export default ProductTitle;
