import css from "./ProductBuy.module.css";

const ProductBuy = ({
  volume,
  product,
  slug,
  quantities,
  handleAddToBasket,
}) => {
  return (
    <div className={css.productSectionBuy}>
      <div className={css.productOrder}>
        {volume.quantity > 0 ? (
          <button
            className={css.productBuyBtn}
            onClick={() => {
              handleAddToBasket(slug, quantities[product._id], volume.volume);
            }}
          >
            Купити
          </button>
        ) : (
          <p
            className={`${css.productBuyBtn} ${css.productMiss}`}
            // onClick={() => {
            //   handleAddToBasket(
            //     slug,
            //     quantities[product._id],
            //    volume.volume
            //   );
            // }}
          >
            Повідомити коли з&apos;явиться в наявності
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductBuy;
