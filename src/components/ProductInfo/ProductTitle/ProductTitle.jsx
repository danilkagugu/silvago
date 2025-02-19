import css from "./ProductTitle.module.css";

const ProductTitle = ({ volume }) => {
  return (
    <div className={css.productHeader}>
      <div className={`${css.productHeaderRow} ${css.productHeaderRowTop}`}>
        <div
          className={`${css.productHeaderBlock} ${css.productHeaderTitleBlock}`}
        >
          <h1 className={css.productTitle}>{volume?.fullName}</h1>
        </div>
        <div className={css.productHeaderBlock}>
          <div className={css.productHeaderBlockBarcode}>
            <span className={css.productHeaderBarcodeTitle}>Артикул</span>
            {volume.barcode}
          </div>
        </div>
      </div>
      <div className={css.productHeaderRow}>
        <div
          className={css.productStock}
          style={{ color: volume.quantity > 0 ? "#69b815" : "#a2a2a2" }}
        >
          {volume.quantity > 0 ? "В наявності" : "Немає в наявності"}
        </div>
      </div>
    </div>
  );
};

export default ProductTitle;
