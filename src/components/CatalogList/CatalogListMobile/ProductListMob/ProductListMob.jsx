import CatalogListItem from "../../../CatalogListItem/CatalogListItem";
import css from "./ProductListMob.module.css";
const ProductListMob = ({
  sortedFilteredProducts,
  defaultProductVariations,
}) => {
  return (
    <ul className={css.goods}>
      {sortedFilteredProducts.map((product) => (
        <li className={css.goodsItem} key={product._id}>
          <CatalogListItem
            product={product}
            defaultProductVariations={defaultProductVariations}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductListMob;
