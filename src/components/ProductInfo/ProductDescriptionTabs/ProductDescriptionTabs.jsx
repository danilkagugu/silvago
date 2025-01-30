import css from "./ProductDescriptionTabs.module.css";

const ProductDescriptionTabs = ({
  descriptionTab,
  setDescriptionTab,
  product,
}) => {
  return (
    <div className={css.productGroup}>
      <div className={css.productDescriptionHeader}>
        <nav className={css.productDescriptionNav}>
          <p
            className={`${css.descriptionNavTab} ${
              descriptionTab === "Опис" ? css.tabActive : ""
            }`}
            onClick={() => setDescriptionTab("Опис")}
          >
            Опис
          </p>
          <p
            className={`${css.descriptionNavTab}  ${
              descriptionTab === "Новий відгук" ? css.tabActive : ""
            }`}
            onClick={() => setDescriptionTab("Новий відгук")}
          >
            Новий відгук
          </p>
        </nav>
      </div>
      {descriptionTab === "Опис" && (
        <div className={css.productDescriptionBox}>
          <div
            className={css.text}
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionTabs;
