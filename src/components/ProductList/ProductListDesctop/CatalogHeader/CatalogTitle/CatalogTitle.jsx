import css from "./CatalogTitle.module.css";

const CatalogTitle = ({ currentCategory }) => {
  return (
    <div className={css.catalogTopTitle}>
      <h1 className={css.titleText}>
        {currentCategory && currentCategory.name}
        {/* {selectedBrand.length > 0 && `Бренд: ${selectedBrand.join(", ")}`}
              {selectedSection.length > 0 &&
                `, Розділ: ${selectedSection.join(", ")}`} */}
      </h1>
    </div>
  );
};

export default CatalogTitle;
