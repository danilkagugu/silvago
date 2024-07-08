import BrandItem from "../BrandItem/BrandItem";
import catalogBrand from "./brand.json";
import css from "./BrandsList.module.css";
const BrandsList = () => {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {catalogBrand.map((item, index) => (
          <li key={index} className={css.listItem}>
            <div className={css.cardContainer}>
              <BrandItem brandImg={item.src} brandTitle={item.name} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandsList;
