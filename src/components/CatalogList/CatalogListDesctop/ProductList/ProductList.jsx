import CatalogListItem from "../../../CatalogListItem/CatalogListItem";
import css from "./ProductList.module.css";
import ProductPagination from "./ProductPagination/ProductPagination";

const ProductList = ({ filterProduct, defaultProductVariations }) => {
  return (
    <div className={css.catalogContent}>
      <ul className={css.list}>
        {filterProduct.map((product) => (
          <li
            key={product._id}
            className={css.listItem}
            id={product.idTorgsoft}
          >
            <CatalogListItem
              product={product}
              defaultProductVariations={defaultProductVariations}
            />
          </li>
        ))}
      </ul>
      <ProductPagination />
    </div>
  );
};

export default ProductList;
