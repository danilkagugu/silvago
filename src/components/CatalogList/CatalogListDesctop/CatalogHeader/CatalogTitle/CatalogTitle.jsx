import css from "./CatalogTitle.module.css";
const CatalogTitle = ({
  selectedBrand,
  selectedSection,
  rangeValues,
  priceFilter,
}) => {
  const brandNames = selectedBrand.map((brand) => brand.name);
  const sectionNames = selectedSection.map(
    (section) => section.name || section
  );
  return (
    <div className={css.catalogTopTitle}>
      <h1 className={css.titleText}>
        Головна Каталог
        {brandNames.length > 0 && ` Бренд: ${brandNames.join(", ")}`}
        {sectionNames.length > 0 && `, Розділ: ${sectionNames.join(", ")}`}
        {priceFilter &&
          `, Ціна, грн: ${rangeValues[0] ?? ""} – ${rangeValues[1] ?? ""}`}
      </h1>
    </div>
  );
};

export default CatalogTitle;
