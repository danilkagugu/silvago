import css from "./ProductBuy.module.css";

const ProductBuy = ({
  volume,
  product,
  slug,
  quantities,
  handleAddToBasket,
}) => {
  return (
    <div className={css.productSection}>
      <div className={css.productOrder}>
        <div className={css.productOrderBlock}>
          {volume.quantity > 0 ? (
            <button
              className={`${css.btn} ${css.special}`}
              onClick={() => {
                handleAddToBasket(slug, quantities[product._id], volume.volume);
              }}
            >
              <span className={css.btnText}>Купити</span>
            </button>
          ) : (
            <p className={`${css.productBuyBtn} ${css.productMiss}`}>
              Повідомити коли з&apos;явиться в наявності
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBuy;
