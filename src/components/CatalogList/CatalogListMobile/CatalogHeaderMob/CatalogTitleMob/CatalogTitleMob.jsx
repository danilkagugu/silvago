import css from "./CatalogTitleMob.module.css";
const CatalogTitleMob = ({ selectedBrand, selectedSection }) => {
  return (
    <h1 className={css.titleMob}>
      Головна Каталог{" "}
      {selectedBrand.length > 0 && `Бренд: ${selectedBrand.join(", ")}`}
      {selectedSection.length > 0 && `, Розділ: ${selectedSection.join(", ")}`}
    </h1>
  );
};

export default CatalogTitleMob;
